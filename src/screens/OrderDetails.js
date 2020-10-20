import React, { useState, useEffect } from "react";
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
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content";
//Redux
import { connect } from "react-redux";
//FreshChat Integration
import {
  Freshchat,
  FreshchatConfig,
  FreshchatUser,
  FreshchatMessage,
} from "react-native-freshchat-sdk";

function OrderDetails({ navigation, user }) {
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
  const [orderLoaded, setOrderLoaded] = useState(false);
  //Fake loading (will be changed latter to send an API request)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setOrderLoaded(true);
      const userPropertiesJson = {
        orderID: order.number,
      };
      Freshchat.setUserProperties(userPropertiesJson, (error) => {
        console.log(error);
      });
    }, 1000);

    // Setup FreshChat
    const freshchatConfig = new FreshchatConfig(
      "eeded093-e396-4fa5-8302-85223c8725c6",
      "af17ee52-db85-484b-853f-c650fdd023c5"
    );
    freshchatConfig.domain = "msdk.eu.freshchat.com";
    Freshchat.init(freshchatConfig);
    const freshchatUser = new FreshchatUser();
    // Split fullName to first name
    const firstName = user.fullName.split(" ")[0];
    freshchatUser.firstName = firstName;
    freshchatUser.phoneCountryCode = "+2";
    freshchatUser.phone = user.phoneNumber;
    Freshchat.setUser(freshchatUser, (error) => {
      console.log(error);
    });

    // useEffect Cleanup
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const showFreshChat = () => {
    const freshchatMessage = new FreshchatMessage();
    freshchatMessage.message = `I have a question regarding my order #${order.number}`;
    Freshchat.sendMessage(freshchatMessage);
    Freshchat.showConversations();
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
      <ScrollView
        style={[styles.container, { paddingTop: 25 }]}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Check if order was loaded */}
        {orderLoaded ? (
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
        ) : (
          <SkeletonContent
            containerStyle={{
              backgroundColor: "#D1D1D1",
              borderRadius: 20,
              height: 110,
              paddingHorizontal: 20,
              marginHorizontal: 25,
            }}
            isLoading={true}
            animationDirection="horizontalLeft"
            duration="800"
            boneColor="#e3e3e3"
            layout={[
              {
                paddingVertical: 20,
                flexDirection: "row",
                children: [
                  {
                    key: "status",
                    width: 100,
                    height: 20,
                    borderRadius: 20,
                  },
                  {
                    key: "details",
                    width: 100,
                    height: 20,
                    borderRadius: 20,
                    marginLeft: 100,
                  },
                ],
              },
              {
                paddingVertical: 5,
                flexDirection: "row",
                children: [
                  {
                    key: "ordered",
                    width: 100,
                    height: 20,
                    borderRadius: 20,
                  },
                  {
                    key: "orderNumber",
                    width: 100,
                    height: 20,
                    borderRadius: 20,
                    marginLeft: 100,
                  },
                ],
              },
            ]}
          />
        )}
        <View style={{ marginTop: 30, marginHorizontal: 25 }}>
          <Text style={styles.containerTitle}>Order Receipt</Text>
          {/* Order Receipt loading / loaded */}
          {orderLoaded ? (
            <OrderReceipt
              cartItems={order.cartItems}
              cartTotal={order.cartTotal}
            />
          ) : (
            <SkeletonContent
              containerStyle={{
                marginTop: 25,
                backgroundColor: "#D1D1D1",
                borderRadius: 20,
                height: 180,
                paddingHorizontal: 20,
              }}
              isLoading={true}
              animationDirection="horizontalLeft"
              duration="800"
              boneColor="#e3e3e3"
              layout={[
                {
                  paddingVertical: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  children: [
                    {
                      key: "productImage",
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                    },
                    {
                      key: "productName",
                      width: 70,
                      height: 20,
                      borderRadius: 20,
                      marginLeft: 15,
                    },
                    {
                      key: "productPrice",
                      width: 70,
                      height: 20,
                      borderRadius: 20,
                      marginLeft: 120,
                    },
                  ],
                },
                {
                  paddingVertical: 5,
                  flexDirection: "row",
                  children: [
                    {
                      key: "subtotal",
                      width: 100,
                      height: 20,
                      borderRadius: 20,
                    },
                    {
                      key: "subtotalValue",
                      width: 70,
                      height: 20,
                      borderRadius: 20,
                      marginLeft: 150,
                    },
                  ],
                },
                {
                  paddingVertical: 5,
                  flexDirection: "row",
                  marginTop: 20,
                  children: [
                    {
                      key: "total",
                      width: 100,
                      height: 20,
                      borderRadius: 20,
                    },
                    {
                      key: "totalValue",
                      width: 70,
                      height: 20,
                      borderRadius: 20,
                      marginLeft: 150,
                    },
                  ],
                },
              ]}
            />
          )}
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 25,
          backgroundColor: "#fff",
          paddingBottom: 110,
          paddingTop: 20,
        }}
      >
        {orderLoaded ? (
          <Button
            textColor="#437FD9"
            style={{ backgroundColor: "#EBF1FF" }}
            icon="commenting"
            onPress={() => showFreshChat()}
          >
            Problems with your Order?
          </Button>
        ) : (
          <Button icon="commenting" disabled>
            Problems with your Order?
          </Button>
        )}
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
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fff",
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
    marginHorizontal: 25,
  },
});

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, null)(OrderDetails);
