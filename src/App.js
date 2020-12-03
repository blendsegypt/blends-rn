import React, {useState} from "react";
import {StatusBar} from "react-native";
//Redux
import {store, persistor} from "./redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
//Toast messages
import Toast from "react-native-toast-message";
import toastConfig from "./utils/toastConfig";
//Main navigation router
import Router from "./router";
//Axios
import {authInterceptor} from "./utils/axios";

function App() {
  const [initialRouteName, setInitialRouteName] = useState("Home");
  const authenticateUser = () => {
    /*

      Check if user has a location and is logged in.
      @initialRoute(Home) => If the user chose a location or has atleast 1 address
      @intialRoute(PinDrop)  => no locations & no addresses

    */
    const {loggedIn, addresses, location} = store.getState().userReducer;
    if (Object.keys(location).length === 0 && addresses.length === 0) {
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
