const baseUrl = process.env.BASE_URL;

export const postProductRating = async (
  url,
  userid,
  productid,
  rating,
  ratingtext,
  name
) => {
  const res = await fetch(`/api/${url}`, {
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
  const res = await fetch(`/api/${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};
