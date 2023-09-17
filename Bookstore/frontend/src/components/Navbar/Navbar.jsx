import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import { MdOutlinePostAdd } from "react-icons/md";
import "./style.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light navBg">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <HiOutlineHome className="nav-icons" size={20} />
          <li className="nav-item active mr-3">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <MdOutlinePostAdd className="nav-icons" size={20} />
          <li className="nav-item active mr-3">
            <NavLink className="nav-link" to="/createBook">
              Add New Book
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <FiLogIn className="nav-icons" size={20} />

          <li className="nav-item active">
            <NavLink className="nav-link" to="/">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
