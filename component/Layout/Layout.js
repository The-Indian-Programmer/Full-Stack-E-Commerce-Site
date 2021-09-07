import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Notification from "../Notification/Notification";
import { toast, ToastContainer } from "react-toastify";
const Layout = ({ children }) => {
  const show = useSelector((state) => state.show);
  return (
    <>
      <Navbar />
      <Notification />
      {children}
    </>
  );
};

export default Layout;
