import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
//UI Components
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";
import Link from "../components/ui/Link";
import TextInput from "../components/ui/TextInput";
//Components
import CheckoutProgress from "../components/CheckoutProgress";
import OrderReceipt from "../components/OrderReceipt";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
//Redux
import { connect } from "react-redux";
import { getCartItems } from "../redux/selectors/cartItems";
//Keyboard Aware ScrollView
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ReviewOrder({ route, navigation, userAddress, cartItems, cartTotal }) {
  const { threeStepsCheckout } = route.params;
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Cart");
              }}
              style={{ flex: 0.5, paddingTop: 25 }}
            >
              <FontAwesome name="chevron-left" size={22} color="#11203E" />
            </TouchableOpacity>
            <Text bold style={styles.screenTitle}>
              Review Order
            </Text>
          </View>
        </SafeAreaView>
        {/* Checkout Progress Bar */}
        {threeStepsCheckout ? (
          <CheckoutProgress
            steps={[
              {
                label: "Cart",
                active: true,
              },
              {
                label: "Address Details",
                active: true,
              },
              {
                label: "Review",
                active: true,
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
                label: "Review",
                active: true,
              },
            ]}
          />
        )}
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <Text style={styles.containerTitle}>Order Details</Text>
          {/* Address / Payment Method */}
          <View style={styles.deliveryDetails}>
            <View
              style={[
                styles.deliveryOption,
                { borderBottomWidth: 1, borderBottomColor: "#EFEFEF" },
              ]}
            >
              <FontAwesome
                style={{ flex: 0.13 }}
                name="map-marker"
                size={27}
                color="#11203E"
              />
              <Text bold style={{ flex: 0.83, fontSize: 15, color: "#11203E" }}>
                {userAddress.addressName}
              </Text>
              <Link disabled style={{ flex: 0.04 }}>
                Change
              </Link>
            </View>
            <View style={[styles.deliveryOption, { paddingVertical: 21 }]}>
              <FontAwesome5
                style={{ flex: 0.13 }}
                name="hand-holding-usd"
                size={23}
                color="#11203E"
              />
              <Text bold style={{ flex: 0.83, fontSize: 15, color: "#11203E" }}>
                Cash on Delivery
              </Text>
              <Link disabled style={{ flex: 0.04 }}>
                Change
              </Link>
            </View>
          </View>
          {/* Order Receipt */}
          <OrderReceipt
            cartItems={cartItems}
            cartTotal={cartTotal}
            showPromotionInput
          />
        </ScrollView>
        {/* Confirm Button */}
        <View
          style={{
            paddingHorizontal: 25,
            backgroundColor: "#fff",
            paddingVertical: 25,
          }}
        >
          <Button
            onPress={() => {
              navigation.navigate("OrderConfirmed");
            }}
          >
            Confirm Order
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  container: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15.65,
    elevation: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
    flex: 1,
  },
  containerTitle: {
    color: "#C84D49",
    fontSize: 16,
  },
  deliveryDetails: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15.65,
    elevation: 8,
    borderRadius: 25,
    marginTop: 15,
  },
  deliveryOption: {
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  const { cartItems, cartTotal } = getCartItems(state);
  return {
    userAddress: state.userReducer.savedAddresses[0],
    cartItems,
    cartTotal,
  };
};

export default connect(mapStateToProps, null)(ReviewOrder);
