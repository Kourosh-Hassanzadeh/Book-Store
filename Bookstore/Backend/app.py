from flask import Flask, request
from flask_restful import Resource, Api, fields, reqparse, marshal_with, abort
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
from sqlalchemy import desc
import uuid
import jwt
from functools import wraps


app = Flask(__name__)
api = Api(app)
secretKey = uuid.uuid4().hex
jwt_secret = secretKey
CORS(app, origins=["http://localhost:3000"])

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sqlite.db'
db = SQLAlchemy(app)


def generate_token(username):
    payload = {'username': username}
    token = jwt.encode(payload, jwt_secret, algorithm='HS256')
    return token


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return {'message': 'Token is missing'}, 401

        try:
            data = jwt.decode(token, jwt_secret, algorithms=['HS256'])
            current_user = UserModel.query.filter_by(
                username=data['username']).first()
        except:
            return {'message': 'Token is invalid'}, 401

        return f(current_user, *args, **kwargs)

    return decorated


class BookModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    description = db.Column(db.String(2000))
    author = db.Column(db.String(200))
    publish_date = db.Column(db.DateTime(timezone=True))


class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), unique=True)
    email = db.Column(db.String(200))
    password = db.Column(db.String(200))


user_field = {
    "id": fields.Integer(),
    "username": fields.String(),
    "email": fields.String(),
    "password": fields.String()
}


resource_fields = {
    "id": fields.Integer(),
    "name": fields.String(),
    "description": fields.String(),
    "author": fields.String(),
    "publish_date": fields.DateTime()
}

login_fields = {
    "token": fields.String(),
    "username": fields.String(),
    "password": fields.String()
}

# with app.app_context():
#     db.create_all()

book_post_arg = reqparse.RequestParser()
book_post_arg.add_argument("name", type=str, required=True)
book_post_arg.add_argument("description", type=str,
                           help="Write description for this book")
book_post_arg.add_argument("author", type=str, required=True)
book_post_arg.add_argument("publish_date", type=lambda x: datetime.strptime(
    x, "%Y-%m-%dT%H:%M"), required=True)

book_update_arg = reqparse.RequestParser()
book_update_arg.add_argument("name", type=str)
book_update_arg.add_argument("description", type=str)
book_update_arg.add_argument("author", type=str)
book_update_arg.add_argument("publish_date", type=lambda x: datetime.strptime(
    x, "%Y-%m-%dT%H:%M"))

user_post_args = reqparse.RequestParser()
user_post_args.add_argument("username", type=str)
user_post_args.add_argument("email", type=str)
user_post_args.add_argument("password", type=str)

login_args = reqparse.RequestParser()
login_args.add_argument("username", type=str)
login_args.add_argument("password", type=str)
login_args.add_argument("message", type=str)
login_args.add_argument("token", type=str)


class Users(Resource):
    def get(self):
        users = UserModel.query.all()
        allUsers = {}
        for user in users:
            allUsers[user.id] = {"id": user.id, "username": user.username,
                                 "email": user.email, "password": user.password}
        return allUsers


class User(Resource):
    @marshal_with(user_field)
    def get(self, user_id):
        user = UserModel.query.filter_by(id=user_id).first()
        if not user:
            abort(404, description="User does not exists.")
        return user


class Login(Resource):
    @marshal_with(login_fields)
    def post(self):
        args = login_args.parse_args()
        arg_username = args["username"]
        arg_password = args["password"]
        user = UserModel.query.filter_by(
            username=arg_username, password=arg_password).first()
        if user:
            token = generate_token(user.username)
            return {'token': token, 'username': user.username, 'password': user.password}, 200

        return "login please", 401


class Books(Resource):
    def get(self):
        books = BookModel.query.all()
        allBooks = {}
        for book in books:
            allBooks[book.id] = {"id": book.id, "name": book.name, "description": book.description,
                                 "author": book.author, "publish_date": book.publish_date.isoformat()}
        return allBooks

    @token_required
    def delete(self):
        books = BookModel.query.all()
        for book in books:
            db.session.delete(book)
        db.session.commit()
        return "All books Deleted", 204


class Book(Resource):
    @marshal_with(resource_fields)
    def get(self, book_id):
        book = BookModel.query.filter_by(id=book_id).first()
        if not book:
            abort(404, description='Book does not exists.')
        return book

    @marshal_with(resource_fields)
    @token_required
    def put(self, book_id):
        book = BookModel.query.filter_by(id=book_id).first()
        if not book:
            abort(404, description='Book does not exists.')
        args = book_update_arg.parse_args()
        if args["name"]:
            book.name = args["name"]
        if args["description"]:
            book.description = args["description"]
        if args["author"]:
            book.author = args["author"]
        if args["publish_date"]:
            book.publish_date = args["publish_date"]
        db.session.commit()
        return book

    @token_required
    def delete(self, book_id):
        book = BookModel.query.filter_by(id=book_id).first()
        if not book:
            abort(404, description="Book doest not exists.")
        db.session.delete(book)
        db.session.commit()
        return "Book Deleted", 204


class CreateBook(Resource):
    @marshal_with(resource_fields)
    def post(self):
        count = BookModel.query.order_by(desc(BookModel.id)).first()
        if count:
            last = count.id
        args = book_post_arg.parse_args()
        book = BookModel(id=last+1, name=args["name"], description=args["description"],
                         author=args["author"], publish_date=args["publish_date"])
        db.session.add(book)
        db.session.commit()
        return book, 201


class CreateUser(Resource):
    @marshal_with(user_field)
    def post(self):
        count = UserModel.query.order_by(desc(UserModel.id)).first()
        if count:
            last = count.id
        args = user_post_args.parse_args()
        user = UserModel(
            id=last+1, username=args["username"], email=args["email"], password=args["password"])
        db.session.add(user)
        db.session.commit()
        return user, 201


api.add_resource(Books, "/books")
api.add_resource(Book, "/book/<int:book_id>")
api.add_resource(CreateBook, "/createBook")
api.add_resource(Users, "/users")
api.add_resource(User, "/user/<int:user_id>")
api.add_resource(Login, "/login")
api.add_resource(CreateUser, "/createUser")


if __name__ == '__main__':
    app.run(debug=True)
