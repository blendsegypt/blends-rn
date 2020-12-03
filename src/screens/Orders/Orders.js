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
import Text from "../../components/ui/Text";
//Loading Skeleton
import SkeletonContent from "react-native-skeleton-content-nonexpo";
//Redux
import {connect} from "react-redux";
//Screen Helpers
import getUserOrders from "./helpers/getUserOrders";
import rateOrder from "./helpers/rateOrder";
//Screen Components
import InProgressOrder from "./components/InProgressOrder";
import DeliveredOrder from "./components/DeliveredOrder";
//Toast messages
import Toast from "react-native-toast-message";

function Orders({navigation, loggedIn}) {
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [orders, setOrders] = useState([]);
  // Get user orders from backend API
  useEffect(() => {
    (async function () {
      try {
        const fetchedOrders = await getUserOrders(loggedIn);
        setOrdersLoaded(true);
        setOrders(fetchedOrders);
      } catch (error) {
        Toast.show({
          type: "error",
          topOffset: 50,
          visibilityTime: 2000,
          text1: "An Error Occured",
          text2:
            "Something wrong happened while getting orders! Please try again.",
        });
      }
    })();
  }, [ordersLoaded, orders, loggedIn]);

  // Refresh orders
  const refreshOrders = async () => {
    setOrdersLoaded(false);
  };

  // Rate a delivered order
  const rateDeliveredOrder = async (orderID, rating) => {
    try {
      await rateOrder(orderID, rating);
    } catch (errors) {
      Toast.show({
        type: "error",
        topOffset: 50,
        visibilityTime: 2000,
        text1: "An Error Occured",
        text2:
          "Something wrong happened while rating your order! Please try again.",
      });
    }
  };

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
          <RefreshControl
            refreshing={!ordersLoaded}
            onRefresh={refreshOrders}
          />
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
                  rateDeliveredOrder={rateDeliveredOrder}
                />
              );
            }
            return (
              <InProgressOrder {...order} navigation={navigation} key={index} />
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
});

const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn,
});

export default connect(mapStateToProps, null)(Orders);