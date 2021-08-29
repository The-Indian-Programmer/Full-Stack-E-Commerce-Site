const initialState = [];
const basket = (state = initialState, action) => {
  switch (action.type) {
    case "ADDTOCART":
      state = [...state, action.payload];
      return state;
      break;

    default:
      return state;
      break;
  }
};
export default basket;
