const initialState = "all";
const searchCategory = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCHCATEGORY":
      state = action.payload;
      return state;
      break;

    default:
      return state;
      break;
  }
};

export default searchCategory;
