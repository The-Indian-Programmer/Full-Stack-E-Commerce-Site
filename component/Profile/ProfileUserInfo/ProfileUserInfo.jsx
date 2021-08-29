import React from "react";

const ProfileUserInfo = ({ data }) => {
  console.log(data);
  return (
    <div className="profile_info">
      <div className="image">
        <img src={data.avatar} alt="" className="userimage" />
      </div>
      <div className="details">
        <h4 className="detail_text">Contact Details</h4>
        <div className="name">
          <p className="name_text">Name:</p>
          <p className="user_name">Sumit Kosta</p>
        </div>
        <div className="email">
          <p className="email_text">Email:</p>
          <p className="user_email">sumitkosta07@gmail.com</p>
        </div>
        <div className="address">
          <p className="address_text">Address:</p>
          <p className="user_address">
            580 new basti charkhari road rath Near by Sharda palace Rath, UTTAR
            PRADESH 210431 India
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserInfo;
