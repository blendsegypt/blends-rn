import React, { useState, useEffect } from "react";
import { Image, Dimensions, TouchableOpacity } from "react-native";
// Images Carousel
import Carousel from "react-native-snap-carousel";
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content";
import API from "../utils/axios";

function Banners({ navigation }) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const loadBanners = async () => {
      const banners = await API.get("app/banners");
      setBanners(banners.data.data);
      setImagesLoaded(true);
    };
    loadBanners();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate("Product", { product_id: item.product_id });
        }}
      >
        <Image
          key={index}
          source={{ uri: item.banner_image_url }}
          style={{ width: 360, height: 155 }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      {imagesLoaded ? (
        <Carousel
          data={banners}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={362}
        />
      ) : (
        <SkeletonContent
          containerStyle={{ width: 325, marginLeft: 25 }}
          isLoading={true}
          animationDirection="horizontalLeft"
          duration="800"
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
