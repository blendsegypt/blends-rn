import React from "react";
import { View, StyleSheet, Image } from "react-native";
//UI Components
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";

function ProductItem({ name, price, image }) {
  return (
    <View style={styles.item}>
      <Image source={image} style={{ width: 120, height: 110 }} />
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productPrice} regular>
        Starts from <Text>{price}</Text>
      </Text>
      <Button style={styles.itemButton}>Select</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "50%",
    marginTop: 25,
  },
  productName: {
    color: "#11203E",
    fontSize: 16,
  },
  productPrice: {
    color: "#7987A3",
    fontSize: 15,
  },
  itemButton: {
    marginTop: 10,
    paddingVertical: 19,
    width: "93%",
    shadowOpacity: 0.0,
    paddingRight: 10,
  },
});

export default ProductItem;
