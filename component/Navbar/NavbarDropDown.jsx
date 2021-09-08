import React from "react";
import { useSelector } from "react-redux";

const NavbarDropDown = ({ showDropDown, setShowDropDown }) => {
  const user = useSelector((state) => state.setUser);
  const VerifyUser = () => {
    if (user.role === "user") {
      return (
        <>
          <p className="profile_text">
            <span>
              <i class="fas fa-user"></i>
            </span>{" "}
            Profile
          </p>
          <p className="profile_text">
            <span>
              <i class="fas fa-user"></i>
            </span>{" "}
            Products
          </p>
          <p className="profile_text">
            <span>
              <i class="fas fa-user"></i>
            </span>{" "}
            Categories
          </p>
          <p className="logout_text">
            <span>
              <i class="fas fa-sign-in-alt"></i>
            </span>{" "}
            Logout
          </p>
        </>
      );
    } else {
      return (
        <>
          <p className="profile_text">
            <span>
              <i class="fas fa-user"></i>
            </span>{" "}
            Profile
          </p>
          <p className="logout_text">
            <span>
              <i class="fas fa-sign-in-alt"></i>
            </span>{" "}
            Logout
          </p>
        </>
      );
    }
  };
  return (
    <div className="profile_option">
      <VerifyUser />
      <p onClick={() => setShowDropDown(!showDropDown)} className="close_text">
        <span>
          <i class="fas fa-times"></i>
        </span>{" "}
        Close
      </p>
    </div>
  );
};

export default NavbarDropDown;
