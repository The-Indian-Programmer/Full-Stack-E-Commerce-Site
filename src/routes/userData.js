// const baseurl = process.env.BASE_URL;
const baseurl = "https://full-stack-e-commerce-site.vercel.app";
export const getData = async (url, token) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const data = await res.json();
  return data;
};
export const postData = async (url, post) => {
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
export const putData = async (url, post, token) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};
export const patchData = async (url, post, token) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};

export const deleteData = async (url, token) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};
