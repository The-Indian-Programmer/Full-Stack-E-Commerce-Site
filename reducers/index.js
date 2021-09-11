import show from "./NotificationReducer";
import setUser from "./AuthReducer";
import basket from "./BasketReducer";
import category from "./CategoryReducer";
import searchCategory from "./SearchCategoryReducer";
import theme from "./ThemeReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  show,
  setUser,
  basket,
  category,
  searchCategory,
  theme,
});

export default rootReducer;
