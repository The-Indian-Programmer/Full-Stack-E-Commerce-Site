module.exports = {
  async rewrites() {
    return [
      {
        source: "/da4nd5uif/image/upload",
        destination: "https://api.cloudinary.com/v1_1/",
      },
    ];
  },
};
