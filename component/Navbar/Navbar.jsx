import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
const Navbar = ({ children }) => {
  const user = useSelector((state) => state.setUser);
  const signOut = () => {
    Cookies.remove("userAuth");
  };
  return (
    <div className="header">
      <div className="header_left">
        <Link href="/">
          <h2 className="logo">E-Commerce App</h2>
        </Link>
        <i className="fas fa-bars menu_icon"></i>
        <div className="input">
          <input
            type="text"
            className="input_search"
            placeholder="Search Any Product"
          />
          <i className="fas fa-search search_icon"></i>
        </div>
      </div>

      <div className="header_right">
        <ul>
          <Link href="/">
            <li className="link">
              <i className="fas fa-home icon home_icon"></i>
              <p className="text">Home</p>
            </li>
          </Link>
          <Link href="/cart">
            <li className="link">
              <i className="fas fa-shopping-cart icon cart_icon"></i>
              <p className="text">
                Cart{Object.keys(user).length !== 0 ? user.basket.length : ""}
              </p>
            </li>
          </Link>
          {Object.keys(user).length !== 0 ? (
            <>
              <Link href="profile">
                <li className="link">
                  <i className="fas fa-user signout_icon"></i>
                  <p className="text">Profile</p>
                </li>
              </Link>
              <li onClick={() => signOut()} className="link">
                <i className="fas fa-sign-out-alt icon signout_icon"></i>
                <p className="text">SignOut</p>
              </li>
            </>
          ) : (
            <>
              <Link href="signin">
                <li className="link">
                  <i className="fas fa-user-circle icon signin_icon"></i>
                  <p className="text">SignIn</p>
                </li>
              </Link>
              <Link href="/register">
                <li className="link">
                  <i className="fas fa-user-circle icon signin_icon"></i>
                  <p className="text">Register</p>
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
