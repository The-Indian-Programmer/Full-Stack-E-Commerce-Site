const initialState = false;
const theme = (state = initialState, action) => {
  switch (action.type) {
    case "SETTHEME":
      state = action.payload;
      return state;
      break;

    default:
      return state;
      break;
  }
};
export default theme;
