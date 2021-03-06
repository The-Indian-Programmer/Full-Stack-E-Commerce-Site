import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  deleteProductData,
  getProductData,
} from "../../../src/routes/productData";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../store/index";

const Products = ({ product }) => {
  const router = useRouter();
  const [productData, setProductData] = useState(product);
  const dispatch = useDispatch();
  const handleProductDelete = async (index, id) => {
    const deleteResponse = await deleteProductData("product/deleteproduct", id);
    if (deleteResponse.err) {
      return dispatch(
        showNotification({
          show: true,
          data: { message: deleteResponse.err, type: "error" },
        })
      );
    }
    const newItem = productData.filter((item) => {
      return item._id !== id;
    });
    setProductData(newItem);
    dispatch(
      showNotification({
        show: true,
        data: { message: deleteResponse.message, type: "success" },
      })
    );
  };
  return (
    <>
      <Head>
        <title>Admin Products Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
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
          {productData.map((item, index) => {
            return (
              <tr key={index} className="body">
                <td>{index + 1}</td>
                <td
                  onClick={() => router.push(`/product/${item._id}`)}
                  className="product_title"
                >
                  {item.title.toUpperCase()}
                </td>
                <td>{item.price}</td>
                <td>{item.originalprice}</td>
                <td>{item.sold}</td>
                <td>{item.inStock}</td>
                <td>{item.checked ? "Yes" : "No"}</td>
                <td className="action_buttons">
                  <i
                    onClick={() =>
                      router.push(`/admin/editproduct/${item._id}`)
                    }
                    className="fas fa-edit product_edit"
                  ></i>
                  <i
                    onClick={() => handleProductDelete(index, item._id)}
                    className="far fa-trash-alt product_delete"
                  ></i>
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
