import React, {useState, useEffect} from "react";
import {StatusBar} from "react-native";
//Redux
import {store, persistor} from "./src/redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
//Toast messages
import Toast from "react-native-toast-message";
import toastConfig from "./src/utils/toastConfig";
//Main navigation router
import Router from "./src/router";
//Axios
import {authInterceptor} from "./src/utils/axios";

function App() {
  const [initialRouteName, setInitialRouteName] = useState("Home");
  const authenticateUser = () => {
    /*

      Check if user has a location and is logged in.
      @initialRoute(Home) => If the user chose a location or has atleast 1 address
      @intialRoute(PinDrop)  => no locations & no addresses

    */
    const {loggedIn, addresses, location} = store.getState().userReducer;
    if (!location && addresses.length === 0) {
      setInitialRouteName("PinDrop");
    }

    // Activate axios interceptor to authenticate requests (if user is logged in)
    if (loggedIn) {
      authInterceptor.activate();
    }
  };
  return (
    <>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={authenticateUser}>
          <Router initalRouteName={initialRouteName} />
        </PersistGate>
      </Provider>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      <StatusBar barStyle="dark-content" />
    </>
  );
}

export default App;
