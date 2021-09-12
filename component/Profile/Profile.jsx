import { useRouter } from "next/router";
import React from "react";
import ProfileUserInfo from "./ProfileUserInfo/ProfileUserInfo";
import ProfileUserActivityInfo from "./ProfileUserActivityInfo/ProfileUserActivityInfo";
import { useSelector } from "react-redux";
const UserProfile = ({ orderdata, data }) => {
  const user = useSelector((state) => state.setUser);
  const router = useRouter();

  return (
    <>
      <div className="profile_header">
        <div className="image_profile">
          <img
            src={user.avatar}
            alt={user.username}
            className="profile_image"
          />
          <div className="detail">
            <h2 className="profile_name">{user.name}</h2>
            <p className="profile_email">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="profile_body">
        <ProfileUserActivityInfo orderdata={orderdata} data={data} />
      </div>
    </>
  );
};

export default UserProfile;
