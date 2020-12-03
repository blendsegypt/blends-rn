import React, {useState} from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
//Components
import CheckoutProgress from "../../components/CheckoutProgress";
import CartItem from "./components/CartItem";
//Bottom Sheets
import BottomSheetOverlay from "../../components/BottomSheetOverlay";
import UserActions from "../../BottomSheets/UserActions";
//Redux
import {connect} from "react-redux";
import {getCartItems} from "../../redux/selectors/cartItems";
//Assets
import EmptyCartIllustration from "../../../assets/EmptyCartIllustration.png";

function Cart({
  navigation,
  cartItems,
  cartTotal,
  cartCount,
  loggedIn,
  addressConfirmed,
}) {
  // Show / hide phone confirmation bottom sheet
  const [showUserActionsSheet, setShowUserActionsSheet] = useState(false);

  const closeSheet = () => {
    setShowUserActionsSheet(false);
    Keyboard.dismiss();
    if (loggedIn && !addressConfirmed) {
      // If phone number is confirmed and there's no address, navigate to Address Details
      navigation.navigate("AddressDetails");
    } else if (loggedIn && addressConfirmed) {
      // If both phone number and address are confirmed, navigate to Review Order screen
      navigation.navigate("ReviewOrder", {threeStepsCheckout: false});
    }
  };

  const checkout = () => {
    if (loggedIn && !addressConfirmed) {
      // If phone number is confirmed and there's no address, navigate to Address Details
      navigation.navigate("AddressDetails");
    } else if (loggedIn && addressConfirmed) {
      // If both phone number and address are confirmed, navigate to Review Order screen
      navigation.navigate("ReviewOrder", {threeStepsCheckout: false});
    } else {
      // If nothing is confirmed, show phone confirmation bottom sheet
      setShowUserActionsSheet(true);
    }
  };

  // Check if cart is empty
  if (cartCount === 0) {
    return (
      <>
        <View style={{flexDirection: "column", flex: 1}}>
          <SafeAreaView>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{flex: 0.5, paddingTop: 25}}>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  size={22}
                  color="#11203E"
                />
              </TouchableOpacity>
              <Text bold style={styles.screenTitle}>
                Cart{" "}
              </Text>
              {cartCount > 0 && (
                <View style={styles.count}>
                  <Text style={{color: "#fff"}}>{cartCount}</Text>
                </View>
              )}
            </View>
          </SafeAreaView>
          <View
            style={{
              paddingHorizontal: 25,
              alignItems: "center",
            }}>
            <Image
              source={EmptyCartIllustration}
              style={{width: 325, height: 280, marginTop: 50}}
              resizeMode="contain"
            />
            <Text semiBold style={styles.emptyCartTitle}>
              Your cart seems to be empty!
            </Text>
            <Text regular style={styles.emptyCartMessage}>
              Start by browsing the store and picking products.
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 25, paddingBottom: 25}}>
          <Button
            blends
            onPress={() => {
              navigation.navigate("Home");
            }}>
            Go to Store
          </Button>
        </View>
      </>
    );
  }
  return (
    <>
      {showUserActionsSheet && (
        <BottomSheetOverlay
          setShowBottomSheet={(state) => setShowUserActionsSheet(state)}
        />
      )}
      <View style={{flex: 1}}>
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                flex: 0.5,
                paddingTop: 25,
                paddingLeft: 10,
              }}>
              <FontAwesomeIcon icon={faChevronLeft} size={22} color="#11203E" />
            </TouchableOpacity>
            <Text bold style={styles.screenTitle}>
              Cart{" "}
            </Text>
            <View style={styles.count}>
              <Text style={{color: "#fff"}}>{cartCount}</Text>
            </View>
          </View>
        </SafeAreaView>
        {addressConfirmed ? (
          <CheckoutProgress
            steps={[
              {
                label: "Cart",
                active: true,
              },
              {
                label: "Review",
                active: false,
              },
            ]}
          />
        ) : (
          <CheckoutProgress
            steps={[
              {
                label: "Cart",
                active: true,
              },
              {
                label: "Address Details",
                active: false,
              },
              {
                label: "Review",
                active: false,
              },
            ]}
          />
        )}
        {/* Cart Items */}
        <ScrollView style={styles.cartContainer}>
          {cartItems.map((item, index) => {
            return <CartItem {...item} key={index} />;
          })}
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 25,
            backgroundColor: "#fff",
            paddingBottom: 25,
          }}>
          {/* Checkout Button */}
          <Button
            price={cartTotal + " EGP"}
            onPress={() => {
              checkout();
            }}>
            Checkout
          </Button>
        </View>
      </View>
      {showUserActionsSheet && (
        <UserActions
          showUserActionsSheet={showUserActionsSheet}
          closeSheet={closeSheet}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 25,
    marginTop: 10,
    flexDirection: "row",
  },
  screenTitle: {
    fontSize: 25,
    paddingTop: 20,
  },
  cartContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15.65,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  count: {
    backgroundColor: "#11203E",
    width: 30,
    height: 30,
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: 100,
    marginTop: Platform.OS == "ios" ? 20 : 25,
  },
  emptyCartTitle: {
    fontSize: 22,
    paddingTop: 15,
    color: "#11203E",
  },
  emptyCartMessage: {
    fontSize: 15,
    paddingTop: 3,
    textAlign: "center",
    color: "#919191",
    lineHeight: 22,
  },
});

const mapStateToProps = (state) => {
  const {cartItems, cartTotal, cartCount} = getCartItems(state);
  const {loggedIn, addressConfirmed} = state.userReducer;
  return {
    cartItems,
    cartTotal,
    cartCount,
    loggedIn,
    addressConfirmed,
  };
};

export default connect(mapStateToProps, null)(Cart);
