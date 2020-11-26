import React, {useState, useEffect} from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
//UI Components
import Text from "./ui/Text";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content-nonexpo";
//Axios instance
import API from "../utils/axios";
//Toast messages
import Toast from "react-native-toast-message";

function RecentOrders({navigation}) {
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [ordersItems, setOrdersItems] = useState([]);

  useEffect(() => {
    const getRecentOrders = async () => {
      try {
        const recentOrders = await API.get("app/orders/recent");
        const orders = recentOrders.data.data;
        const recentOrderItems = [];
        orders.forEach((order) => {
          order.OrderItems.forEach((orderItem) => {
            //check if product is already pushed
            const check = recentOrderItems.find(
              (item) => item.id === orderItem.Product.id,
            );
            if (check) return;

            recentOrderItems.push({
              ...orderItem.Product,
            });
          });
        });
        setOrdersItems(recentOrderItems);
        setItemsLoaded(true);
      } catch (error) {
        Toast.show({
          type: "error",
          topOffset: 50,
          visibilityTime: 2000,
          text1: "An Error Occured",
          text2: "Something wrong happened while retrieving recent orders!",
        });
      }
    };
    getRecentOrders();
  }, []);

  // Render single item
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={[styles.recentOrder, index == 0 ? {marginLeft: 0} : {}]}
      onPress={() => {
        navigation.navigate("Product", {product_id: item.id});
      }}>
      <Image
        source={{uri: item.product_image_url}}
        style={{width: 55, height: 55, alignSelf: "center", marginTop: 5}}
        resizeMode="contain"
      />
      <View style={styles.itemData}>
        <Text bold style={styles.itemName}>
          {item.name}
        </Text>
      </View>
      <FontAwesomeIcon
        style={styles.itemChevron}
        icon={faChevronRight}
        size={14}
        color="#BCCAE9"
      />
    </TouchableOpacity>
  );
  return (
    <>
      <Text semiBold style={styles.titleText}>
        You Recently Ordered
      </Text>
      <View>
        {itemsLoaded ? (
          <FlatList
            data={ordersItems}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{marginLeft: 25}}
          />
        ) : (
          <SkeletonContent
            containerStyle={{
              width: 180,
              height: 85,
              marginTop: 15,
              borderRadius: 10,
              backgroundColor: "#D1D1D1",
              flexDirection: "row",
              marginLeft: 25,
            }}
            isLoading={true}
            animationDirection="horizontalLeft"
            duration="800"
            boneColor="#e3e3e3"
            layout={[
              {
                key: "image",
                width: 55,
                height: 55,
                borderRadius: 100,
                alignSelf: "center",
                marginLeft: 15,
              },
              {
                alignSelf: "center",
                children: [
                  {
                    key: "name",
                    width: 65,
                    height: 13,
                    alignSelf: "center",
                    marginLeft: 15,
                    marginBottom: 6,
                  },
                  {
                    key: "price",
                    width: 65,
                    height: 13,
                    alignSelf: "center",
                    marginLeft: 15,
                  },
                ],
              },
            ]}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    color: "#11203E",
    fontSize: 19,
    paddingLeft: 25,
  },
  recentOrder: {
    backgroundColor: "#dae3f5",
    marginTop: 15,
    padding: 10,
    paddingVertical: 10,
    flexDirection: "row",
    borderRadius: 20,
    marginLeft: 15,
  },
  itemName: {
    color: "#4B5F8B",
    paddingRight: 15,
    maxWidth: 150,
  },
  itemPrice: {
    color: "#A3B2D3",
  },
  itemData: {
    paddingLeft: 10,
    alignSelf: "center",
  },
  itemChevron: {
    alignSelf: "center",
  },
});

export default RecentOrders;
