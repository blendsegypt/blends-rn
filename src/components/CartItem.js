import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
//UI Components
import Text from "./ui/Text";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";

function CartItem({ image, name, price, quantity, selectedOptions }) {
  // Generate the text for product customization
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
        <Text regular>{selectedOptionsText}</Text>
        {/* Increase / Decrease quantity */}
        <View style={styles.changeQuantity}>
          <TouchableOpacity
            style={[styles.quantityButton, { paddingHorizontal: 9 }]}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>-</Text>
          </TouchableOpacity>
          <Text style={styles.productQuantity}>{quantity}</Text>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: "#8BBE78" }]}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Product Price */}
      <View style={{ flex: 0.3 }}>
        <Text semiBold style={styles.price}>
          {price} EGP
        </Text>
      </View>
      {/* Remove from Cart */}
      <View style={{ flex: 0.1 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.deleteContainer}>
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

export default CartItem;
