module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/da4nd5uif/image/upload",
        destination: "https://api.cloudinary.com/v1_1/",
      },
    ];
  },
  // env: {
  //   BASE_URL: "http://localhost:3000",
  //   MONGO_URL:
  //     "mongodb+srv://sumitkostarath:sgn6Eai91Yp4GFYL@cluster0.dntgo.mongodb.net/amazonnextapp?retryWrites=true&w=majority",
  //   SECRET_TOKEN:
  //     "Rf^nRB$XFEM5W@Pgh_5=8#%3&L?hz#8Xgq%NxekS9EY3veQ*qDj!Tr_6s%N@A2aw5E@%9Hb82X%7s_*6T!sv8H4M4Q?rGJRkw!VszRyzbCZSC_$f_p^Tk",

  //   CLOUD_UPDATE_PRESET: "next-ecommernce",
  //   CLOUD_NAME: "sumitkosta",
  //   CLOUD_API: "https://api.cloudinary.com/v1_1/sumitkosta/image/upload",
  //   PAYPAL_CLIENT_ID:
  //     "AYkeSfjbUKZmWg-pJ3RpHW95QWSKtX5ItvCPBSPZ7hEfU4n7zovEJHIf5ZLu1FydD0SN9NV-5s48ZSSB",
  //   PAYPAL_CLIENT_SECET:
  //     "EG_Yl8jL-w5OFOsWrpRnGWhPe78Gy22andvkgeOZwq6MYYLT2-fqwmEMaHlnYFysUAE52nW2vkKI9joG",
  // },
};
