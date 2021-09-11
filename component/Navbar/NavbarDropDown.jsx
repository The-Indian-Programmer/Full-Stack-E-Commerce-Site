import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../store/index";
import Link from "next/link";
const NavbarDropDown = ({ showDropDown, setShowDropDown }) => {
  const user = useSelector((state) => state.setUser);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const VerifyUser = () => {
    if (user.role === "admin") {
      return (
        <>
          <Link href={`/profile/${user._id}`}>
            <p className="profile_text">
              <span>
                <i class="fas fa-user"></i>
              </span>{" "}
              Profile
            </p>
          </Link>
          <Link href={`/admin/products`}>
            <p className="profile_text">
              <span>
                <i class="fas fa-user"></i>
              </span>{" "}
              Products
            </p>
          </Link>
          <Link href={`/admin/categories`}>
            <p className="profile_text">
              <span>
                <i class="fas fa-user"></i>
              </span>{" "}
              Categories
            </p>
          </Link>
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
          <Link href={`/profile/${user._id}`}>
            <p className="profile_text">
              <span>
                <i class="fas fa-user"></i>
              </span>{" "}
              Profile
            </p>
          </Link>

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

      <p onClick={() => dispatch(setTheme(!theme))} className="close_text">
        <span>
          {theme ? <i class="fas fa-sun"></i> : <i class="fas fa-moon"></i>}
        </span>{" "}
        {theme ? "Light Mode" : "Dark Mode"}
      </p>

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
