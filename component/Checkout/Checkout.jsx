import React from "react";

const Checkout = ({ data }) => {
  let amount = 0;
  data.forEach((element) => {
    amount = amount + element.price * element.quantity;
  });
  return (
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
              className="address_input"
              placeholder="Enter Your Address"
            />
          </div>
          <div className="phone">
            <input
              type="text"
              className="phone_input"
              placeholder="Enter Your Phone"
            />
          </div>
          <button className="checkout_submit" type="submit">
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
