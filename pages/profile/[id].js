import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getData } from "../../src/routes/userData";
import { useRouter } from "next/router";
import { setUser } from "../../store/index";
import UserProfile from "../../component/Profile/Profile";
import { getUserOrders } from "../../src/routes/order";
const Profile = ({ data }) => {
  const cookie = Cookies.get("userAuth");
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.setUser);
  useEffect(() => {
    if (cookie === undefined) {
      router.push("/signin");
    } else {
      setUserInRedux();
    }
  }, []);
  const setUserInRedux = async () => {
    const response = await getData("auth/getuser", cookie);
    dispatch(setUser(response.data));
  };
  return (
    <div className="profile_page">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        />
      </Head>
      <main className="profile_container">
        <UserProfile orderdata={data} data={user} />
      </main>
    </div>
  );
};

export default Profile;
export async function getServerSideProps(context) {
  const response = await getUserOrders("orders/getuserorder", context.query.id);
  return {
    props: {
      data: response.data,
    },
  };
}
