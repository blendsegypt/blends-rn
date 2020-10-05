import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//UI Components
import Text from "../components/ui/Text";

function CartIcon({ navigation }) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Cart");
        }}
        style={[styles.iconicButton, styles.cartButton]}
      >
        <FontAwesome name="shopping-cart" size={21} color="white" />
      </TouchableOpacity>
      <View style={[styles.tag, styles.cartTag]}>
        <Text style={[styles.tagText]}>5</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.5,
  },
  iconicButton: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 50,
    width: 62,
    height: 62,
    marginTop: 10,
  },
  locationButton: {
    backgroundColor: "#11203E",
  },
  cartButton: {
    backgroundColor: "#C84D49",
    paddingVertical: 19,
    paddingHorizontal: 20,
    marginLeft: "auto",
    marginRight: 5,
  },
  tag: {
    backgroundColor: "red",
    position: "absolute",
    padding: 7,
    borderRadius: 50,
  },
  tagText: {
    color: "white",
    fontSize: 13,
  },
  locationTag: {
    backgroundColor: "#C84D49",
    marginLeft: 40,
  },
  cartTag: {
    backgroundColor: "#11203E",
    paddingHorizontal: 10,
    paddingVertical: 6,
    top: 0,
    right: 0,
  },
});

export default CartIcon;
