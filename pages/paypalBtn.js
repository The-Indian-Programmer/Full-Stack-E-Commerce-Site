import React, { useEffect, useRef } from "react";
import { addOrder } from "../src/routes/order";
import { setUser } from "../store/index";
const PaypalBtn = ({
  total,
  address,
  phone,
  user,
  dispatch,
  showNotification,
  setShowButton,
}) => {
  const paypalref = useRef();
  useEffect(() => {
    paypal
      .Buttons({
        // Sets up the transaction when a payment button is clicked
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: Math.ceil(total / 73.73), // Can reference variables or functions. Example: `value: document.getElementById('...').value`
                },
                item_list: {
                  shipping_address: {
                    recipient_name: "Sumit Kosta",
                    line2: "Unit #34",
                    city: "Rath",
                    country_code: "India",
                    postal_code: "210431",
                    phone: "9956573349",
                    state: "Uttar Pradesh",
                  },
                },
              },
            ],
          });
        },

        // Finalize the transaction after payer approval
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            // Successful capture! For dev/demo purposes:
            addOrder("orders/addorder", user, { address, phone }, total).then(
              (res) => {
                dispatch(
                  showNotification({
                    show: true,
                    data: { message: res.message, type: "success" },
                  })
                );
                dispatch(setUser(res.user));
                setShowButton(false);
                return;
              }
            );
          });
        },
      })
      .render(paypalref.current);
  }, []);
  return <div ref={paypalref}></div>;
};

export default PaypalBtn;
