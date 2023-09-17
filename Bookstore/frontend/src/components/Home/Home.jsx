import React, { useEffect, useState } from "react";
import PaginatedData from "../PaginatedData/PaginatedData";
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
          <PaginatedData data={books} itemsPerPage={3} />
        </div>
      </div>
    </section>
  );
};

export default Home;
