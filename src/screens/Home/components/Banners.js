import React from "react";
import {Image, Dimensions, TouchableOpacity} from "react-native";
// Images Carousel
import Carousel from "react-native-snap-carousel";
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import Toast from "react-native-toast-message";

function Banners({
  navigation,
  bannersLoaded = false,
  banners = [],
  supportedArea,
}) {
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (!supportedArea) {
            Toast.show({
              type: "error",
              topOffset: 50,
              visibilityTime: 2000,
              text1: "Unsupported Location",
              text2: "Please change your location to add products to the cart.",
            });
            return;
          }
          navigation.navigate("Product", {product_id: item.product_id});
        }}>
        <Image
          key={index}
          source={{uri: item.banner_image_url, cache: "force-cache"}}
          style={{width: 360, height: 155}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      {bannersLoaded ? (
        <Carousel
          data={banners}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={360}
        />
      ) : (
        <SkeletonContent
          containerStyle={{width: 325, marginLeft: 25}}
          isLoading={true}
          animationDirection="horizontalLeft"
          duration={800}
          boneColor="#D1D1D1"
          layout={[
            {
              key: "banner",
              width: 325,
              height: 140,
              borderRadius: 10,
            },
          ]}
        />
      )}
    </>
  );
}

export default Banners;
