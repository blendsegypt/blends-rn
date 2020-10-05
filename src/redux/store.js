import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./reducers";
import AsyncStorage from "@react-native-community/async-storage";

//Data Persistence configuration
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userReducer"],
  blacklist: ["itemsReducer", "cartReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
