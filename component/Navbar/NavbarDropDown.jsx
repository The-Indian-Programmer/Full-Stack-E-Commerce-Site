import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { setUser } from "../../store/index";
const NavbarDropDown = ({ showDropDown, setShowDropDown }) => {
  const router = useRouter();
  const user = useSelector((state) => state.setUser);
  const dispatch = useDispatch();
  const signOut = () => {
    Cookies.remove("userAuth");
    dispatch(setUser({}));
    router.push("/signin");
  };
  const VerifyUser = () => {
    if (user.role === "admin") {
      return (
        <>
          <Link href={`/profile/${user._id}`}>
            <p className="profile_text">
              <span>
                <i className="fas fa-user"></i>
              </span>{" "}
              Profile
            </p>
          </Link>
          <Link href={`/admin/products`}>
            <p className="profile_text">
              <span>
                <i className="fas fa-user"></i>
              </span>{" "}
              Products
            </p>
          </Link>
          <Link href={`/admin/categories`}>
            <p className="profile_text">
              <span>
                <i className="fas fa-user"></i>
              </span>{" "}
              Categories
            </p>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link href={`/profile/${user._id}`}>
            <p className="profile_text">
              <span>
                <i className="fas fa-user"></i>
              </span>{" "}
              Profile
            </p>
          </Link>
        </>
      );
    }
  };
  return (
    <div className="profile_option">
      <VerifyUser />
      <p onClick={() => signOut()} className="logout_text">
        <span>
          <i className="fas fa-sign-in-alt"></i>
        </span>{" "}
        Logout
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
