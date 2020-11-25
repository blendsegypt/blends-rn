import {createStore, applyMiddleware} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import AsyncStorage from "@react-native-community/async-storage";

//Data Persistence configuration
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [],
  blacklist: ["userReducer", "cartReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export {store, persistor};
