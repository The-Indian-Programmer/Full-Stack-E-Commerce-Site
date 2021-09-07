const initialState = { show: false, data: { message: "", type: "" } };
const show = (state = initialState, action) => {
  switch (action.type) {
    case "SHOWNOTIFICATION":
      state = action.payload;
      return state;
      break;

    default:
      return state;
      break;
  }
};

export default show;
