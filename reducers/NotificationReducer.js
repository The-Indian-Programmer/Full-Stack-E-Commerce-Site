const initialState = false;
const show = (state = initialState, action) => {
  switch (action.type) {
    case "SHOWNOTIFICATION":
      state = true;
      return state;
      break;

    default:
      return state;
      break;
  }
};

export default show;
