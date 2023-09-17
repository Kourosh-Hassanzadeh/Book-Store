import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    author: "",
    publish_date: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/createBook",
        JSON.stringify(formData),
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
      setFormData({ name: "", description: "", author: "", publish_date: "" });
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <section>
      <div className="container-fluid add-bg">
        <div className="row justify-content-center">
          <h3>
            <pre className="mt-4 text-color">Add a book to your list!</pre>
          </h3>
        </div>
        <div className="row justify-content-center">
          <form method="POST">
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
              className="add-input"
              onChange={handleChange}
              required
            />
            <br />

            <label className="text-color" htmlFor="description">
              Description:
            </label>
            <br />

            <textarea
              className="add-input add-tArea"
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
              className="add-input"
              onChange={handleChange}
              required
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
              className="add-input"
              onChange={handleChange}
              required
            />
            <br />
            <div className="text-center mt-4">
              <button
                className="btn add-submit"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddBook;
