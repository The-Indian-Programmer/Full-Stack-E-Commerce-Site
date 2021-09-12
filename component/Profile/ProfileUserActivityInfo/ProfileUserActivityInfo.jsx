import React, { useState } from "react";
import UserOrders from "../../UserOrders/UserOrders";
import UserQuestions from "../../UserQuestion/UserQuestions";
import UserReviews from "../../UserReview/UserReviews";
const ProfileUserActivityInfo = ({ orderdata }) => {
  return (
    <div className="activity_info">
      <p className="order_text">Orders</p>
      <UserOrders orderdata={orderdata} />
    </div>
  );
};

export default ProfileUserActivityInfo;
