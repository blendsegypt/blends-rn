import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
