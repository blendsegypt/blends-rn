import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
//UI Components
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";
//Components
import OrderReceipt from "../components/OrderReceipt";
//Icons Fonts
import { FontAwesome } from "@expo/vector-icons";
//Assets (for testing)
import Latte from "../../assets/Latte.png";

function OrderDetails({ navigation }) {
  const order = {
    number: 1123,
    status: "Brewing",
    estimatedDelivery: "09:32 AM",
    ordered: "Today",
    deliveryAddress: "Home",
    cartItems: [
      {
        image: Latte,
        name: "Latte",
        price: 25,
        quantity: 1,
        selectedOptions: [
          {
            label: "Cup Size",
            price: 0,
            textValue: "Small",
            value: "sm",
          },
          {
            label: "Milk Type",
            price: 0,
            textValue: "Skimmed Milk",
            value: "skm",
          },
        ],
      },
    ],
    cartTotal: 24.99,
    orderTotal: 29.99,
  };
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Orders");
            }}
            style={{ flex: 0.5, paddingTop: 25 }}
          >
            <FontAwesome name="chevron-left" size={22} color="#11203E" />
          </TouchableOpacity>
          <Text bold style={styles.screenTitle}>
            Order Details
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView style={[styles.container, { paddingTop: 25 }]}>
        {/* Order Details */}
        <View style={styles.detailsContainer}>
          {/* Status & Order time */}
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 25,
              paddingVertical: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#EEEEEE",
            }}
          >
            <View style={{ flex: 0.7 }}>
              <Text style={{ color: "#B9B9B9" }}>Order Status</Text>
              <Text semiBold>{order.status}</Text>
            </View>
            <View
              style={{
                flex: 0.3,
              }}
            >
              <View>
                <Text style={{ color: "#B9B9B9", textAlign: "left" }}>
                  Ordered
                </Text>
                <Text semiBold style={{ textAlign: "left" }}>
                  {order.ordered}
                </Text>
              </View>
            </View>
          </View>
          {/* Expected Delivery & Order Number */}
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 25,
              paddingVertical: 20,
            }}
          >
            <View style={{ flex: 0.7 }}>
              <Text style={{ color: "#B9B9B9" }}>Delivery Address</Text>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome
                  name="map-marker"
                  size={15}
                  color="#11203E"
                  style={{ paddingTop: 1 }}
                />
                <Text semiBold style={{ paddingLeft: 4 }}>
                  {order.deliveryAddress}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.3,
              }}
            >
              <View>
                <Text style={{ color: "#B9B9B9", textAlign: "left" }}>
                  Order Number
                </Text>
                <Text semiBold style={{ textAlign: "left" }}>
                  #{order.number}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Order Receipt */}
        <View style={{ marginTop: 30 }}>
          <Text style={styles.containerTitle}>Order Receipt</Text>
          <OrderReceipt
            cartItems={order.cartItems}
            cartTotal={order.cartTotal}
          />
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 25,
          backgroundColor: "#fff",
          paddingBottom: 20,
        }}
      >
        <Button
          textColor="#437FD9"
          style={{ backgroundColor: "#EBF1FF" }}
          icon="commenting"
        >
          Problems with your Order?
        </Button>
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
  container: {
    marginTop: 25,
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
  containerTitle: {
    color: "#C84D49",
    fontSize: 16,
  },
  detailsContainer: {
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
});

export default OrderDetails;
