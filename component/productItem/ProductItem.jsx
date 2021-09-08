import React, { useEffect, useState } from "react";
import { addToCart, setUser } from "../../store/index";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket } from "../../src/routes/userBasket";
import { useRouter } from "next/router";
import ReactStars from "react-rating-stars-component";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
const ProductItem = ({ data }) => {
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);
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
    setBtnLoading(true);
    if (checkItem.length === 0) {
      const res = await addToBasket("basket/addtobasket", {
        userId: user._id,
        data: { ...data, quantity: 1 },
      });
      if (res.err) {
        setBtnLoading(false);
        return alert(res.err);
      }
      dispatch(setUser(res.userdata));
      setBtnLoading(false);
    } else {
      setBtnLoading(false);
      return alert("Item is already is in your basket");
    }
  };
  return (
    <div className="productitem">
      <div className="productitem_header">
        <img src={data.images[0].url} alt="" />
      </div>
      <div className="productitem_body">
        <h6 className="category_text">{data.category}</h6>
        <h3 className="title">{data.title} Lorem ipsum dolor sit amet.</h3>
        <div className="rating">
          <span className="star">
            {" "}
            <ReactStars
              count={5}
              edit={false}
              size={24}
              value={4}
              activeColor="#ffd814"
            />
          </span>
          <span className="ratingaverage">4.5</span>
          <span className="totalreview">(20)</span>
        </div>
        <div className="pricing">
          <h4 className="price">$ {data.price}.00</h4>
          <h5 className="originalprice">$ {data.originalprice}</h5>
        </div>
        <div className="stock">
          <div className="progress">
            <div
              style={{
                width: `${data.inStock}%`,
                backgroundColor: `${
                  data.inStock < 5
                    ? "red"
                    : data.inStock < 15
                    ? "yellow"
                    : "green"
                }`,
              }}
            ></div>
          </div>
          <p
            style={{
              color: `${
                data.inStock < 5
                  ? "red"
                  : data.inStock < 15
                  ? "yellow"
                  : "green"
              }`,
            }}
            className="stock_text"
          >
            {data.inStock} available in stock
          </p>
        </div>
      </div>
      <div className="productitem_bottom">
        <button
          onClick={() => router.push(`/product/${data._id}`)}
          className="btn_buy_now"
        >
          Buy Now
        </button>
        <button onClick={addProductToBasket} className="btn_addtocart">
          {btnLoading ? <ButtonLoader /> : "Add To Cart"}
        </button>
      </div>

      <div className="discount">
        Save <span>$ {data.originalprice - data.price}</span>
      </div>
      {data.checked ? <div className="flash">Flash Sale</div> : ""}
    </div>
  );
};

export default ProductItem;
