import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
// Images Carousel
import Carousel from "react-native-snap-carousel";
// Offers image (only for testing, should be called from backend API)
import CoffeeAmericanoOffer from "../../assets/coffeeAmericanoOffer.png";
import SignatureLatteOffer from "../../assets/signatureLatteOffer.png";
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content";

function Banners() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setImagesLoaded(true);
    }, 2000);
  }, []);

  const entries = [CoffeeAmericanoOffer, SignatureLatteOffer];
  const renderItem = ({ item, index }) => {
    return <Image source={item} style={{ width: 325, height: 140 }} />;
  };
  return (
    <>
      {imagesLoaded ? (
        <Carousel
          data={entries}
          renderItem={renderItem}
          sliderWidth={380}
          itemWidth={325}
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

const styles = StyleSheet.create({
  loadingBanner: {
    width: 325,
    height: 140,
    backgroundColor: "#f5f5f5",
    marginLeft: 25,
    borderRadius: 15,
  },
});

export default Banners;