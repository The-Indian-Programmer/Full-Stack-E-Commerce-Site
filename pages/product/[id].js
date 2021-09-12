import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getProductById } from "../../src/routes/productData";
import { getData } from "../../src/routes/userData";
import { useDispatch } from "react-redux";
import { setProduct, setUser } from "../../store/index";
import Head from "next/head";
import { addToBasket } from "../../src/routes/userBasket";
import { useSelector } from "react-redux";
import ProductQuestions from "../../component/ProductQuestions/ProductQuestions";
import ReactStars from "react-rating-stars-component";

import ProductReviews from "../../component/ProductReviews/ProductReviews";
const ProductId = ({ data }) => {
  const dispatch = useDispatch();
  dispatch(setProduct(data.product));
  const product = useSelector((state) => state.product);
  const user = useSelector((state) => state.setUser);
  const [tab, setTab] = useState(0);
  const cookie = Cookies.get("userAuth");
  const router = useRouter();
  const { id } = router.query;
  const [showTab, setShowTab] = useState(0);
  useEffect(() => {
    if (cookie === undefined) {
      router.push("../signin");
    } else {
      setUserInRedux();
    }

    if (data.err) {
      alert(data.err);
      return;
    }
  }, []);

  // set User in redux
  const setUserInRedux = async () => {
    const response = await getData("auth/getuser", cookie);
    dispatch(setUser(response.data));
  };

  let productRating = 0;
  for (let i = 0; i < product.reviews.length; i++) {
    const element = product.reviews[i];
    productRating = productRating + element.rating;
  }

  // add product to baset
  const addProductToBasket = async () => {
    const checkItem = user.basket.filter((item) => {
      return item._id === data._id;
    });
    if (checkItem.length === 0) {
      const res = await addToBasket("basket/addtobasket", {
        userId: user._id,
        data: { ...data.product, quantity: 1 },
      });
      if (res.err) {
        alert(res.err);
      }
      dispatch(setUser(res.userdata));
      alert("Item added");
    } else {
      alert("Item is already is in your basket");
    }
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossorigin="anonymous"
        />
      </Head>
      <>
        <div className="productpage">
          {/* image container  */}
          <div className="images_container">
            <div className="image">
              <img
                src={product.images ? product.images[tab].url : ""}
                alt=""
                className="product_image"
              />
            </div>
            <div className="image_slider">
              {product.images.map((item, index) => {
                return (
                  <img
                    key={index}
                    src={item.url}
                    onClick={() => setTab(index)}
                    alt=""
                    className="slide_image"
                  />
                );
              })}
            </div>
          </div>
          <div className="productdetail_container">
            <h6 className="category_text">{product.category}</h6>
            <h2 className="product_title">{product.title}</h2>
            <div className="description">
              <p className="descriptiontext">{product.description}</p>
            </div>
            <div className="product_review">
              <h3 className="review_text">{product.reviews.length} Reviews</h3>
              <ReactStars
                count={5}
                edit={false}
                size={24}
                half={true}
                value={productRating / product.reviews.length}
                activeColor="#ffd814"
              />
            </div>
            <div className="pricing">
              <p className="price">
                &#8377; <span>{product.price}</span>
              </p>
              <p className="originalprice">
                &#8377; <span>{product.originalprice}</span>
              </p>
              <p className="priceoff">
                Now {(product.originalprice / product.price).toFixed(2)}% off
              </p>
            </div>
            <div className="stock">
              <p className="stocktext">{product.inStock} left in stock</p>
            </div>
            <div className="content">
              <p className="content_text">{product.content}</p>
            </div>
            <button onClick={() => addProductToBasket()} className="addtocart">
              Add To Cart
            </button>
          </div>
        </div>
        <hr style={{ marginTop: "1rem" }} />
      </>
      <div className="product_info_tabs">
        <div className="tab_header ">
          <p
            onClick={() => setShowTab(0)}
            className={`review_text ${showTab === 0 ? "active" : ""}`}
          >
            Reviews
          </p>
          <p
            onClick={() => setShowTab(1)}
            className={`question_text  ${showTab === 1 ? "active" : ""}`}
          >
            Questions
          </p>
        </div>
        <div className="tab_container">
          {showTab === 0 ? (
            <ProductReviews data={product} />
          ) : showTab === 1 ? (
            <ProductQuestions data={product} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ProductId;
export async function getServerSideProps(context) {
  const response = await getProductById(
    "product/getproductbyid",
    context.query.id
  );
  return {
    props: {
      data: response,
    },
  };
}
