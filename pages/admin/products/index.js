import React, { useEffect } from "react";
import Head from "next/head";
import { getProductData } from "../../../src/routes/productData";
import { useRouter } from "next/router";

const Products = ({ product }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Admin Products Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossorigin="anonymous"
        />
      </Head>
      <main className="products_page">
        <div className="create_button">
          <span onClick={() => router.push("/admin/createproduct")}>
            Add New Product <i className="fas fa-plus"></i>
          </span>
        </div>
        <table id="mytable">
          <tr className="head">
            <th>Index</th>
            <th>Product</th>
            <th>Price</th>
            <th>Original Price</th>
            <th>Sold</th>
            <th>InStock</th>
            <th>IsPrime</th>
            <th>Actions</th>
          </tr>
          {product.map((item, index) => {
            return (
              <tr className="body">
                <td>{index + 1}</td>
                <td
                  onClick={() => router.push(`product/${item._id}`)}
                  className="product_title"
                >
                  {item.title.toUpperCase()}
                </td>
                <td>{item.price}</td>
                <td>{item.originalprice}</td>
                <td>{item.sold}</td>
                <td>{item.inStock}</td>
                <td>{item.isPrime ? "Yes" : "No"}</td>
                <td className="action_buttons">
                  <i
                    onClick={() => router.push(`admin/editproduct/${item._id}`)}
                    className="fas fa-edit product_edit"
                  ></i>
                  <i className="far fa-trash-alt product_delete"></i>
                </td>
              </tr>
            );
          })}
        </table>
      </main>
    </>
  );
};

export default Products;
export async function getServerSideProps() {
  const response = await getProductData("product/getallproducts");
  return {
    props: { product: response.data }, // will be passed to the page component as props
  };
}
