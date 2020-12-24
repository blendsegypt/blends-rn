import React from "react";
import {View, StyleSheet} from "react-native";
//UI Components
import Text from "../../../components/ui/Text";
import Link from "../../../components/ui/Link";
import Stars from "../../../components/ui/Stars";
//Icons Fonts
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCalendar, faCheck} from "@fortawesome/free-solid-svg-icons";

export default function DeliveredOrder({
  id,
  order_status,
  deliveryDate,
  rating,
  navigation,
  rateDeliveredOrder,
}) {
  return (
    <View style={styles.orderContainer}>
      {/* Order Status Bar */}
      <View
        style={[
          styles.statusBar,
          {
            backgroundColor: "#fff",
            paddingVertical: 25,
            borderBottomColor: "#F0F0F0",
            borderBottomWidth: 1,
          },
        ]}>
        {/* Order Status */}
        <View style={{flexDirection: "row", flex: 0.5}}>
          {/* <MaterialCommunityIcons name="check" size={20} color="#8DAA68" /> */}
          <FontAwesomeIcon icon={faCheck} size={17} color="#8DAA68" />
          <Text bold style={{color: "#8DAA68", fontSize: 15, paddingLeft: 5}}>
            {order_status}
          </Text>
        </View>
        {/* Estimated Delivery */}
        <View
          style={{
            flexDirection: "row",
            flex: 0.5,
            justifyContent: "flex-end",
          }}>
          <FontAwesomeIcon icon={faCalendar} size={17} color="#DBDBDB" />
          <Text style={{color: "#DBDBDB", fontSize: 15, paddingLeft: 5}}>
            {deliveryDate}
          </Text>
        </View>
      </View>
      {/* Order Data Area */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
        }}>
        {/* Order Rating */}
        <View
          style={{
            flexDirection: "row",
            flex: 0.5,
          }}>
          <Stars
            initialStars={rating ? rating : 0}
            alreadyRated={Boolean(rating)}
            onChange={(newRating) => rateDeliveredOrder(id, newRating)}
          />
        </View>
        {/* View Order Details */}
        <View style={{flex: 0.5}}>
          <Link
            regular
            style={{
              flex: 0.5,
              textAlign: "right",
            }}
            onPress={() => {
              navigation.navigate("OrderDetails", {orderId: id});
            }}>
            View Order Details
          </Link>
        </View>
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
