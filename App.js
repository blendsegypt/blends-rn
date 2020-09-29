import { StatusBar } from "expo-status-bar";
import React from "react";
//Redux
import { store, persistor } from "./src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
//Screens
import Home from "./src/screens/Home";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Home />
        <StatusBar style="dark" />
      </PersistGate>
    </Provider>
  );
}

export default App;
