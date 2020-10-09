import React, { useState, useEffect } from "react";
import { Image, Dimensions } from "react-native";
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
    const fakeLoading = setTimeout(() => {
      setImagesLoaded(true);
    }, 2000);
    return () => {
      clearTimeout(fakeLoading);
    };
  }, []);

  const entries = [CoffeeAmericanoOffer, SignatureLatteOffer];
  const renderItem = ({ item, index }) => {
    return (
      <Image key={index} source={item} style={{ width: 360, height: 155 }} />
    );
  };
  return (
    <>
      {imagesLoaded ? (
        <Carousel
          data={entries}
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
