import React, {useState, useEffect} from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";
import Dropdown from "../../components/ui/Dropdown";
import Toast from "react-native-toast-message";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
//Components
import CartIcon from "../../components/CartIcon";
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content-nonexpo";
//Redux
import {connect} from "react-redux";
import {addToCart} from "../../redux/actions/cart.action";
//Axios
import API from "../../utils/axios";

function Product({navigation, route, addToCart}) {
  const {product_id} = route.params;
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [price, setPrice] = useState(0);

  // Load Product data from backend API
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await API.get(`products/${product_id}`);
        const product = response.data.data;
        setProductData(product);
        setPrice(product.sale_price ? product.sale_price : product.price);
        setLoading(false);
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
    loadProduct();
  }, []);

  // Product Custom Option handler
  const addCustomOption = (label, value, price) => {
    let options = [...selectedOptions];
    // Change option if it exists in selectedOptions
    let alreadyExists = false;
    let alreadyExistsIndex = null;
    options.forEach((option, index) => {
      if (label == option.label) {
        alreadyExists = true;
        alreadyExistsIndex = index;
      }
    });
    const option = {
      label,
      value,
      price,
    };
    if (alreadyExists) {
      options[alreadyExistsIndex] = option;
    } else {
      options.push(option);
    }
    setSelectedOptions(options);
  };

  // Refresh Price based on selected options
  useEffect(() => {
    // Calculate Total price (with customization)
    let basePrice =
      productData.sale_price === 0 ? productData.price : productData.sale_price;
    let amount = 0;

    selectedOptions.forEach((option) => {
      amount += option.price;
    });
    setPrice(basePrice + amount);
  }, [selectedOptions]);

  //Add default options to selectedOptions array
  useEffect(() => {
    if (loading) return;
    // Add default customization options
    const defaultOptions = [];
    productData.product_custom_options.forEach((custom_option) => {
      // If option is not mandatory return
      if (!custom_option.mandatory) return;
      // First option of each customization option is always the default
      const firstOption = custom_option.custom_options[0];
      const defaultOption = {
        label: custom_option.label,
        value: firstOption.label,
        price: firstOption.price,
      };
      defaultOptions.push(defaultOption);
    });
    setSelectedOptions(defaultOptions);
  }, [loading]);

  // Add Product to Cart
  const addProductToCart = () => {
    const cartItem = {
      product_id: productData.id,
      price,
      selectedOptions,
      image: productData.product_image_url,
      name: productData.name,
      quantity: 1,
    };
    addToCart(cartItem);
    setTimeout(() => {
      navigation.navigate("Home");
    }, 500);
  };

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{flex: 0.5, paddingTop: 25}}>
            <FontAwesomeIcon
              style={styles.headerChevron}
              icon={faChevronLeft}
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
            containerStyle={{marginBottom: 10}}
            isLoading={true}
            animationDirection="horizontalLeft"
            duration={800}
            boneColor="#D1D1D1"
            layout={[
              {
                key: "image",
                width: 230,
                height: 230,
                borderRadius: 150,
              },
            ]}
          />
        ) : (
          <Image
            source={{
              uri: productData.product_image_url,
              cache: "force-cache",
            }}
            style={{width: 230, height: 230}}
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
            duration={800}
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
          productData.product_tags.map((tag, index) => {
            return (
              <View
                key={index}
                style={[styles.tag, {backgroundColor: tag.color}]}>
                <Text style={[styles.tagText, {color: "#fff"}]}>
                  {tag.label}
                </Text>
              </View>
            );
          })
        )}
      </View>
      {/* Product Description */}
      <View style={{paddingHorizontal: 25, paddingTop: 5}}>
        {loading ? (
          <SkeletonContent
            containerStyle={{marginTop: 5}}
            isLoading={true}
            animationDirection="horizontalLeft"
            duration={800}
            boneColor="#D1D1D1"
            layout={[
              {
                key: "desc",
                width: "100%",
                height: 15,
                borderRadius: 20,
              },
              {
                key: "desc2",
                width: "25%",
                height: 15,
                borderRadius: 20,
                marginTop: 10,
              },
            ]}
          />
        ) : (
          <Text regular style={styles.productDesc}>
            {productData.description}
          </Text>
        )}
      </View>
      <ScrollView
        style={styles.customizationSection}
        contentContainerStyle={{paddingBottom: 70}}
        showsVerticalScrollIndicator={false}>
        <Text semiBold style={styles.customizationTitle}>
          Customize your {productData.name}
        </Text>
        {/* Customization Options */}
        {loading ? (
          <SkeletonContent
            containerStyle={{flexDirection: "row", marginTop: 15}}
            isLoading={true}
            animationDirection="horizontalLeft"
            duration={800}
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
          productData.product_custom_options.map((custom_option, index) => {
            return (
              <View style={styles.customOption} key={index}>
                <Text regular style={styles.customOptionText}>
                  {custom_option.label}
                </Text>
                <View style={{flex: 0.6}}>
                  <Dropdown
                    items={custom_option.custom_options.map((option) => {
                      return {
                        ...option,
                        inputLabel: option.label + " +" + option.price + " EGP",
                      };
                    })}
                    onChange={(value) => {
                      let price;
                      let option_value;
                      custom_option.custom_options.forEach((option) => {
                        if (option.value == value) {
                          price = option.price;
                          option_value = option.label;
                        }
                      });
                      addCustomOption(custom_option.label, option_value, price);
                    }}
                  />
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 25,
          backgroundColor: "#fff",
          paddingBottom: 25,
        }}>
        {/* Add to Cart Button */}
        {!loading ? (
          <Button
            price={price.toFixed(2) + " EGP"}
            onPress={() => {
              addProductToCart();
            }}>
            Add to Cart
          </Button>
        ) : (
          <Button disabled>Add to Cart</Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 25,
    marginTop: Platform.OS == "ios" ? 10 : 30,
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

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => {
    dispatch(addToCart(item));
  },
});

export default connect(null, mapDispatchToProps)(Product);
