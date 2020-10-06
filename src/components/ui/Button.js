import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
//UI Components
import Text from "./Text";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Blends Icon (for blend icon-based buttons)
import BlendsIconWhite from "../../../assets/BlendsIconWhite.png";

export default function Button(props) {
  // Blends color scheme
  const colorScheme = {
    primary: "#C84D49",
    secondary: "#11203E",
    success: "#7EAD61",
    disabled: "#C0C0C0",
  };

  // Determine button background color
  let buttonBG = colorScheme.primary; // Default
  if (props.secondary) buttonBG = colorScheme.secondary;
  if (props.success) buttonBG = colorScheme.success;

  // Determine button icon
  let buttonIcon = "chevron-right"; // Default
  if (props.icon) buttonIcon = props.icon;

  // Check if disabled
  if (props.disabled) {
    return (
      <TouchableWithoutFeedback>
        <View
          style={[
            styles.button,
            { backgroundColor: colorScheme.disabled },
            props.style,
          ]}
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

  let symbol;
  if (props.price) {
    symbol = (
      <Text bold style={styles.price}>
        {props.price}
      </Text>
    );
  } else if (props.blends) {
    symbol = (
      <Image source={BlendsIconWhite} style={{ width: 22, height: 17 }} />
    );
  } else if (props.noIcon) {
    symbol = <></>;
  } else {
    symbol = (
      <FontAwesome
        style={styles.icon}
        name={buttonIcon}
        size={12}
        color="white"
      />
    );
  }
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonBG, shadowColor: buttonBG },
        props.style,
      ]}
      onPress={() => {
        if (props.onPress) props.onPress();
      }}
    >
      <Text style={styles.text}>{props.children}</Text>
      {symbol}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingLeft: 25,
    paddingVertical: 27,
    borderRadius: 50,
    flexDirection: "row",
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
  price: {
    color: "#fff",
    fontSize: 15,
  },
});
