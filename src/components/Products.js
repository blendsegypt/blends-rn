import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
//UI Components
import Text from "./ui/Text";
//Components
import ProductItem from "../components/ProductItem";
//Images (for testing purposes)
import Espresso from "../../assets/Espresso.png";
import Latte from "../../assets/Latte.png";
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content";

function Products() {
  console.disableYellowBox = true;
  const categories = [
    {
      id: "1",
      name: "Hot Coffee",
    },
    {
      id: "2",
      name: "Iced Coffee",
    },
    {
      id: "3",
      name: "Others",
    },
  ];
  const products = [
    {
      id: "1",
      name: "Espresso",
      price: "14.99 EGP",
      image: Espresso,
    },
    {
      id: "2",
      name: "Latte",
      price: "24.99 EGP",
      image: Latte,
    },
    {
      id: "3",
      name: "Espresso",
      price: "14.99 EGP",
      image: Espresso,
    },
    {
      id: "4",
      name: "Latte",
      price: "24.99 EGP",
      image: Latte,
    },
  ];
  const [activeCategory, setActiveCategory] = useState(1);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);

  // Render single category
  const renderCategory = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setActiveCategory(item.id);
      }}
    >
      <Text
        semiBold
        style={[
          styles.category,
          activeCategory == item.id ? { color: "#11203E" } : {},
          index == 0 ? { marginLeft: 0 } : {},
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const fakeLoading = setTimeout(() => {
      setCategoriesLoaded(true);
      setProductsLoaded(true);
    }, 2000);
    return () => {
      clearTimeout(fakeLoading);
    };
  }, []);

  return (
    <View>
      {/* Categories */}
      {categoriesLoaded ? (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
          horizontal={true}
        />
      ) : (
        <SkeletonContent
          containerStyle={{ flexDirection: "row" }}
          isLoading={true}
          animationDirection="horizontalLeft"
          duration="800"
          boneColor="#D1D1D1"
          layout={[
            {
              key: "category1",
              width: 90,
              height: 24,
              borderRadius: 10,
            },
            {
              key: "category2",
              width: 100,
              marginLeft: 10,
              height: 24,
              borderRadius: 10,
            },
            {
              key: "category3",
              width: 70,
              marginLeft: 10,
              height: 24,
              borderRadius: 10,
            },
          ]}
        />
      )}
      {/* Products */}
      {productsLoaded ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns="2"
          renderItem={({ item }) => {
            return (
              <ProductItem
                name={item.name}
                price={item.price}
                image={item.image}
              />
            );
          }}
        />
      ) : (
        <SkeletonContent
          containerStyle={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#FCFBFB",
            width: 160,
            height: 230,
            marginTop: 25,
            borderRadius: 20,
          }}
          isLoading={true}
          animationDirection="horizontalLeft"
          duration="800"
          boneColor="#e3e3e3"
          layout={[
            {
              children: [
                {
                  key: "image",
                  width: 90,
                  height: 90,
                  borderRadius: 150,
                  marginLeft: 10,
                  marginTop: 10,
                },
                {
                  key: "title",
                  width: 60,
                  height: 20,
                  marginLeft: 10,
                  marginTop: 10,
                },
                {
                  key: "price",
                  width: 100,
                  height: 20,
                  marginLeft: 10,
                  marginTop: 10,
                },
                {
                  key: "button",
                  width: 140,
                  height: 40,
                  marginLeft: 10,
                  marginTop: 10,
                },
              ],
            },
            {
              marginLeft: 30,
              children: [
                {
                  key: "image",
                  width: 90,
                  height: 90,
                  borderRadius: 150,
                  marginLeft: 10,
                  marginTop: 10,
                },
                {
                  key: "title",
                  width: 60,
                  height: 20,
                  marginLeft: 10,
                  marginTop: 10,
                },
                {
                  key: "price",
                  width: 100,
                  height: 20,
                  marginLeft: 10,
                  marginTop: 10,
                },
                {
                  key: "button",
                  width: 140,
                  height: 40,
                  marginLeft: 10,
                  marginTop: 10,
                },
              ],
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    color: "#D8D8D8",
    fontSize: 19,
    marginLeft: 15,
  },
});

export default Products;

/*

Dimensions for loading
category: 90 * 24
button: 170 * 56
image: 120 * 110
title: 60 * 20
price: 90 * 20

*/
