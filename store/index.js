export const showNotification = (data) => {
  return {
    type: "SHOWNOTIFICATION",
    payload: data,
  };
};

export const setUser = (data) => {
  return { type: "SETUSER", payload: data };
};

export const addToCart = (data) => {
  return {
    type: "ADDTOCART",
    payload: data,
  };
};
export const removeFromCart = (data) => {
  return {
    type: "REMOVEFROMCART",
    payload: data,
  };
};

export const increaseProduct = (data) => {
  return {
    type: "INCREASEPRODUCT",
    payload: data,
  };
};

export const decreaseProduct = (data) => {
  return {
    type: "DECREASEPRODUCT",
    payload: data,
  };
};

export const setCategory = (data) => {
  return {
    type: "SETCATEGORY",
    payload: data,
  };
};

export const deleteCategory = (data) => {
  return {
    type: "DELETECATEGORY",
    payload: data,
  };
};

export const editCategory = (data) => {
  return {
    type: "EDITCATEGORY",
    payload: data,
  };
};
