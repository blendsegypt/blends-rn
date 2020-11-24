import React from "react";
import {View, Image, StyleSheet, TouchableOpacity} from "react-native";
//UI Components
import Text from "./ui/Text";
import TextInput from "./ui/TextInput";

function OrderReceipt({cartItems, cartTotal, showPromotionInput}) {
  return (
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
              style={{width: 45, height: 43, flex: 0.2}}
              resizeMode="contain"
            />
            <View style={{flex: 0.53}}>
              <Text>{item.name}</Text>
              <Text regular style={{color: "#999999"}}>
                {selectedOptionsText}
              </Text>
            </View>
            <View>
              <View style={styles.quantity}>
                <Text style={{color: "#fff"}}>{item.quantity}</Text>
              </View>
            </View>
            <Text
              bold
              style={{flex: 0.27, textAlign: "right", color: "#11203E"}}>
              {item.price.toFixed(2)} EGP
            </Text>
          </View>
        );
      })}
      {/* Subtotal & Delivery Charges */}
      <View style={styles.subtotal}>
        {/* Subtotal */}
        <View style={{flexDirection: "row", paddingVertical: 15}}>
          <Text style={{fontSize: 14, flex: 0.76, color: "#11203E"}} semiBold>
            Subtotal
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#11203E",
              flex: 0.24,
              textAlign: "right",
            }}
            semiBold>
            {cartTotal} EGP
          </Text>
        </View>
        {/* Delivery Charges */}
        <View style={{flexDirection: "row", paddingVertical: 15}}>
          <Text style={{fontSize: 14, flex: 0.8, color: "#9C9C9C"}} semiBold>
            Delivery Charges
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#9C9C9C",
              flex: 0.2,
              textAlign: "right",
            }}
            semiBold>
            5.00 EGP
          </Text>
        </View>
      </View>
      {/* Promotion Input Field */}
      {showPromotionInput && (
        <View>
          <TextInput
            style={{
              borderRadius: 0,
              marginVertical: 0,
              fontSize: 14,
              flex: 0.7,
              zIndex: 1,
            }}>
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
            }}>
            <Text style={{color: "#437FD9"}}>Apply</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Total */}
      <View style={styles.total}>
        <Text bold style={{color: "#fff", flex: 0.75}}>
          Total
        </Text>
        <Text bold style={{color: "#fff", flex: 0.25, textAlign: "right"}}>
          {(Number(cartTotal) + 5).toFixed(2)} EGP
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default OrderReceipt;
