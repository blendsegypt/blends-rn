import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
//UI Components
import Text from "./ui/Text";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Redux
import { connect } from "react-redux";
import { removeFromCart, changeQuantity } from "../redux/actions/cart.action";

function CartItem({
  id,
  image,
  name,
  price,
  quantity,
  selectedOptions,
  removeFromCart,
  changeQuantity,
}) {
  // Generate the text for product customization description
  let selectedOptionsText = "";
  selectedOptions.forEach((option, index) => {
    selectedOptionsText += option.textValue;
    if (index != selectedOptions.length - 1) selectedOptionsText += " & ";
  });
  return (
    <View style={styles.itemContainer}>
      {/* Product Image */}
      <Image source={image} style={{ width: 55, height: 55 }} />
      <View style={{ flex: 0.6, paddingLeft: 10 }}>
        {/* Title and Custom requests */}
        <Text style={{ fontSize: 15 }}>{name}</Text>
        <Text regular style={{ color: "#999999" }}>
          {selectedOptionsText}
        </Text>
        {/* Increase / Decrease quantity */}
        <View style={styles.changeQuantity}>
          {/* Decrease Quantity */}
          <TouchableOpacity
            style={[
              styles.quantityButton,
              { paddingHorizontal: 9 },
              quantity > 1 && { backgroundColor: "#8BBE78" },
            ]}
            onPress={() => {
              if (quantity > 1) {
                const newQuantity = quantity - 1;
                changeQuantity(id, newQuantity);
              }
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>-</Text>
          </TouchableOpacity>
          {/* Quantity */}
          <Text style={styles.productQuantity}>{quantity}</Text>
          {/* Increase Quantity */}
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: "#8BBE78" }]}
            onPress={() => {
              const newQuantity = quantity + 1;
              changeQuantity(id, newQuantity);
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Product Price */}
      <View style={{ flex: 0.3 }}>
        <Text semiBold style={styles.price}>
          {price.toFixed(2)} EGP
        </Text>
      </View>
      {/* Remove from Cart */}
      <View style={{ flex: 0.1 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.deleteContainer}
            onPress={() => {
              removeFromCart(id);
            }}
          >
            <FontAwesome name="trash" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  price: {
    color: "#11203E",
    fontSize: 15,
    paddingTop: 15,
  },
  changeQuantity: {
    flexDirection: "row",
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: "#D7D7D7",
    padding: 1,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  productQuantity: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingTop: 3,
  },
  deleteContainer: {
    backgroundColor: "#D86C6C",
    padding: 7,
    marginTop: 8,
    paddingHorizontal: 9,
    borderRadius: 100,
  },
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (itemID) => {
    dispatch(removeFromCart(itemID));
  },
  changeQuantity: (itemID, newQuantity) => {
    dispatch(changeQuantity(itemID, newQuantity));
  },
});

export default connect(null, mapDispatchToProps)(CartItem);
