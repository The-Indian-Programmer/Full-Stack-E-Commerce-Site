const baseurl = process.env.BASE_URL;

export const postProductReply = async (
  url,
  userid,
  username,
  question,
  productid,
  replytext
) => {
  const res = await fetch(`/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid, username, question, productid, replytext }),
  });
  const data = await res.json();
  return data;
};
// export const putProductQuestion = async (url, post) => {
//   const res = await fetch(`/api/${url}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(post),
//   });
//   const data = await res.json();
//   return data;
// };
// // export const patchData = async (url, post, token) => {
// //   const res = await fetch(`/api/${url}`, {
// //     method: "PATCH",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: token,
// //     },
// //     body: JSON.stringify(post),
// //   });
// //   const data = await res.json();
// //   return data;
// // };

// export const deleteProductQuestion = async (url, id) => {
//   const res = await fetch(`/api/${url}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: id,
//     },
//   });
//   const data = await res.json();
//   return data;
// };
