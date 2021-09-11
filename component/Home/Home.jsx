import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getProductByCategory,
  getProductData,
} from "../../src/routes/productData";
import ProductItem from "../productItem/ProductItem";

const Homes = ({ data }) => {
  const inputsearchCategory = useSelector((state) => state.searchCategory);
  const [productData, setProductData] = useState(data);
  useEffect(async () => {
    if (inputsearchCategory === "all") {
      const response = await getProductData("product/getallproducts");
      setProductData(response.data);
    } else {
      const response = await getProductByCategory(
        "product/getproductbycategory",
        inputsearchCategory
      );
      setProductData(response.data);
    }
  }, [inputsearchCategory]);
  return (
    <>
      <h1 className="product_text">Products</h1>
      <div className="products">
        {productData.length === 0 ? <h4>No Product To Show</h4> : ""}
        {productData.map((item) => {
          return <ProductItem key={item._id} data={item} />;
        })}
      </div>
    </>
  );
};

export default Homes;
