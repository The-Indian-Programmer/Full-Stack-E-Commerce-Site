import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDeliveryStatus } from "../../src/routes/order";
import { showNotification } from "../../store/index";

const UserOrders = ({ orderdata }) => {
  const router = useRouter();
  const user = useSelector((state) => state.setUser);
  const [deliveredButton, setDeliveredButton] = useState(false);
  const dispatch = useDispatch();

  const handleDeliveryStatusChange = async (userid, orderid) => {
    const response = await changeDeliveryStatus(
      "orders/deliveryStatus",
      userid,
      orderid
    );
    if (response.err) {
      return dispatch(
        showNotification({
          show: true,
          data: { message: response.err, type: "error" },
        })
      );
    }
    return dispatch(
      showNotification({
        show: true,
        data: { message: response.message, type: "success" },
      })
    );
  };

  return (
    <div className="user_orders">
      {orderdata.reverse().map((orderitem) => {
        return (
          <div key={orderitem._id} className="order_item">
            <div className="top">
              <p className="order_id">{orderitem._id}</p>
              <p className="order_date">
                Date: <span>{orderitem.orderdate}</span>
              </p>
              <p className="order_status">
                {orderitem.delivered ? (
                  <p className="deliverd">Delivered</p>
                ) : user.role === "admin" ? (
                  <button
                    onClick={() =>
                      handleDeliveryStatusChange(user._id, orderitem._id)
                    }
                    className="btn_deliver_mark"
                  >
                    Mark As Delivered
                  </button>
                ) : (
                  "Not Delivered"
                )}
              </p>
            </div>
            <div className="body">
              {orderitem.productInfo.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="box"
                    onClick={() => router.push(`/product/${item._id}`)}
                  >
                    <img
                      src={item.images[0].url}
                      alt=""
                      className="product_image"
                    />
                    <p className="product_title">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserOrders;
