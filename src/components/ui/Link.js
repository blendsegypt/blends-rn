/*
 *
 *  Link.js
 *  Custom component for Links (Based on react-native's TouchableOpacity)
 *
 *  @Usage:
 *  <Link>text</Link> (normal link)
 *  <Link disabled>text</Link> (disabled link)
 *
 */

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
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
