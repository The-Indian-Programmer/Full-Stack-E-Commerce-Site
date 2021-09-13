import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  removeFromBasket,
  increaseProduct,
  decreaseProduct,
} from "../../src/routes/userBasket";
import { removeFromCart, setUser, showNotification } from "../../store/index";
const CartItem = ({ item }) => {
  const user = useSelector((state) => state.setUser);
  const dispatch = useDispatch();
  const increaseItem = async () => {
    const res = await increaseProduct("basket/increasebasket", {
      data: item,
      userId: user._id,
    });
    if (res.err) {
      dispatch(
        showNotification({
          show: true,
          data: { message: res.err, type: "error" },
        })
      );
      return;
    }
    dispatch(setUser(res.userdata));
  };
  const decreaseItem = async () => {
    const res = await decreaseProduct("basket/decreasebasket", {
      data: item,
      userId: user._id,
    });
    if (res.err) {
      dispatch(
        showNotification({
          show: true,
          data: { message: res.err, type: "error" },
        })
      );
      return;
    }
    dispatch(setUser(res.userdata));
  };
  const removeItem = async () => {
    const response = await removeFromBasket("basket/removefrombasket", {
      data: item,
      userId: user._id,
    });
    if (response.err) {
      dispatch(
        showNotification({
          show: true,
          data: { message: response.err, type: "error" },
        })
      );
      return;
    }
    dispatch(setUser(response.userdata));
  };
  return (
    <div className="cart_item">
      <div className="image">
        <img src={item.images[0].url} alt="" className="cart_image" />
      </div>
      <div className="cart_detail">
        <h2 className="title">{item.title.toUpperCase()}</h2>
        <p className="description">{item.description}</p>
        <div className="price_box">
          <p className="price">
            &#8377; <span> {item.price}</span>
          </p>
          <p className="original_price">
            &#8377; <span> {item.originalprice}</span>
          </p>
        </div>
        <div className="actionbuttons">
          <div className="count">
            <button
              onClick={item.quantity === 1 ? removeItem : decreaseItem}
              className="decrease_button"
            >
              {item.quantity === 1 ? (
                <i class="far fa-trash-alt"></i>
              ) : (
                <i class="fas fa-minus"></i>
              )}
            </button>
            <p className="quantity">{item.quantity}</p>
            <button onClick={() => increaseItem()} className="increase_button">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <button onClick={() => removeItem()} className="remove_button">
            Remove From Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
