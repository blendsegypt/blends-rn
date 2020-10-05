import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
//UI Components
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Components
import CheckoutProgress from "../components/CheckoutProgress";
import CartItem from "../components/CartItem";
//Redux
import { connect } from "react-redux";
import { getCartItems } from "../redux/selectors/cartItems";
//Assets
import EmptyCartIllustration from "../../assets/EmptyCartIllustration.png";

function Cart({ navigation, cartItems, cartTotal, cartCount }) {
  // Check if cart is empty
  if (cartCount == 0) {
    return (
      <>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <SafeAreaView>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Home");
                }}
                style={{ flex: 0.5, paddingTop: 25 }}
              >
                <FontAwesome name="chevron-left" size={22} color="#11203E" />
              </TouchableOpacity>
              <Text bold style={styles.screenTitle}>
                Cart{" "}
              </Text>
              {cartCount > 0 && (
                <View style={styles.count}>
                  <Text style={{ color: "#fff" }}>{cartCount}</Text>
                </View>
              )}
            </View>
          </SafeAreaView>
          <View
            style={{
              paddingHorizontal: 25,
              alignItems: "center",
            }}
          >
            <Image
              source={EmptyCartIllustration}
              style={{ width: 325, height: 280, marginTop: 50 }}
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
        <View style={{ paddingHorizontal: 25, paddingBottom: 25 }}>
          <Button
            blends
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            Go to Store
          </Button>
        </View>
      </>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{ flex: 0.5, paddingTop: 25 }}
          >
            <FontAwesome name="chevron-left" size={22} color="#11203E" />
          </TouchableOpacity>
          <Text bold style={styles.screenTitle}>
            Cart{" "}
          </Text>
          <View style={styles.count}>
            <Text style={{ color: "#fff" }}>{cartCount}</Text>
          </View>
        </View>
      </SafeAreaView>
      <CheckoutProgress
        steps={[
          {
            label: "Cart",
            active: true,
          },
          {
            label: "Delivery Details",
            active: false,
          },
          {
            label: "Confirm",
            active: false,
          },
        ]}
      />
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
        }}
      >
        {/* Add to Cart Button */}
        <Button price={cartTotal + " EGP"}>Checkout</Button>
      </View>
    </View>
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
    elevation: 8,
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
    marginTop: 20,
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
  const { cartItems, cartTotal, cartCount } = getCartItems(state);
  return {
    cartItems,
    cartTotal,
    cartCount,
  };
};

export default connect(mapStateToProps, null)(Cart);
