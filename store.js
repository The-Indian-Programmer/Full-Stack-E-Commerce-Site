import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers/index";
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));
export default store;
