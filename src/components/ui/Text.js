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
import { Text } from "react-native";

import {
  useFonts,
  FiraSans_400Regular,
  FiraSans_500Medium,
  FiraSans_600SemiBold,
  FiraSans_700Bold,
} from "@expo-google-fonts/fira-sans";

export default function (props) {
  const [fontsLoaded] = useFonts({
    FiraSans_400Regular,
    FiraSans_500Medium,
    FiraSans_600SemiBold,
    FiraSans_700Bold,
  });

  // Font not yet loaded => render native Text component
  if (!fontsLoaded) return <Text>{props.children}</Text>;

  // Determine font weight
  let fontFamily = "FiraSans_500Medium"; // Default
  if (props.regular) fontFamily = "FiraSans_400Regular";
  if (props.semiBold) fontFamily = "FiraSans_600SemiBold";
  if (props.bold) fontFamily = "FiraSans_700Bold";

  return (
    <Text style={[props.style, { fontFamily: fontFamily }]}>
      {props.children}
    </Text>
  );
}
