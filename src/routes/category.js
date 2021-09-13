// const baseurl = process.env.BASE_URL;
const baseurl = "https://full-stack-e-commerce-site.vercel.app";

export const getCategories = async (url) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};
export const createCategories = async (url, name) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  return data;
};
export const deleteCategories = async (url, id) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const data = await res.json();
  return data;
};
export const updateCategories = async (url, putdata) => {
  const res = await fetch(`${baseurl}/api/${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(putdata),
  });
  const data = await res.json();
  return data;
};
