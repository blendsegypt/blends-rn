import React from "react";
import {View, StyleSheet, Image} from "react-native";
//UI Components
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";
import Toast from "react-native-toast-message";

function ProductItem({
  id,
  name,
  price,
  retail,
  product_image_url,
  sale_price,
  navigation,
  supportedArea,
}) {
  const unsupportedHandler = () => {
    Toast.show({
      type: "error",
      topOffset: 50,
      visibilityTime: 2000,
      text1: "Unsupported Location",
      text2: "Please change your location to add products to the cart.",
    });
  };
  return (
    <View style={styles.item}>
      <Image
        source={
          product_image_url
            ? {uri: product_image_url, cache: "force-cache"}
            : {}
        }
        style={{width: 110, height: 110}}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.productName}>{name}</Text>
        {sale_price !== 0 ? (
          <View style={{flexDirection: "row"}}>
            <Text style={styles.oldPriceText}>{price} EGP</Text>
            <View style={styles.newPrice}>
              <Text style={styles.newPriceText}>{sale_price} EGP</Text>
            </View>
          </View>
        ) : !retail ? (
          <Text style={styles.productPrice} regular>
            From <Text>{price} EGP</Text>
          </Text>
        ) : (
          <Text style={styles.productPrice}>{price} EGP</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {!retail ? (
          <Button
            onPress={() => {
              if (!supportedArea) {
                unsupportedHandler();
                return;
              }
              navigation.navigate("Product", {product_id: id});
            }}
            style={styles.itemButton}>
            Select
          </Button>
        ) : (
          <Button
            onPress={() => {
              if (!supportedArea) {
                unsupportedHandler();
                return;
              }
            }}
            style={styles.itemButton}
            icon="plus">
            Add to Cart
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginTop: 5,
    flexDirection: "column",
    flex: 0.5,
    marginRight: 10,
    justifyContent: "space-between",
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
