import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Notification from "../Notification/Notification";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer";
const Layout = ({ children }) => {
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.setUser);
  return (
    <>
      {Object.keys(user).length !== 0 ? <Navbar /> : ""}
      <Notification />

      <div
        style={{ minHeight: "100vh" }}
        className={`main_page ${theme ? "dark" : "light"}`}
      >
        {children}
      </div>
      {Object.keys(user).length !== 0 ? <Footer /> : ""}
    </>
  );
};

export default Layout;
