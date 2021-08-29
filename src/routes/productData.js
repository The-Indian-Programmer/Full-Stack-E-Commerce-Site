const baseurl = process.env.BASE_URL;
export const getProductData = async (url) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};
export const getProductById = async (url, id) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  const data = await res.json();
  return data;
};
export const postProductData = async (url, post) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};
// export const putData = async (url, post, token) => {
//   const res = await fetch(`${baseurl}/api/${url}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//     body: JSON.stringify(post),
//   });
//   const data = await res.json();
//   return data;
// };
// export const patchData = async (url, post, token) => {
//   const res = await fetch(`${baseurl}/api/${url}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//     body: JSON.stringify(post),
//   });
//   const data = await res.json();
//   return data;
// };

// export const deleteData = async (url, token) => {
//   const res = await fetch(`${baseurl}/api/${url}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//     body: JSON.stringify(post),
//   });
//   const data = await res.json();
//   return data;
// };