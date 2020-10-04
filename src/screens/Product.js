import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
//UI Components
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";
import Dropdown from "../components/ui/Dropdown";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Components
import CartIcon from "../components/CartIcon";
//Assets (for testing purposes)
import LatteLarge from "../../assets/LatteLarge.png";
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content";

function Product({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    image: LatteLarge,
    name: "Latte",
    desc:
      "Coffee drink made with espresso, steamed milk and thin layer of foam",
    price: 24.99,
    tags: [
      {
        bgColor: "#F4D977",
        label: "Hot",
      },
      {
        bgColor: "#CACACA",
        label: "Contains Milk",
      },
    ],
    customOptions: [
      {
        label: "Cup Size",
        options: [
          {
            label: "Small (0 EGP)",
            price: 0,
            value: "sm",
            textValue: "Small",
          },
          {
            label: "Large (5 EGP)",
            price: 5,
            value: "lg",
            textValue: "Large",
          },
        ],
      },
      {
        label: "Milk Type",
        options: [
          {
            label: "Skimmed (0 EGP)",
            price: 0,
            value: "skm",
            textValue: "Skimmed",
          },
          {
            label: "Full Cream (0 EGP)",
            price: 0,
            value: "fc",
            textValue: "Full Cream",
          },
        ],
      },
    ],
    extraOptions: [
      {
        label: "Whipped Cream",
        options: [
          {
            label: "No (0 EGP)",
            price: 0,
            value: false,
            textValue: "No Whipped Cream",
          },
          {
            label: "Yes (0 EGP)",
            price: 0,
            value: true,
            textValue: "Whipped Cream",
          },
        ],
      },
    ],
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [price, setPrice] = useState(productData.price);

  // Load Product data from backend API
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  // Product Custom Option handler
  const addCustomOption = (label, value, price, textValue) => {
    let options = [...selectedOptions];
    // Remove option if it already exists
    options = options.filter((option) => {
      return label != option.label;
    });
    const option = {
      label,
      value,
      price,
      textValue,
    };
    options.push(option);
    setSelectedOptions(options);
  };

  // Refresh Price based on selected options
  useEffect(() => {
    let amount = 0;
    selectedOptions.forEach((option) => {
      amount += option.price;
    });
    setPrice(productData.price + amount);
  }, [selectedOptions]);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{ flex: 0.5, paddingTop: 25 }}
          >
            <FontAwesome
              style={styles.headerChevron}
              name="chevron-left"
              size={22}
              color="#11203E"
            />
          </TouchableOpacity>
          <CartIcon navigation={navigation} />
        </View>
      </SafeAreaView>
      {/* Product Image */}
      <View style={styles.productImage}>
        {loading ? (
          <SkeletonContent
            containerStyle={{ marginBottom: 10 }}
            isLoading={true}
            animationDirection="horizontalLeft"
            duration="800"
            boneColor="#D1D1D1"
            layout={[
              {
                key: "image",
                width: 230,
                height: 230,
                borderRadius: "150%",
              },
            ]}
          />
        ) : (
          <Image
            source={productData.image}
            style={{ width: 230, height: 230 }}
          />
        )}
      </View>
      {/* Product Title */}
      <View style={styles.productTitle}>
        <Text bold style={styles.titleText}>
          {productData.name}
        </Text>
        {/* Product Tags */}
        {loading ? (
          <SkeletonContent
            containerStyle={{}}
            isLoading={true}
            animationDirection="horizontalLeft"
            duration="800"
            boneColor="#D1D1D1"
            layout={[
              {
                key: "tag",
                width: 60,
                height: 25,
                borderRadius: 20,
                marginLeft: 8,
              },
            ]}
          />
        ) : (
          productData.tags.map((tag) => {
            return (
              <View style={[styles.tag, { backgroundColor: tag.bgColor }]}>
                <Text style={[styles.tagText, { color: "#fff" }]}>
                  {tag.label}
                </Text>
              </View>
            );
          })
        )}
      </View>
      {/* Product Description */}
      <View style={{ paddingHorizontal: 25, paddingTop: 5 }}>
        {loading ? (
          <SkeletonContent
            containerStyle={{ marginTop: 5 }}
            isLoading={true}
            animationDirection="horizontalLeft"
            duration="800"
            boneColor="#D1D1D1"
            layout={[
              {
                key: "desc",
                width: "100%",
                height: 15,
                borderRadius: 20,
              },
              {
                key: "desc",
                width: "25%",
                height: 15,
                borderRadius: 20,
                marginTop: 10,
              },
            ]}
          />
        ) : (
          <Text regular style={styles.productDesc}>
            {productData.desc}
          </Text>
        )}
      </View>
      <ScrollView style={styles.customizationSection}>
        <Text semiBold style={styles.customizationTitle}>
          Customize your Latte
        </Text>
        {/* Customization Options */}
        {loading ? (
          <SkeletonContent
            containerStyle={{ flexDirection: "row", marginTop: 15 }}
            isLoading={true}
            animationDirection="horizontalLeft"
            duration="800"
            boneColor="#D1D1D1"
            layout={[
              {
                key: "optionLabel",
                width: 110,
                height: 25,
                borderRadius: 20,
                marginTop: 15,
              },
              {
                key: "optionDropdown",
                width: 220,
                height: 57,
                borderRadius: 50,
                marginLeft: 35,
              },
            ]}
          />
        ) : (
          productData.customOptions.map((customOption) => {
            return (
              <View style={styles.customOption}>
                <Text regular style={styles.customOptionText}>
                  {customOption.label}
                </Text>
                <View style={{ flex: 0.6 }}>
                  <Dropdown
                    items={customOption.options}
                    onChange={(value) => {
                      let price;
                      let textValue;
                      customOption.options.forEach((option) => {
                        if (option.value == value) {
                          price = option.price;
                          textValue = option.textValue;
                        }
                      });
                      addCustomOption(
                        customOption.label,
                        value,
                        price,
                        textValue
                      );
                    }}
                  />
                </View>
              </View>
            );
          })
        )}
        {/* Extra Customization Options */}
        {loading == false && (
          <View style={{ marginTop: 20 }}>
            <Text
              semiBold
              style={[styles.customizationTitle, { color: "#BDBDBD" }]}
            >
              Extras
            </Text>
            {productData.extraOptions.map((customOption) => {
              return (
                <View style={styles.customOption}>
                  <Text regular style={styles.customOptionText}>
                    {customOption.label}
                  </Text>
                  <View style={{ flex: 0.6 }}>
                    <Dropdown
                      items={customOption.options}
                      onChange={(value) => {
                        let price;
                        customOption.options.forEach((option) => {
                          if (option.value == value) price = option.price;
                        });
                        addCustomOption(customOption.label, value, price);
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 25,
          backgroundColor: "#fff",
          paddingBottom: 25,
        }}
      >
        {/* Add to Cart Button */}
        <Button price={price + " EGP"}>Add to Cart</Button>
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
  productImage: {
    alignSelf: "center",
  },
  productTitle: {
    paddingHorizontal: 25,
    flexDirection: "row",
  },
  titleText: {
    fontSize: 22,
    color: "#11203E",
  },
  tag: {
    backgroundColor: "#E7E7E7",
    padding: 6,
    paddingHorizontal: 9,
    marginLeft: 8,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 13,
    color: "#A5A5A5",
  },
  productDesc: {
    fontSize: 16,
    color: "#8B8B8B",
    lineHeight: 24,
  },
  customizationSection: {
    backgroundColor: "#fff",
    marginTop: 20,
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
    paddingTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  customizationTitle: {
    color: "#C84D49",
    fontSize: 17,
  },
  customOption: {
    marginTop: 15,
    flexDirection: "row",
    flex: 1,
  },
  customOptionText: {
    flex: 0.4,
    paddingTop: 20,
    fontSize: 16,
  },
});

export default Product;
