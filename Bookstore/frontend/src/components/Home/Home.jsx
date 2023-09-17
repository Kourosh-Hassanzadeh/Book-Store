import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const Home = () => {
  const [books, setBooks] = useState([]);
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
  return (
    <section>
      <div className="container-fluid home-main">
        <div class="row justify-content-center">
          {books.map((book, index) => (
            <div className="card text-center home-book" key={index}>
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Author: {book.author}
                </h6>
                <p className="card-text">{book.description}</p>
                <pre className="card-text">{book.publish_date}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
