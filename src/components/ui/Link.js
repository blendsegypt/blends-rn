import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
//UI Components
import Text from "./Text";

export default function Link(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.onPress) props.onPress();
      }}
    >
      <Text style={[styles.text, props.style]}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#437FD9",
  },
});
