import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
const Layout = ({ children }) => {
  const show = useSelector((state) => state.show);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;

const Toast = () => {
  toast("🦄 Wow so easy!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
Toast();

export { Toast };
