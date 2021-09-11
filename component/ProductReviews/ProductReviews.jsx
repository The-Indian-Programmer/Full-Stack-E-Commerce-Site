import { useRouter } from "next/router";
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { postProductRating } from "../../src/routes/rating";
import { showNotification } from "../../store/index";
import EmptyEntry from "../Empty/EmptyEntry";

const ProductReviews = ({ data }) => {
  const user = useSelector((state) => state.setUser);
  const [productdata, setProductData] = useState(data);
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [ratingtext, setRatingtext] = useState("");
  const dispatch = useDispatch();
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    console.log(rating);
    console.log(ratingtext);
    const response = await postProductRating(
      "productrating/productrating",
      user._id,
      router.query.id,
      rating,
      ratingtext,
      user.name
    );
    if (response.err) {
      return dispatch(
        showNotification({
          show: true,
          data: { message: response.err, type: "error" },
        })
      );
    }
    setShowModal(false);
    setRating(0);
    setRatingtext("");
    setProductData(response.product);
    dispatch(
      showNotification({
        show: true,
        data: { message: response.message, type: "success" },
      })
    );
  };
  return (
    <div className="product_reviews">
      {/* submit reviews  */}
      <div onClick={() => setShowModal(true)} className="submit_review_box">
        <img src={user.avatar} alt="" className="image" />
        <p className="submit_text">Review This Product</p>
      </div>

      {/* reviews  */}
      <div className="reviews">
        {productdata.reviews.length === 0 ? (
          <EmptyEntry text="No Reviews! Be the first to submit a review" />
        ) : (
          ""
        )}
        {productdata.reviews.reverse().map((item, index) => {
          return (
            <div className="review_box">
              <p className="name">
                Name : <span>{item.username} </span>{" "}
              </p>

              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                value={item.rating}
                isHalf={true}
                edit={false}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
              <p className="review_text">{item.ratingtext}</p>
            </div>
          );
        })}
      </div>

      {/* modal  */}
      {showModal ? (
        <div className="review_modal">
          <form onSubmit={handleReviewSubmit}>
            <div className="rating">
              <label htmlFor="rating">Choose Rating : </label>
              <ReactStars
                id="rating"
                count={5}
                onChange={ratingChanged}
                size={24}
                value={rating}
                isHalf={true}
                edit={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#FFC527"
              />
            </div>
            <div className="text">
              <textarea
                name="ratingtext"
                value={ratingtext}
                onChange={(e) => setRatingtext(e.target.value)}
                placeholder="Enter Something..."
              ></textarea>
            </div>
            <div className="review_action_button">
              <button onClick={() => setShowModal(false)} className="close">
                Close
              </button>
              <button type="submit" className="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductReviews;
