// const baseurl = process.env.BASE_URL;
const baseurl = "https://full-stack-e-commerce-site.vercel.app";

export const addOrder = async (url, user, userInfo, amount) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, userInfo, amount }),
  });
  const data = await res.json();
  return data;
};
export const getUserOrders = async (url, email) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: email,
    },
  });
  const data = await res.json();
  return data;
};
export const changeDeliveryStatus = async (url, userid, orderid) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid, orderid }),
  });

  const data = await res.json();
  return data;
};
// export const deleteCategories = async (url, id) => {
//   const res = await fetch(`${baseurl}/api/${url}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id }),
//   });
//   const data = await res.json();
//   return data;
// };
// export const updateCategories = async (url, putdata) => {
//   const res = await fetch(`${baseurl}/api/${url}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(putdata),
//   });
//   const data = await res.json();
//   return data;
// };
