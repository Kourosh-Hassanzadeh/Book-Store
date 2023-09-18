import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import { CgLogOut } from "react-icons/cg";
import { MdOutlinePostAdd } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import "./style.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
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
          {isLoggedIn && (
            <>
              <MdOutlinePostAdd className="nav-icons" size={20} />
              <li className="nav-item active mr-3">
                <NavLink className="nav-link" to="/createBook">
                  Add New Book
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <ul className="navbar-nav ml-auto">
          {isLoggedIn ? (
            <>
              <CgLogOut className="nav-icons" size={20} />
              <li className="nav-item active">
                <NavLink className="nav-link" to="/" onClick={handleLogout}>
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <FiLogIn className="nav-icons" size={20} />
              <li className="nav-item active">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
