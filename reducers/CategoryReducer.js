const initialState = [];
const category = (state = initialState, action) => {
  switch (action.type) {
    case "SETCATEGORY":
      state = action.payload;

      return state;
      break;

    case "DELETECATEGORY":
      state = state;
      return state;
      break;

    case "EDITCATEGORY":
      state = state;
      return state;
      break;

    default:
      return state;
      break;
  }
};
export default category;
