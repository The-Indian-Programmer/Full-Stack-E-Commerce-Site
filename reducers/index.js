import show from "./NotificationReducer";
import setUser from "./AuthReducer";
import basket from "./BasketReducer";
import category from "./CategoryReducer";
import searchCategory from "./SearchCategoryReducer";
import product from "./ProductReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  show,
  setUser,
  basket,
  category,
  searchCategory,
  product,
});

export default rootReducer;
