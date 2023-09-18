import React, { useState } from "react";
import axios from "axios";
import "./style.css";

const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [pass2, setPass] = useState("");

  const checkPasswords = (pass1) => {
    if (pass1 === pass2) {
      return true;
    } else {
      alert("passwords does not match");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkPasswords(data.password)) {
      try {
        axios
          .post("http://127.0.0.1:5000/createUser", JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
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
    <section className="container-fluid reg-bg">
      <div className="row justify-content-center">
        <h3 className="reg-text mt-4">Register</h3>
      </div>
      <div className="row justify-content-center mt-3">
        <form method="POST">
          <div className="form-group">
            <label className="log-text" htmlFor="username">
              Username:
            </label>
            <br />
            <input
              className="form-control reg-input"
              type="text"
              name="username"
              id="username"
              value={data.username}
              placeholder="enter your username"
              onChange={handleChange}
            />
            <br />
            <label className="reg-text" htmlFor="email">
              Email:
            </label>
            <br />
            <input
              className="form-control reg-input"
              type="email"
              name="email"
              id="email"
              value={data.email}
              placeholder="enter your email"
              onChange={handleChange}
            />
            <br />
            <label className="reg-text" htmlFor="password">
              Password:
            </label>
            <br />
            <input
              className="form-control reg-input"
              type="password"
              name="password"
              id="password"
              placeholder="enter your password"
              autoComplete=""
              onChange={handleChange}
            />
            <br />
            <label className="reg-text" htmlFor="repeat-password">
              Repeat Your Password:
            </label>
            <br />
            <input
              className="form-control reg-input"
              type="password"
              name="repeat-password"
              id="repeat-password"
              placeholder="repeat your password"
              autoComplete=""
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <br />
            <div className="text-center">
              <button
                className="btn reg-btn"
                type="button"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="row justify-content-center">
        <h6 className="reg-log">
          Already have account?{" "}
          <a className="reg-link" href="/login">
            Login
          </a>
        </h6>
      </div>
    </section>
  );
};

export default Register;
