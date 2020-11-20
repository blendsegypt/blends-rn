import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
//UI Components
import Text from "./ui/Text";
//Components
import ProductItem from "../components/ProductItem";
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content";
import API from "../utils/axios";

function Products({ navigation, supportedArea }) {
  console.disableYellowBox = true;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
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

  // Initialize component
  useEffect(() => {
    const getCategories = async () => {
      const categories = await API.get("app/products/categories");
      setCategories(categories.data.data);
      setCategoriesLoaded(true);
    };
    getCategories();
  }, []);

  // On Category change
  useEffect(() => {
    const getProducts = async () => {
      const products = await API.get(
        `app/products/categories/${activeCategory}`
      );
      setProducts(products.data.data);
      setProductsLoaded(true);
    };
    setProductsLoaded(false);
    getProducts();
  }, [activeCategory]);

  return (
    <View>
      {/* Categories */}
      {categoriesLoaded ? (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
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
          style={{ flex: 1 }}
          data={products}
          keyExtractor={(item) => String(item.id)}
          numColumns="2"
          renderItem={({ item }) => {
            return (
              <ProductItem
                {...item}
                navigation={navigation}
                supportedArea={supportedArea}
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
