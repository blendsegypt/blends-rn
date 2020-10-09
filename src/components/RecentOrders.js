import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
//UI Components
import Text from "./ui/Text";
//Item Image (Only for testing purposes)
import Espresso from "../../assets/Espresso.png";
import Latte from "../../assets/Latte.png";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content";

function RecentOrders({ navigation }) {
  const [itemsLoaded, setItemsLoaded] = useState(false);

  useEffect(() => {
    const fakeLoading = setTimeout(() => {
      setItemsLoaded(true);
    }, 1500);
    return () => {
      clearTimeout(fakeLoading);
    };
  }, []);

  const recentOrders = [
    {
      id: "1",
      name: "Espresso",
      price: "15.00 EGP",
      image: Espresso,
    },
    {
      id: "2",
      name: "Latte",
      price: "25.00 EGP",
      image: Latte,
    },
  ];

  // Render single item
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.recentOrder, index == 0 ? { marginLeft: 0 } : {}]}
      onPress={() => {
        navigation.navigate("Product");
      }}
    >
      <Image
        source={item.image}
        style={{ width: 55, height: 55, alignSelf: "center", marginTop: 5 }}
      />
      <View style={styles.itemData}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice} regular>
          {item.price}
        </Text>
      </View>
      <FontAwesome
        style={styles.itemChevron}
        name="chevron-right"
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
            data={recentOrders}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginLeft: 25 }}
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
    padding: 15,
    paddingVertical: 10,
    flexDirection: "row",
    borderRadius: 20,
    marginLeft: 15,
  },
  itemName: {
    color: "#4B5F8B",
  },
  itemPrice: {
    color: "#A3B2D3",
  },
  itemData: {
    paddingLeft: 10,
    alignSelf: "center",
  },
  itemChevron: {
    paddingLeft: 15,
    alignSelf: "center",
  },
});

export default RecentOrders;
