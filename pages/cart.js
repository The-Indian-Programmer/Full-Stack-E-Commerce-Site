import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CartItem from "../component/CartItem/CartItem";
import Loader from "../component/Loader/Loader";
import { getData } from "../src/routes/userData";
import { setUser } from "../store/index";
import Head from "next/head";
import Checkout from "../component/Checkout/Checkout";
import { useRouter } from "next/router";
const Cart = () => {
  const dispatch = useDispatch();
  const cookie = Cookies.get("userAuth");
  const user = useSelector((state) => state.setUser);
  const router = useRouter();
  useEffect(() => {
    if (cookie === undefined) {
      router.push("../signin");
    } else {
      setUserInRedux();
    }
  }, []);
  const setUserInRedux = async () => {
    const response = await getData("auth/getuser", cookie);
    dispatch(setUser(response.data));
  };
  return (
    <div className="cart">
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
        <script
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}&currency=USD`}
        ></script>
      </Head>
      <main>
        {Object.keys(user).length === 0 ? (
          <Loader />
        ) : (
          <>
            <div className="cart_items">
              {user.basket.length === 0 ? (
                <div className="emptybasket">
                  <img
                    src="https://res.cloudinary.com/sumitkosta/image/upload/v1630935833/samples/tlyvyd1w3ds41exxnc3u.png"
                    alt=""
                  />
                </div>
              ) : (
                ""
              )}
              {/* cart-item  */}
              {user.basket.map((item) => {
                return <CartItem item={item} />;
              })}
            </div>
            <div className="checkout">
              <Checkout user={user} data={user.basket} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Cart;
