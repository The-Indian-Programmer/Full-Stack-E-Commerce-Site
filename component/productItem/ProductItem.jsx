import React, { useEffect, useState } from "react";
import { addToCart, setUser } from "../../store/index";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket } from "../../src/routes/userBasket";
import { useRouter } from "next/router";
const ProductItem = ({ data }) => {
  const router = useRouter();
  // const basket = useSelector((state) => state.basket);
  const user = useSelector((state) => state.setUser);
  const dispatch = useDispatch();
  const addProductToBasket = async () => {
    let checkItem = [];
    if (user.basket.length !== 0) {
      checkItem = user.basket.filter((item) => {
        return item._id === data._id;
      });
    }
    if (checkItem.length === 0) {
      const res = await addToBasket("basket/addtobasket", {
        userId: user._id,
        data: { ...data, quantity: 1 },
      });
      if (res.err) {
        alert(res.err);
      }
      dispatch(setUser(res.userdata));
    } else {
      alert("Item is already is in your basket");
    }
  };
  return (
    <div className="productitem">
      <div className="productitem_header">
        <img src={data.images[0].url} alt="" />
      </div>
      <div className="productitem_body">
        <h3 className="title">{data.title}</h3>
        <h4 className="price">
          Price :<span>$ {data.price}</span>
        </h4>
        <h5 className="originalprice">
          Original Price: <span>$ {data.originalprice}</span>
        </h5>
        <p className="description">{data.description}</p>
      </div>
      <div className="productitem_bottom">
        <button
          onClick={() => router.push(`/product/${data._id}`)}
          className="btn_buy_now"
        >
          Buy Now
        </button>
        <button onClick={addProductToBasket} className="btn_addtocart">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
