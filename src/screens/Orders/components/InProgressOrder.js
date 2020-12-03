import React from "react";
import {View, StyleSheet} from "react-native";
//UI Components
import Text from "../../../components/ui/Text";
import Button from "../../../components/ui/Button";

export default function InProgressOrder({
  id,
  order_status,
  estimatedDelivery,
  createdAt,
  navigation,
}) {
  return (
    <View style={styles.orderContainer}>
      {/* Order Status Bar */}
      <View style={styles.statusBar}>
        {/* Order Status */}
        <View style={{flexDirection: "row", flex: 0.5}}>
          <View style={{flexDirection: "column"}}>
            <Text style={{color: "#3b578f", fontSize: 15}}>Order Status</Text>
            <Text bold style={{color: "#fff", fontSize: 15}}>
              {order_status}
            </Text>
          </View>
        </View>
        {/* Estimated Delivery */}
        <View
          style={{
            flexDirection: "row",
            flex: 0.5,
            justifyContent: "flex-end",
          }}>
          {/* <Fontisto name="motorcycle" size={19} color="#fff" /> */}
          <View style={{flexDirection: "column"}}>
            <Text style={{color: "#3b578f", fontSize: 15}}>Should Arrive:</Text>
            <Text bold style={{color: "#fff", fontSize: 15}}>
              {estimatedDelivery}
            </Text>
          </View>
        </View>
      </View>
      {/* Order Data Area */}
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 30,
            paddingTop: 20,
            paddingBottom: 10,
          }}>
          <Text regular style={{flex: 0.5, fontSize: 15, color: "#888888"}}>
            Ordered <Text bold>{createdAt}</Text>
          </Text>
          <Text
            regular
            style={{
              flex: 0.5,
              textAlign: "right",
              fontSize: 15,
              color: "#888888",
            }}>
            Order Number <Text bold>#{id}</Text>
          </Text>
        </View>
        <Button
          style={styles.orderDetailsButton}
          onPress={() => {
            navigation.navigate("OrderDetails", {orderId: id});
          }}>
          View Order Details
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
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
    marginVertical: 15,
    marginHorizontal: 25,
  },
  statusBar: {
    flexDirection: "row",
    backgroundColor: "#11203E",
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  orderDetailsButton: {
    paddingVertical: 22,
    margin: 15,
  },
});
