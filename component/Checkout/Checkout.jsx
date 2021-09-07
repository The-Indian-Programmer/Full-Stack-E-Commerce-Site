import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, showNotification } from "../../store/index";
import PaypalBtn from "../../pages/paypalBtn";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import { addOrder } from "../../src/routes/order";
const Checkout = ({ user, data }) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({ phone: "", address: "" });
  const [showButton, setShowButton] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  let amount = 0;
  data.forEach((element) => {
    amount = amount + element.price * element.quantity;
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const { phone, address } = userInfo;

    if (!phone || !address) {
      return dispatch(
        showNotification({
          show: true,
          data: {
            message: "Please fill the address and phone.",
            type: "error",
          },
        })
      );
    }
    setBtnLoader(true);
    // const orderResponse = await addOrder(
    //   "orders/addorder",
    //   user,
    //   userInfo,
    //   amount
    // );
    // if (orderResponse.err) {
    //   return dispatch(
    //     showNotification({
    //       show: true,
    //       data: { message: orderResponse.err, type: "error" },
    //     })
    //   );
    // }
    // dispatch(
    //   showNotification({
    //     show: true,
    //     data: { message: orderResponse.message, type: "success" },
    //   })
    // );
    // dispatch(setUser(orderResponse.user));
    setShowButton(true);
    setBtnLoader(false);
  };
  return (
    <>
      <div className="checkout">
        <div className="checkout_container">
          <h2 className="items">
            Total items: <span>{data.length}</span>
          </h2>
          <h3 className="amount">
            Total Amount: <span>$ {amount} Only</span>
          </h3>
          <form>
            <div className="address">
              <input
                type="text"
                name="address"
                className="address_input"
                placeholder="Enter Your Address"
                value={userInfo.address}
                onChange={handleChange}
              />
            </div>
            <div className="phone">
              <input
                type="tel"
                name="phone"
                className="phone_input"
                placeholder="Enter Your Phone"
                onChange={handleChange}
                value={userInfo.phone}
              />
            </div>
            <button
              onClick={handleCheckout}
              // onClick={() => setShowButton(true)}
              className="checkout_submit"
              name="checkout"
              type="submit"
            >
              {btnLoader ? <ButtonLoader /> : "Checkout"}
            </button>
          </form>
        </div>
      </div>
      {showButton ? (
        <div className="paymentmodal">
          <div className="paypal">
            <PaypalBtn
              setShowButton={setShowButton}
              total={amount}
              address={userInfo.address}
              phone={userInfo.phone}
              user={user}
              dispatch={dispatch}
              showNotification={showNotification}
            />
          </div>
          <span onClick={() => setShowButton(!showButton)}>Close</span>
        </div>
      ) : (
        " "
      )}
    </>
  );
};

export default Checkout;
