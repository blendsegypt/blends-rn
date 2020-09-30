import React from "react";
import { View, StyleSheet, Image } from "react-native";
//UI Components
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";

function ProductItem({ name, price, image, instantAdd, offer, newPrice }) {
  return (
    <View style={styles.item}>
      <Image
        source={image}
        style={{ width: 110, height: 110 }}
        resizeMode="contain"
      />
      <Text style={styles.productName}>{name}</Text>
      {offer ? (
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.oldPriceText}>{price}</Text>
          <View style={styles.newPrice}>
            <Text style={styles.newPriceText}>{newPrice}</Text>
          </View>
        </View>
      ) : !instantAdd ? (
        <Text style={styles.productPrice} regular>
          Starts from <Text>{price}</Text>
        </Text>
      ) : (
        <Text style={styles.productPrice}>{price}</Text>
      )}
      {!instantAdd ? (
        <Button style={styles.itemButton}>Select</Button>
      ) : (
        <Button style={styles.itemButton} icon="plus">
          Add to Cart
        </Button>
      )}
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
  oldPriceText: {
    color: "#7D8595",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    paddingTop: 3,
  },
  newPrice: {
    backgroundColor: "#8EC673",
    padding: 3,
    paddingHorizontal: 6,
    marginLeft: 5,
    borderRadius: 10,
  },
  newPriceText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default ProductItem;
