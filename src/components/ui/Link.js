import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
//UI Components
import Text from "./Text";

export default function Link(props) {
  return (
    <TouchableOpacity>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#437FD9",
  },
});
