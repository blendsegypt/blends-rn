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
          <View style={styles.deliveryDetails}>
            {cartItems.map((item, index) => {
              // Generate the text for product customization description
              let selectedOptionsText = "";
              item.selectedOptions.forEach((option, index) => {
                selectedOptionsText += option.textValue;
                if (index == item.selectedOptions.length - 2) {
                  selectedOptionsText += " & ";
                } else if (index != item.selectedOptions.length - 1) {
                  selectedOptionsText += ", ";
                }
              });
              return (
                // Cart Items
                <View key={index} style={styles.itemContainer}>
                  <Image
                    source={item.image}
                    style={{ width: 45, height: 43, flex: 0.2 }}
                    resizeMode="contain"
                  />
                  <View style={{ flex: 0.53 }}>
                    <Text>{item.name}</Text>
                    <Text regular style={{ color: "#999999" }}>
                      {selectedOptionsText}
                    </Text>
                  </View>
                  <View>
                    <View style={styles.quantity}>
                      <Text style={{ color: "#fff" }}>{item.quantity}</Text>
                    </View>
                  </View>
                  <Text
                    bold
                    style={{ flex: 0.27, textAlign: "right", color: "#11203E" }}
                  >
                    {item.price.toFixed(2)} EGP
                  </Text>
                </View>
              );
            })}
            {/* Subtotal & Delivery Charges */}
            <View style={styles.subtotal}>
              {/* Subtotal */}
              <View style={{ flexDirection: "row", paddingVertical: 15 }}>
                <Text
                  style={{ fontSize: 14, flex: 0.76, color: "#11203E" }}
                  semiBold
                >
                  Subtotal
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#11203E",
                    flex: 0.24,
                    textAlign: "right",
                  }}
                  semiBold
                >
                  {cartTotal} EGP
                </Text>
              </View>
              {/* Delivery Charges */}
              <View style={{ flexDirection: "row", paddingVertical: 15 }}>
                <Text
                  style={{ fontSize: 14, flex: 0.8, color: "#9C9C9C" }}
                  semiBold
                >
                  Delivery Charges
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#9C9C9C",
                    flex: 0.2,
                    textAlign: "right",
                  }}
                  semiBold
                >
                  5.00 EGP
                </Text>
              </View>
            </View>
            {/* Promotion Input Field */}
            <View>
              <TextInput
                style={{
                  borderRadius: 0,
                  marginVertical: 0,
                  fontSize: 14,
                  flex: 0.7,
                  zIndex: 1,
                }}
              >
                Promotion Code (optional)
              </TextInput>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  paddingHorizontal: 22,
                  paddingVertical: 20,
                  zIndex: 99,
                }}
              >
                <Text style={{ color: "#437FD9" }}>Apply</Text>
              </TouchableOpacity>
            </View>
            {/* Total */}
            <View style={styles.total}>
              <Text bold style={{ color: "#fff", flex: 0.75 }}>
                Total
              </Text>
              <Text
                bold
                style={{ color: "#fff", flex: 0.25, textAlign: "right" }}
              >
                {(Number(cartTotal) + 5).toFixed(2)} EGP
              </Text>
            </View>
          </View>
        </ScrollView>
        {/* Confirm Button */}
        <View
          style={{
            paddingHorizontal: 25,
            backgroundColor: "#fff",
            paddingVertical: 25,
          }}
        >
          <Button>Confirm Order</Button>
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
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    paddingRight: 22,
    paddingVertical: 15,
    alignItems: "center",
  },
  quantity: {
    backgroundColor: "#11203E",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginRight: 10,
  },
  subtotal: {
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 20,
  },
  total: {
    paddingHorizontal: 20,
    backgroundColor: "#11203E",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: "row",
    paddingVertical: 20,
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
