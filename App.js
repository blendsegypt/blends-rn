import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
//Redux
import { store, persistor } from "./src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
//Screens
import Home from "./src/screens/Home";
import PinDrop from "./src/screens/PinDrop";
import Support from "./src/screens/Support";
import Product from "./src/screens/Product";
//Tab Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
//Tab Bar settings
import tabBarSettings from "./src/tabBarSettings";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tabBar,
        activeTintColor: "#C84D49",
        showLabel: false,
      }}
      screenOptions={tabBarSettings}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Support" component={Support} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PinDrop" component={PinDrop} />
            <Stack.Screen name="Home" component={HomeTabs} />
            <Stack.Screen name="Product" component={Product} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15.65,
    elevation: 8,
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: "#fff",
    paddingBottom: 0,
  },
});

export default App;
