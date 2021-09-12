const initialState = {};
const product = (state = initialState, action) => {
  switch (action.type) {
    case "SETPRODUCT":
      state = action.payload;
      return state;
      break;

    default:
      return state;
      break;
  }
};
export default product;
