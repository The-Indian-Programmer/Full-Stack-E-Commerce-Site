import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getCategories } from "../../src/routes/category";
import { showNotification } from "../../store";
import { useDispatch } from "react-redux";
import { searchCategory, setCategory } from "../../store/index";
import NavbarDropDown from "./NavbarDropDown";
const Navbar = ({ children }) => {
  const user = useSelector((state) => state.setUser);
  const inputsearchCategory = useSelector((state) => state.searchCategory);
  const category = useSelector((state) => state.category);
  const [search, setSearch] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const dispatch = useDispatch();
  useEffect(async () => {
    const response = await getCategories("category/getcategory");
    if (response.err)
      dispatch(
        showNotification({
          show: true,
          data: { message: "Sorry Category not found !", type: "error" },
        })
      );
    dispatch(setCategory(response.data));
  }, []);
  return (
    <div className="header">
      {/* header left  */}
      <Link href="/">
        <div className="header_left">
          <div className="logo">
            <img
              src="https://res.cloudinary.com/sumitkosta/image/upload/v1631034881/vmtrnolycnzkgx3v191e.png"
              alt=""
              className="logo_image"
            />
            <p className="logo_text">Next E-Commerce</p>
          </div>
        </div>
      </Link>
      {/* header middle */}
      <div className="header_middle">
        <select
          name="selectcategories"
          id="selectcategories"
          value={inputsearchCategory}
          onChange={(e) => dispatch(searchCategory(e.target.value))}
        >
          <option value="all" name="category">
            {" "}
            ALL
          </option>
          {category.map((item) => {
            return (
              <option value={item.name} name="category">
                {item.name.toUpperCase()}
              </option>
            );
          })}
        </select>
        {/* /// search  */}
        <div className="search">
          <input
            type="text"
            className="input_search"
            value={search}
            placeholder="Search Here"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="header_right">
        <Link href="/cart">
          <div className="cart">
            <i className="fas fa-shopping-cart shopping_icon"></i>
            <span className="cart_count">
              {user.basket ? user.basket.length : "0"}
            </span>
          </div>
        </Link>
        <div className="profile">
          <img
            src={user.avatar}
            className="profile_image"
            alt=""
            onClick={() => setShowDropDown(!showDropDown)}
          />
          {showDropDown ? (
            <NavbarDropDown
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
