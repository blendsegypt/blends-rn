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
import Link from "../components/ui/Link";
//Icons Fonts
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

function Orders({ navigation }) {
  const orders = [
    {
      number: 1123,
      status: "Brewing",
      estimatedDelivery: "09:32 AM",
      ordered: "Today",
    },
    {
      number: 1322,
      status: "Delivered",
      deliveryDate: "23/8/2020",
      stars: 4,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={[styles.header, { justifyContent: "center" }]}>
          <Text bold style={styles.screenTitle}>
            Orders
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.ordersContainer}>
        {/* Orders */}
        {orders.map((order) => {
          if (order.status == "Delivered") {
            return <DeliveredOrder {...order} navigation={navigation} />;
          }
          return <OrderInProgress {...order} navigation={navigation} />;
        })}
      </ScrollView>
    </View>
  );
}

function OrderInProgress({
  number,
  status,
  estimatedDelivery,
  ordered,
  navigation,
}) {
  return (
    <View style={styles.orderContainer}>
      {/* Order Status Bar */}
      <View style={styles.statusBar}>
        {/* Order Status */}
        <View style={{ flexDirection: "row", flex: 0.5 }}>
          <MaterialCommunityIcons
            name="coffee-outline"
            size={20}
            color="#fff"
          />
          <Text bold style={{ color: "#fff", fontSize: 15, paddingLeft: 5 }}>
            {status}
          </Text>
        </View>
        {/* Estimated Delivery */}
        <View
          style={{
            flexDirection: "row",
            flex: 0.5,
            justifyContent: "flex-end",
          }}
        >
          <Fontisto name="motorcycle" size={19} color="#fff" />
          <Text style={{ color: "#fff", fontSize: 15, paddingLeft: 5 }}>
            Approx. {estimatedDelivery}
          </Text>
        </View>
      </View>
      {/* Order Data Area */}
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 22,
            paddingTop: 20,
            paddingBottom: 5,
          }}
        >
          <Text regular style={{ flex: 0.5, fontSize: 15, color: "#888888" }}>
            Ordered <Text bold>{ordered}</Text>
          </Text>
          <Text
            regular
            style={{
              flex: 0.5,
              textAlign: "right",
              fontSize: 15,
              color: "#888888",
            }}
          >
            Order Number <Text bold>#{number}</Text>
          </Text>
        </View>
        <Button
          style={styles.orderDetailsButton}
          onPress={() => {
            navigation.navigate("OrderDetails");
          }}
        >
          View Order Details
        </Button>
      </View>
    </View>
  );
}

function DeliveredOrder({ number, status, deliveryDate, stars, navigation }) {
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
        ]}
      >
        {/* Order Status */}
        <View style={{ flexDirection: "row", flex: 0.5 }}>
          <MaterialCommunityIcons name="check" size={20} color="#8DAA68" />
          <Text bold style={{ color: "#8DAA68", fontSize: 15, paddingLeft: 5 }}>
            {status}
          </Text>
        </View>
        {/* Estimated Delivery */}
        <View
          style={{
            flexDirection: "row",
            flex: 0.5,
            justifyContent: "flex-end",
          }}
        >
          <FontAwesome name="calendar" size={17} color="#DBDBDB" />
          <Text style={{ color: "#DBDBDB", fontSize: 15, paddingLeft: 5 }}>
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
        }}
      >
        {/* Order Rating */}
        <View
          style={{
            flexDirection: "row",
            flex: 0.5,
          }}
        >
          {[...Array(5)].map((star, index) => {
            let color = "#ECECEC";
            if (index < stars) color = "#F4E385";
            return (
              <FontAwesome
                name="star"
                size={24}
                color={color}
                style={{ paddingRight: 5 }}
              />
            );
          })}
        </View>
        {/* View Order Details */}
        <View style={{ flex: 0.5 }}>
          <Link
            regular
            style={{
              flex: 0.5,
              textAlign: "right",
            }}
            onPress={() => {
              navigation.navigate("OrderDetails");
            }}
          >
            View Order Details
          </Link>
        </View>
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
  ordersContainer: {
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
    marginTop: 25,
  },
  statusBar: {
    flexDirection: "row",
    backgroundColor: "#11203E",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  orderDetailsButton: {
    paddingVertical: 22,
    margin: 15,
  },
});

export default Orders;
