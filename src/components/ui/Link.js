import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
//UI Components
import Text from "./Text";

export default function Link(props) {
  // Check if Link is disabled
  if (props.disabled) {
    return (
      <TouchableOpacity>
        <Text style={[styles.text, props.style, { color: "#C0C0C0" }]}>
          {props.children}
        </Text>
      </TouchableOpacity>
    );
  }
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
