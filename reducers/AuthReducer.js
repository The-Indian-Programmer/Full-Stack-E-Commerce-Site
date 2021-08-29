import { removeFromBasket } from "../src/routes/userBasket";

const initialState = {};
const setUser = (state = initialState, action) => {
  switch (action.type) {
    case "SETUSER":
      state = action.payload;
      return state;
      break;

    case "REMOVEFROMCART":
      return state;
      break;
    default:
      return state;
      break;
  }
};

export default setUser;
