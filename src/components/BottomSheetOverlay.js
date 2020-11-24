import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

//Animations
import Animated from "react-native-reanimated";
const AnimatedView = Animated.View;

export default function BottomSheetOverlay({ setShowBottomSheet }) {
  const [opacity, setOpacity] = useState(0.01);
  const [hide, setHide] = useState(false);
  // Increase opacity every 5ms
  useEffect(() => {
    let interval;
    if (!hide) {
      interval = setInterval(() => {
        if (opacity < 0.8) {
          setOpacity(opacity + 0.05);
        }
      }, 5);
    } else {
      interval = setInterval(() => {
        if (opacity > 0) {
          setOpacity(opacity - 0.09);
        } else {
          setShowBottomSheet(false);
        }
      }, 1);
    }
    return () => {
      clearInterval(interval);
    };
  }, [opacity, hide]);
  return (
    <>
      <AnimatedView
        pointerEvents="none"
        style={[
          styles.overlay,
          {
            opacity: opacity,
          },
        ]}
      ></AnimatedView>
      <TouchableOpacity
        style={[styles.overlay, { opacity: 0.01 }]}
        onPress={() => setHide(true)}
        activeOpacity={0.01}
      ></TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 99,
  },
});
