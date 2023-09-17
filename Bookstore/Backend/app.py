from flask import Flask
from flask_restful import Resource, Api, fields, reqparse, marshal_with, abort
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
from sqlalchemy import desc

app = Flask(__name__)
api = Api(app)
CORS(app, origins=["http://localhost:3000"])

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sqlite.db'
db = SQLAlchemy(app)


class BookModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    description = db.Column(db.String(2000))
    author = db.Column(db.String(200))
    publish_date = db.Column(db.DateTime(timezone=True))


resource_fields = {
    "id": fields.Integer(),
    "name": fields.String(),
    "description": fields.String(),
    "author": fields.String(),
    "publish_date": fields.DateTime()
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


class Books(Resource):
    def get(self):
        books = BookModel.query.all()
        allBooks = {}
        for book in books:
            allBooks[book.id] = {"id": book.id, "name": book.name, "description": book.description,
                                 "author": book.author, "publish_date": book.publish_date.isoformat()}
        return allBooks

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


api.add_resource(Books, "/books")
api.add_resource(Book, "/book/<int:book_id>")
api.add_resource(CreateBook, "/createBook")


if __name__ == '__main__':
    app.run(debug=True)
