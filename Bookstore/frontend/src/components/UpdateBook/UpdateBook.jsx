import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";

const UpdateBook = () => {
  const location = useLocation();
  const { book } = location.state;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: book.name,
    description: book.description,
    author: book.author,
    publish_date: book.publish_date,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = { ...formData };

    if (formData.publish_date === book.publish_date) {
      delete updatedData.publish_date;
    }
    try {
      await axios.put(
        `http://127.0.0.1:5000/book/${book.id}`,
        JSON.stringify(updatedData),
        { headers: { "Content-Type": "application/json" } }
      );

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="container-fluid up-bg">
      <div className="row justify-content-center pt-4">
        <h3 className="up-text">
          Update "<b>{book.name}</b>"
        </h3>
      </div>
      <div className="row justify-content-center">
        <form method="PUT">
          <label className="text-color" htmlFor="name">
            Name:
          </label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={formData.name}
            className="up-input"
            onChange={handleChange}
          />
          <br />

          <label className="text-color" htmlFor="description">
            Description:
          </label>
          <br />

          <textarea
            className="up-input up-tArea"
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={formData.description}
            onChange={handleChange}
            placeholder="description"
          ></textarea>
          <br />

          <label className="text-color" htmlFor="author">
            Author:
          </label>
          <br />
          <input
            type="text"
            name="author"
            id="author"
            placeholder="author"
            value={formData.author}
            className="up-input"
            onChange={handleChange}
          />
          <br />

          <label className="text-color" htmlFor="publish_date">
            Publish Date:
          </label>
          <br />
          <input
            type="datetime-local"
            name="publish_date"
            id="publish_date"
            value={formData.publish_date}
            className="up-input"
            onChange={handleChange}
          />
          <br />
          <div className="text-center mt-4">
            <button
              className="btn up-submit"
              type="button"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateBook;
