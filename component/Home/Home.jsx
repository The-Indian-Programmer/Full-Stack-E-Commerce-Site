import React from "react";
import ProductItem from "../productItem/ProductItem";
const Homes = ({ data }) => {
  return (
    <>
      <h1 className="product_text">Products</h1>
      <div className="products">
        {data.map((item) => {
          return <ProductItem key={item._id} data={item} />;
        })}
      </div>
    </>
  );
};

export default Homes;
