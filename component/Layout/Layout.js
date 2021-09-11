import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Notification from "../Notification/Notification";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer";
const Layout = ({ children }) => {
  const show = useSelector((state) => state.show);
  const theme = useSelector((state) => state.theme);

  return (
    <>
      <Navbar />
      <Notification />
      <div className={`main_page ${theme ? "dark" : "light"}`}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
