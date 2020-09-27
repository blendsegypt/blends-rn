import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
//UI Components
import Text from "./Text";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";

export default function Button(props) {
  // Blends color scheme
  const colorScheme = {
    primary: "#C84D49",
    secondary: "#11203E",
    disabled: "#C0C0C0",
  };

  // Determine button background color
  let buttonBG = colorScheme.primary; // Default
  if (props.secondary) buttonBG = colorScheme.secondary;

  // Determine button icon
  let buttonIcon = "chevron-right"; // Default
  if (props.icon) buttonIcon = props.icon;

  // Check if disabled
  if (props.disabled) {
    return (
      <TouchableWithoutFeedback>
        <View
          style={[styles.button, { backgroundColor: colorScheme.disabled }]}
        >
          <Text style={styles.text}>{props.children}</Text>
          <FontAwesome
            style={styles.icon}
            name={buttonIcon}
            size={14}
            color="white"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonBG, shadowColor: buttonBG },
      ]}
    >
      <Text style={styles.text}>{props.children}</Text>
      <FontAwesome
        style={styles.icon}
        name={buttonIcon}
        size={12}
        color="white"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingLeft: 25,
    paddingVertical: 27,
    borderRadius: 50,
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15.65,
    elevation: 8,
  },
  text: {
    color: "white",
    fontSize: 15,
    flex: 0.93,
  },
  icon: {
    paddingTop: 3,
    fontSize: 15,
  },
});
