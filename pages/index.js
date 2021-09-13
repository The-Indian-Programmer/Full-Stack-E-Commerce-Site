import Head from "next/head";
import styles from "../styles/Home.module.css";
import Homes from "../component/Home/Home";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setProduct, setUser } from "../store/index";
import { useRouter } from "next/dist/client/router";
import { getData } from "../src/routes/userData";
import { searchCategory } from "../store/index";
import { getProductData } from "../src/routes/productData";
import Banner from "../component/Banner/Banner";
import PrimeProducts from "../component/PrimeProducts/PrimeProducts";
import FooterBanner from "../component/FooterBanner/FooterBanner";
function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cookie = Cookies.get("userAuth");
  const router = useRouter();
  useEffect(() => {
    if (cookie === undefined) {
      router.push("/signin");
    } else {
      setUserInRedux();
    }
  }, []);

  useEffect(async () => {
    const response = await getProductData("product/getallproducts");
    setProducts(response.data);
  }, [products]);

  const setUserInRedux = async () => {
    const response = await getData("auth/getuser", cookie);
    dispatch(setUser(response.data));
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>E Commerce App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        />
      </Head>

      <main className={styles.main}>
        <Banner />
        <div className="homepage">
          {products.length !== 0 ? (
            <>
              <PrimeProducts data={products} />
              <Homes data={products} />
            </>
          ) : (
            ""
          )}
        </div>
        <FooterBanner />
      </main>
    </div>
  );
}
export default Home;
// export async function getServerSideProps() {
//   const response = await getProductData("product/getallproducts");
//   return {
//     props: { data: response.data }, // will be passed to the page component as props
//   };
// }
