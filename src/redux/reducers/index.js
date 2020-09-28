import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import itemsReducer from "./items.reducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  userReducer,
  itemsReducer,
  cartReducer,
});

export default rootReducer;
