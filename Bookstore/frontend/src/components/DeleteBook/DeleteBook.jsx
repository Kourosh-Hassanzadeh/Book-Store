import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:5000/book/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
  };

  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <section className="delete-bg">
      <div className="container-fluid pt-5 del-text">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h3>Are You Sure You Want To Delete this book?</h3>
            <div className="mt-5">
              <button className="btn btn-danger" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button
                className="btn btn-secondary ml-4"
                onClick={navigateToHome}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteBook;
