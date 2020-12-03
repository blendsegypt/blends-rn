import React, {useState} from "react";
//Screens
// -- Tab Screens
import Home from "./screens/Home";
import Orders from "./screens/Orders";
import Support from "./screens/Support";
// -- Home Stack navigation screens
import PinDrop from "./screens/PinDrop";
import Product from "./screens/Product";
import Cart from "./screens/Cart";
import AddressDetails from "./screens/AddressDetails";
import ReviewOrder from "./screens/ReviewOrder";
import OrderConfirmed from "./screens/OrderConfirmed";
// -- Orders Stack navigation screens
import OrderDetails from "./screens/OrderDetails";
// -- Account Stack navigation screens
import Account from "./screens/Account";
import PersonalInformation from "./screens/AccountStack/PersonalInformation";
import SavedAddresses from "./screens/AccountStack/SavedAdresses";
import InviteAFriend from "./screens/AccountStack/InviteAFriend";
import EditAddress from "./screens/AccountStack/EditAddress";
//Tab Navigation
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
//Tab Bar settings / styles
import {tabBarSettings, tabBarStyle} from "./utils/tabBar";
//Bottom Sheets
import ChooseAddress from "./screens/bottomSheets/ChooseAddress";
import BottomSheetOverlay from "./components/BottomSheetOverlay";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const StackOrders = createStackNavigator();
const StackAccount = createStackNavigator();

// Orders Stack screens
function OrdersStack() {
  return (
    <StackOrders.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </StackOrders.Navigator>
  );
}

function AccountStack() {
  return (
    <StackAccount.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
      />
      <Stack.Screen name="SavedAddresses" component={SavedAddresses} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="InviteAFriend" component={InviteAFriend} />
    </StackAccount.Navigator>
  );
}

// Home Tabs screens
function HomeTabs({navigation}) {
  /*
   *
   *  (note) Bottom sheet was placed here to snap above the tab bar
   *  TODO: replace the bottom sheet to a more appropriate place
   *
   */
  const [chooseAddressShown, setChooseAddressShown] = useState(false);

  return (
    <>
      {/* Bottom Sheet Overlay */}
      {chooseAddressShown && (
        <BottomSheetOverlay
          setShowBottomSheet={(state) => setChooseAddressShown(state)}
        />
      )}
      <Tab.Navigator
        tabBarOptions={{
          style: tabBarStyle,
          activeTintColor: "#C84D49",
          showLabel: false,
        }}
        screenOptions={tabBarSettings}>
        <Tab.Screen name="Home">
          {(props) => (
            <Home
              {...props}
              setChooseAddressShown={setChooseAddressShown}
              chooseAddressShown={chooseAddressShown}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Orders" component={OrdersStack} />
        <Tab.Screen name="Account" component={AccountStack} />
        <Tab.Screen name="Support" component={Support} />
      </Tab.Navigator>
      {/* Choose Address Bottom Sheet */}
      {chooseAddressShown && (
        <ChooseAddress
          chooseAddressShown={chooseAddressShown}
          setChooseAddressShown={setChooseAddressShown}
          navigation={navigation}
        />
      )}
    </>
  );
}

function Router({initalRouteName}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initalRouteName}>
        <Stack.Screen name="PinDrop" component={PinDrop} />
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="AddressDetails" component={AddressDetails} />
        <Stack.Screen name="ReviewOrder" component={ReviewOrder} />
        <Stack.Screen name="OrderConfirmed" component={OrderConfirmed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
