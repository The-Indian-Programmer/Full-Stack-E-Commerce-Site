import show from "./NotificationReducer";
import setUser from "./AuthReducer";
import basket from "./BasketReducer";
import category from "./CategoryReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  show,
  setUser,
  basket,
  category,
});

export default rootReducer;
