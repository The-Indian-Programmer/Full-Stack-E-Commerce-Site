module.exports = {
  async rewrites() {
    return [
      {
        source: "/da4nd5uif/image/upload",
        destination: "https://api.cloudinary.com/v1_1/",
      },
    ];
  },
  env: {
    BASE_URL: "http://localhost:3000",
    MONGO_URL:
      "mongodb+srv://sumitkosta07:BKPPVfXk5rO0EtO9@cluster0.dntgo.mongodb.net/amazonnextapp?retryWrites=true&w=majority",
    SECRET_TOKEN:
      "Rf^nRB$XFEM5W@Pgh_5=8#%3&L?hz#8Xgq%NxekS9EY3veQ*qDj!Tr_6s%N@A2aw5E@%9Hb82X%7s_*6T!sv8H4M4Q?rGJRkw!VszRyzbCZSC_$f_p^Tk",

    CLOUD_UPDATE_PRESET: "next-ecommerce",
    CLOUD_NAME: "sumitkosta",
    CLOUD_API: "https://api.cloudinary.com/v1_1/sumitkosta/image/upload/",
  },
};
// https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/resources/image
