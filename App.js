import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet } from "react-native";
//Redux
import { store, persistor } from "./src/redux/store";
import { Provider, connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
//Screens
import Home from "./src/screens/Home";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.background}>
          <Home />
        </View>
        <StatusBar style="dark" />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FCFBFB",
  },
});

export default App;
