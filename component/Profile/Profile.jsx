import { useRouter } from "next/router";
import React from "react";
import ProfileUserInfo from "./ProfileUserInfo/ProfileUserInfo";
import ProfileUserActivityInfo from "./ProfileUserActivityInfo/ProfileUserActivityInfo";
const UserProfile = ({ orderdata, data }) => {
  const router = useRouter();
  const adminRouter = () => {
    return (
      <div className="admin_button">
        <button
          onClick={() => router.push("/admin/categories")}
          className="btn_categories"
        >
          Categories
        </button>
        <button
          onClick={() => router.push("/admin/products")}
          className="btn_products"
        >
          Products
        </button>
      </div>
    );
  };
  return (
    <>
      <div className="profile_header">
        <i onClick={() => router.back()} class="fas fa-chevron-left"></i>
        {data.role === "admin" && adminRouter()}
        {data.role !== "admin" ? (
          <div className="breadcrumps">
            <span onClick={() => router.push("/")} className="home">
              Home
            </span>
            <span className="profile">/Profile</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="profile_body">
        <ProfileUserInfo data={data} />
        <ProfileUserActivityInfo orderdata={orderdata} data={data} />
      </div>
    </>
  );
};

export default UserProfile;
