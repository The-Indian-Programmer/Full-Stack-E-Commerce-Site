import React from "react";

const Banner = () => {
  return (
    <div className="banner">
      {/* banner left  */}
      <div className="banner_left">
        <h1 className="main_text">All you need for your home.</h1>
        <p className="desc_text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias
          suscipit provident minima similique ratione voluptatibus! Aliquid
          voluptas vel sequi ea?
        </p>
        <button className="btn_main">Browse Products</button>
      </div>
      {/* banner right  */}
      <div className="banner_right">
        <img
          src="https://res.cloudinary.com/sumitkosta/image/upload/v1631068689/nextjs-ecommerce/rb4xklcmkb8hgi5j8acz.png"
          alt=""
          className="banner_image"
        />
      </div>
    </div>
  );
};

export default Banner;
