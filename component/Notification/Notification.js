import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showNotification } from "../../store/index";
const Notification = () => {
  const notification = useSelector((state) => state.show);
  const dispatch = useDispatch();
  const type = notification.data.type;
  const message = notification.data.message;
  let emoji = "";
  if (type === "success") {
    emoji = "✅";
  } else if (type === "warning") {
    emoji = "⚠️";
  } else {
    emoji = "❌";
  }
  const show = () => {
    toast.success(`${emoji} ${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      type: `dark`,
      progress: undefined,
    });
    dispatch(
      showNotification({ show: false, data: { message: "", type: "" } })
    );
  };

  if (notification.show === true) {
    show();
  }
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Notification;
