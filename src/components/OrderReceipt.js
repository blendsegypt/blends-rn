import React, {useState} from "react";
import {View, Image, StyleSheet, TouchableOpacity} from "react-native";
//UI Components
import Text from "./ui/Text";
import TextInput from "./ui/TextInput";
//API
import API from "../utils/axios";
//Redux
import Toast from "react-native-toast-message";
import {connect} from "react-redux";

function OrderReceipt({
  cartItems,
  cartTotal,
  showPromotionInput,
  userID,
  branchID,
  addressID,
  setOrderPromo,
  total,
  deliveryCharges,
  appliedPromocode,
}) {
  const [promocode, setPromocode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [orderAfterPromo, setOrderAfterPromo] = useState(null);
  const applyPromocode = async () => {
    // If no promocode is entered
    if (promocode === "") return;
    const order = {
      branch_id: branchID,
      user_id: userID,
      delivery_address_id: addressID,
      sub_total: Number(cartTotal),
      total: Number(cartTotal) + 5,
      delivery_charges: 5,
      promo_code: promocode,
    };
    order.OrderItems = cartItems.map((item) => {
      return {
        product_id: item.product_id,
        quantity: item.quantity,
        options: item.selectedOptions,
      };
    });
    try {
      const response = await API.post("app/apply-promo-code", order);
      setOrderAfterPromo(response.data.order);
      setPromoApplied(true);
      setOrderPromo(promocode);
    } catch (error) {
      Toast.show({
        type: "error",
        visibilityTime: 2000,
        topOffset: 70,
        text1: "Error!",
        text2: error.response.data.message,
      });
      setPromocode("");
    }
  };
  const removePromo = () => {
    setPromoApplied(false);
    setOrderAfterPromo(null);
    setPromocode("");
    setOrderPromo("");
  };
  return (
    <View style={styles.deliveryDetails}>
      {cartItems.map((item, index) => {
        // Generate the text for product customization description
        let selectedOptionsText = "";
        item.selectedOptions.forEach((option, index) => {
          selectedOptionsText += option.value;
          if (index === item.selectedOptions.length - 2) {
            selectedOptionsText += " & ";
          } else if (index !== item.selectedOptions.length - 1) {
            //Refactor here
            selectedOptionsText += ", ";
          }
        });
        return (
          // Cart Items
          <View key={index} style={styles.itemContainer}>
            <Image
              source={{uri: item.image}}
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
          <Text style={{fontSize: 14, flex: 0.6, color: "#11203E"}} semiBold>
            Subtotal
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#11203E",
              flex: 0.4,
              textAlign: "right",
            }}
            semiBold>
            {!promoApplied ? (
              `${cartTotal} EGP`
            ) : (
              <Text>
                {cartTotal - orderAfterPromo.sub_total > 0
                  ? `(-${
                      cartTotal - orderAfterPromo.sub_total
                    } EGP) ${orderAfterPromo.sub_total.toFixed(2)} EGP`
                  : `${cartTotal} EGP`}
              </Text>
            )}
          </Text>
        </View>
        {/* Delivery Charges */}
        <View style={{flexDirection: "row", paddingVertical: 15}}>
          <Text style={{fontSize: 14, flex: 0.6, color: "#9C9C9C"}} semiBold>
            Delivery Charges
          </Text>
          {deliveryCharges === undefined ? (
            <Text
              style={{
                fontSize: 14,
                color: "#9C9C9C",
                flex: 0.4,
                textAlign: "right",
              }}
              semiBold>
              {!promoApplied ? (
                `5.00 EGP`
              ) : (
                <Text>
                  {5 - orderAfterPromo.delivery_charges > 0
                    ? `(-${5 - orderAfterPromo.delivery_charges} EGP) ${
                        orderAfterPromo.delivery_charges
                      } EGP`
                    : `${(5).toFixed(2)} EGP`}
                </Text>
              )}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 14,
                color: "#9C9C9C",
                flex: 0.4,
                textAlign: "right",
              }}
              semiBold>
              {deliveryCharges.toFixed(2)} EGP
            </Text>
          )}
        </View>
      </View>
      {/* Promotion Input Field */}
      {showPromotionInput &&
        (promoApplied ? (
          <View
            style={{
              backgroundColor: "#41cc7d",
              padding: 20,
              flexDirection: "row",
            }}>
            <Text style={{flex: 0.5, color: "white"}}>Promocode Applied!</Text>
            <Text style={{flex: 0.5, color: "white", textAlign: "right"}}>
              {promocode}
            </Text>
            <TouchableOpacity style={styles.removePromo} onPress={removePromo}>
              <Text style={{color: "white"}}>x</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TextInput
              value={promocode}
              style={{
                borderRadius: 0,
                marginVertical: 0,
                fontSize: 14,
                flex: 0.7,
                zIndex: 1,
              }}
              onChangeText={(code) => setPromocode(code)}>
              Promotion Code (optional)
            </TextInput>
            <TouchableOpacity
              onPress={applyPromocode}
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
        ))}
      {/* Total */}
      <View style={styles.total}>
        <Text bold style={{color: "#fff", flex: 0.6}}>
          Total
        </Text>
        {!total ? (
          <Text bold style={{color: "#fff", flex: 0.4, textAlign: "right"}}>
            {!promoApplied
              ? `${(Number(cartTotal) + 5).toFixed(2)} EGP`
              : `${orderAfterPromo.total.toFixed(2)} EGP`}
          </Text>
        ) : (
          <Text bold style={{color: "#fff", flex: 0.4, textAlign: "right"}}>
            {total.toFixed(2)} EGP
          </Text>
        )}
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
  removePromo: {
    marginLeft: 10,
    backgroundColor: "#277549",
    padding: 2,
    paddingHorizontal: 7,
    borderRadius: 50,
  },
});

const mapStateToProps = (state) => ({
  userID: state.userReducer.id,
  branchID: state.userReducer.addresses[0].Area.Branches[0].id,
  addressID: state.userReducer.addresses[0].id,
});

export default connect(mapStateToProps, null)(OrderReceipt);
