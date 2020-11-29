import React, {useState, useEffect, useCallback} from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
//UI Components
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";
import Link from "../components/ui/Link";
import Stars from "../components/ui/Stars";
//Icons Fonts
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCalendar, faCheck} from "@fortawesome/free-solid-svg-icons";
//Loading Skeleton
import SkeletonContent from "react-native-skeleton-content-nonexpo";
//Axios instance
import API from "../utils/axios";
//Moment (date/time manipulation)
import Moment from "moment";
//Redux
import {connect} from "react-redux";
//Toast messages
import Toast from "react-native-toast-message";

function Orders({navigation, loggedIn}) {
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);
  // Get user orders from backend API
  const getUserOrders = async () => {
    if (!loggedIn) {
      setOrdersLoaded(true);
      return;
    }
    try {
      const response = await API.get("app/orders");
      const orders = [...response.data.data];
      // Calculate order dates and time
      orders.forEach((order) => {
        if (order.order_status !== "Delivered") {
          const createdAt = Moment(order.createdAt);
          // convert createdAt to readable format
          order.createdAt = createdAt.startOf("minute").fromNow();
          // calculate estimated delivery (createdAt + 30 minutes) in case its not delivered
          const estimatedDelivery = createdAt.clone().add(30, "m").calendar();
          order.estimatedDelivery = estimatedDelivery;
        } else {
          //calculate delivery date
          order.deliveryDate = Moment(order.delivered_at).calendar();
        }
      });
      setOrders(orders);
      setOrdersLoaded(true);
    } catch (error) {
      console.log("error: " + error);
    }
  };
  // Refresh orders
  const refreshOrders = async () => {
    await getUserOrders();
  };
  useEffect(() => {
    getUserOrders();
  }, []);
  // Refresh orders on focus
  useFocusEffect(
    useCallback(() => {
      refreshOrders();
    }, []),
  );
  return (
    <View style={{flex: 1}}>
      <SafeAreaView>
        <View style={[styles.header, {justifyContent: "center"}]}>
          <Text bold style={styles.screenTitle}>
            Orders
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView
        style={styles.ordersContainer}
        contentContainerStyle={{paddingBottom: 150}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshOrders} />
        }>
        {/* Orders loading / loaded */}
        {ordersLoaded ? (
          orders.map((order, index) => {
            if (order.order_status === "Delivered") {
              return (
                <DeliveredOrder
                  {...order}
                  navigation={navigation}
                  key={index}
                />
              );
            }
            return (
              <OrderInProgress {...order} navigation={navigation} key={index} />
            );
          })
        ) : (
          <SkeletonContent
            containerStyle={{
              marginTop: 25,
              backgroundColor: "#D1D1D1",
              borderRadius: 20,
              height: 170,
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
                    marginLeft: 120,
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
                    marginLeft: 120,
                  },
                ],
              },
              {
                key: "button",
                width: "100%",
                height: 50,
                borderRadius: 50,
                marginTop: 15,
              },
            ]}
          />
        )}
      </ScrollView>
    </View>
  );
}

function OrderInProgress({
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
          {/* <MaterialCommunityIcons
            name="coffee-outline"
            size={20}
            color="#fff"
          /> */}
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

function DeliveredOrder({id, order_status, deliveryDate, rating, navigation}) {
  const rateOrder = async (id, rating) => {
    try {
      await API.post(`app/orders/rate/${id}`, {rating});
    } catch (error) {
      Toast.show({
        type: "error",
        topOffset: 50,
        visibilityTime: 2000,
        text1: "An Error Occured",
        text2: "Something wrong happened on our side! Please try again.",
      });
    }
  };
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
            onChange={(newRating) => rateOrder(id, newRating)}
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
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

const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn,
});

export default connect(mapStateToProps, null)(Orders);
