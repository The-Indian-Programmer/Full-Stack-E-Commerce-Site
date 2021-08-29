import show from "./NotificationReducer";
import setUser from "./AuthReducer";
import basket from "./BasketReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  show,
  setUser,
  basket,
});

export default rootReducer;
