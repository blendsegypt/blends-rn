import React, {useState, useEffect} from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
//UI Components
import Text from "../../../components/ui/Text";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlus, faChevronRight} from "@fortawesome/free-solid-svg-icons";
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content-nonexpo";
//Toast messages
import Toast from "react-native-toast-message";
//Redux
import {connect} from "react-redux";
import {addToCart} from "../../../redux/actions/cart.action";
//Helpers
import getRecentOrders from "../helpers/getRecentOrders";

function RecentOrders({navigation, addToCart}) {
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [ordersItems, setOrdersItems] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const recentOrders = await getRecentOrders();
        setOrdersItems(recentOrders);
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
    })();
  }, []);

  // Render single item
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={[styles.recentOrder, index == 0 ? {marginLeft: 0} : {}]}
      onPress={() => {
        if (item.retail) {
          const cartItem = {
            name: item.name,
            product_id: item.id,
            price: item.sale_price === 0 ? item.price : item.sale_price,
            selectedOptions: [],
            image: item.product_image_url,
            quantity: 1,
          };
          addToCart(cartItem);
          return;
        }
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
      {item.retail ? (
        <FontAwesomeIcon
          style={styles.itemChevron}
          icon={faPlus}
          size={14}
          color="#BCCAE9"
        />
      ) : (
        <FontAwesomeIcon
          style={styles.itemChevron}
          icon={faChevronRight}
          size={14}
          color="#BCCAE9"
        />
      )}
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

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item)),
});

export default connect(null, mapDispatchToProps)(RecentOrders);
