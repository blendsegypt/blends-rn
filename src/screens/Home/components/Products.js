import React, {useState, useEffect} from "react";
import {View, StyleSheet, FlatList, TouchableOpacity} from "react-native";
//UI Components
import Text from "../../../components/ui/Text";
//Components
import ProductItem from "./ProductItem";
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content-nonexpo";
//Toast Messages
import Toast from "react-native-toast-message";
// Helpers
import getCategories from "../helpers/getCategories";
import getProductsByCategory from "../helpers/getProductsByCategory";

function Products({navigation, supportedArea, branchID}) {
  console.disableYellowBox = true;
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  // Render single category
  const renderCategory = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        if (activeCategory === item.id) return;
        setProductsLoaded(false);
        setActiveCategory(item.id);
      }}>
      <Text
        semiBold
        style={[
          styles.category,
          activeCategory == item.id ? {color: "#11203E"} : {},
          index === 0 ? {marginLeft: 0} : {},
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Load Categories
  useEffect(() => {
    (async function () {
      try {
        const categories = await getCategories();
        setActiveCategory(categories[0].id);
        setCategoriesLoaded(true);
        setCategories(categories);
      } catch (errors) {
        Toast.show({
          type: "error",
          topOffset: 70,
          visibilityTime: 2000,
          text1: "An Error Occured",
          text2:
            "Something wrong happened while loading categories, please try again!",
        });
      }
    })();
  }, []);

  // Load Products
  useEffect(() => {
    if (!activeCategory) return;
    (async function () {
      try {
        const fetchedProducts = await getProductsByCategory(
          activeCategory,
          branchID,
        );
        setProductsLoaded(true);
        setProducts(fetchedProducts);
      } catch (errors) {
        Toast.show({
          type: "error",
          topOffset: 70,
          visibilityTime: 2000,
          text1: "An Error Occured",
          text2:
            "Something wrong happened while loading products, please try again!",
        });
      }
    })();
  }, [activeCategory]);

  return (
    <View>
      {/* Categories */}
      {categoriesLoaded ? (
        <FlatList
          data={categories}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderCategory}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <SkeletonContent
          containerStyle={{flexDirection: "row"}}
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
          contentContainerStyle={{
            flex: 1,
            marginTop: 15,
          }}
          data={products}
          keyExtractor={(item) => String(item.id)}
          numColumns="2"
          renderItem={({item}) => {
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
