import { useRouter } from "next/router";
import React from "react";

const UserOrders = ({ orderdata }) => {
  const router = useRouter();
  console.log(orderdata);
  return (
    <div className="user_orders">
      {orderdata.map((orderitem, index) => {
        return (
          <div className="order_item">
            <div className="top">
              <p className="order_id">{orderitem._id}</p>
              <p className="order_date">
                Date: <span>{orderitem.orderdate}</span>
              </p>
              <p className="order_status">
                {orderitem.delivered ? (
                  <p className="deliverd">Delivered</p>
                ) : (
                  <p className="notdeliverd">Not Delivered</p>
                )}
              </p>
            </div>
            <div className="body">
              {orderitem.productInfo.map((item, index) => {
                return (
                  <div
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
