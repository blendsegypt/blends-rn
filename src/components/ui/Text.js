/*
 *
 *  Text.js
 *  Text component with custom font (Fira Sans)
 *
 *  @Usage:
 *  <Text>...</Text>
 *  <Text regular>...</Text>
 *  <Text semiBold>...</Text>
 *  <Text bold>...</Text>
 *
 */
import React from "react";
import {Text} from "react-native";

export default function (props) {
  // Determine font weight
  let fontFamily = "FiraSans-Medium"; // Default
  if (props.regular) fontFamily = "FiraSans-Regular";
  if (props.semiBold) fontFamily = "FiraSans-SemiBold";
  if (props.bold) fontFamily = "FiraSans-Bold";

  return (
    <Text style={[props.style, {fontFamily: fontFamily}]}>
      {props.children}
    </Text>
  );
}
