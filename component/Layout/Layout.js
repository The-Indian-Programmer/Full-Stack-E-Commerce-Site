import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Notification from "../Notification/Notification";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer";
const Layout = ({ children }) => {
  const show = useSelector((state) => state.show);
  return (
    <>
      <Navbar />
      <Notification />
      <div className="main_page">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
