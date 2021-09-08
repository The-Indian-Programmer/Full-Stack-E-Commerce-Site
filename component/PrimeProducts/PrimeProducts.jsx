import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { useRouter } from "next/router";
const PrimeProducts = ({ data }) => {
  const router = useRouter();
  const primeData = data.filter((item) => {
    return item.checked === true;
  });

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <div className="prime_products">
        <h1 className="discount_text">Recent Discount</h1>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={responsive !== "mobile" ? false : false}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all .5s"
          transitionDuration={1000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={[]}
          deviceType={responsive.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {primeData.map((item, index) => {
            return (
              <Link href={`/product/${item._id}`}>
                <div key={index} className={`prime_product`}>
                  <div className="box">
                    <h4 className="title">{item.title} </h4>
                    <p className="desc">{item.description}</p>
                    <button
                      onClick={() => router.push(`/product/${item._id}`)}
                      className="btn_buy"
                    >
                      Shop Now
                    </button>
                    <img
                      src={item.images[0].url}
                      alt=""
                      className="prime_product_image"
                    />
                    {/* right arrow  */}
                  </div>
                </div>
              </Link>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default PrimeProducts;
