import React, {useState, useEffect} from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
//Components
import OrderReceipt from "../../components/OrderReceipt";
//Icons Fonts
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
//Loading Skeleton
import SkeletonContent from "react-native-skeleton-content-nonexpo";
//Toast Messages
import Toast from "react-native-toast-message";
//Helpers
import getOrder from "./helpers/getOrder";

function OrderDetails({navigation, route}) {
  const [orderLoaded, setOrderLoaded] = useState(false);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const {orderId} = route.params;
    (async function () {
      try {
        const order = await getOrder(orderId);
        setOrder(order);
        setOrderLoaded(true);
      } catch (error) {
        Toast.show({
          type: "error",
          topOffset: 70,
          visibilityTime: 2000,
          text1: "An Error Occured",
          text2:
            "Something wrong happened while retrieving order details, please try again",
        });
      }
    })();
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Orders", {refresh: false});
            }}
            style={{flex: 0.5, paddingTop: 25}}>
            <FontAwesomeIcon icon={faChevronLeft} size={22} color="#11203E" />
          </TouchableOpacity>
          <Text bold style={styles.screenTitle}>
            Order Details
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView
        style={[styles.container, {paddingTop: 25}]}
        contentContainerStyle={{paddingBottom: 150}}>
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
              }}>
              <View style={{flex: 0.7}}>
                <Text style={{color: "#B9B9B9"}}>Order Status</Text>
                <Text semiBold>{order.order_status}</Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                }}>
                <View>
                  <Text style={{color: "#B9B9B9", textAlign: "left"}}>
                    Ordered
                  </Text>
                  <Text semiBold style={{textAlign: "left"}}>
                    {order.createdAt}
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
                borderBottomWidth: order.PromoCode ? 1 : 0,
                borderBottomColor: "#EEEEEE",
              }}>
              <View style={{flex: 0.7}}>
                <Text style={{color: "#B9B9B9"}}>Delivery Address</Text>
                <View style={{flexDirection: "row"}}>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    size={15}
                    color="#11203E"
                    style={{paddingTop: 1}}
                  />
                  <Text semiBold style={{paddingLeft: 4}}>
                    {order.Address.nickname}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 0.3,
                }}>
                <View>
                  <Text style={{color: "#B9B9B9", textAlign: "left"}}>
                    Order Number
                  </Text>
                  <Text semiBold style={{textAlign: "left"}}>
                    #{order.id}
                  </Text>
                </View>
              </View>
            </View>
            {/* Promocode */}
            {order.PromoCode && (
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 25,
                  justifyContent: "center",
                  paddingVertical: 20,
                }}>
                <View>
                  <Text style={{color: "#B9B9B9", textAlign: "center"}}>
                    Promocode
                  </Text>
                  <View style={{flexDirection: "row"}}>
                    <Text
                      semiBold
                      style={{paddingLeft: 4, textAlign: "center"}}>
                      {order.PromoCode.code}
                    </Text>
                  </View>
                </View>
              </View>
            )}
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
            duration={800}
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
        <View style={{marginTop: 30, marginHorizontal: 25}}>
          <Text style={styles.containerTitle}>Order Receipt</Text>
          {/* Order Receipt loading / loaded */}
          {orderLoaded ? (
            <OrderReceipt
              cartItems={order.OrderItems}
              cartTotal={order.sub_total}
              total={order.total}
              deliveryCharges={order.delivery_charges}
              appliedPromocode={order.PromoCode}
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
              duration={800}
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

export default OrderDetails;
