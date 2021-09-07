import React, { useState } from "react";
import UserOrders from "../../UserOrders/UserOrders";
import UserQuestions from "../../UserQuestion/UserQuestions";
import UserReviews from "../../UserReview/UserReviews";
const ProfileUserActivityInfo = ({ orderdata }) => {
  const [tab, setTab] = useState(0);
  return (
    <div className="activity_info">
      <div className="tabs">
        <p
          className={`orders_tab ${tab === 0 ? "active" : ""}`}
          onClick={() => setTab(0)}
        >
          Orders
        </p>
        <p
          className={`review_tab ${tab === 1 ? "active" : ""}`}
          onClick={() => setTab(1)}
        >
          Reviews
        </p>
        <p
          className={`question_tab ${tab === 2 ? "active" : ""}`}
          onClick={() => setTab(2)}
        >
          Questions
        </p>
      </div>
      {tab === 0 ? (
        <UserOrders orderdata={orderdata} />
      ) : tab === 1 ? (
        <UserReviews />
      ) : tab === 2 ? (
        <UserQuestions />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileUserActivityInfo;
