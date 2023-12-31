import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/books")

      .then((response) => {
        setBooks(Object.values(response.data));
      })
      .catch((err) => {
        console.error("error", err);
      });
  }, []);

  const NavigateToDelete = (book) => {
    navigate(`/deleteBook/${book.id}`);
  };

  const navigateToUpdate = (book) => {
    navigate(`/updateBook/${book.id}`, { state: { book } });
  };
  return (
    <section>
      <div className="container-fluid home-main">
        <div className="row justify-content-center">
          {books.map((book, index) => (
            <div className="btn card text-center home-book" key={index}>
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Author: {book.author}
                </h6>
                <p className="card-text">{book.description}</p>
                <pre className="card-text">{book.publish_date}</pre>
              </div>
              {isLoggedIn && (
                <div className="row justify-content-center">
                  <button
                    className="btn btn-danger ml-2 home-btn"
                    onClick={() => NavigateToDelete(book)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning home-btn ml-auto mr-2"
                    onClick={() => navigateToUpdate(book)}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
