// const baseurl = process.env.BASE_URL;
const baseurl = "https://full-stack-e-commerce-site.vercel.app";

export const postProductRating = async (
  url,
  userid,
  productid,
  rating,
  ratingtext,
  name
) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userid,
      productid,
      rating,
      ratingtext,
      name,
    }),
  });
  const data = await res.json();
  return data;
};
export const putProductRating = async (url, post) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};
