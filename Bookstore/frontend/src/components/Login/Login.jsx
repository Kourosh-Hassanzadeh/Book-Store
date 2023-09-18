import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./style.css";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axios
        .post("http://127.0.0.1:5000/login", JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("token", token);
          login();
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <section className="container-fluid log-bg">
      <div className="row justify-content-center">
        <h3 className="log-text mt-4">Login</h3>
      </div>
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <form method="POST">
          <div className="form-group">
            <label className="log-text" htmlFor="username">
              Username:
            </label>
            <br />
            <input
              className="form-control log-input"
              type="text"
              name="username"
              id="username"
              placeholder="enter your username"
              value={data.username}
              onChange={handleChange}
            />
            <br />
            <label className="log-text" htmlFor="password">
              Password:
            </label>
            <br />
            <input
              className="form-control log-input"
              type="password"
              name="password"
              id="password"
              placeholder="enter your password"
              autoComplete=""
              value={data.password}
              onChange={handleChange}
            />
            <br />
            <div className="text-center">
              <button
                className="btn log-btn"
                type="button"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="row justify-content-center">
        <h6 className="log-reg">
          Don't have account?{" "}
          <a className="log-link" href="/register">
            Register
          </a>
        </h6>
      </div>
    </section>
  );
};

export default Login;
