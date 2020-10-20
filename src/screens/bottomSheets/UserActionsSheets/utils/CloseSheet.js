import React from "react";
import { View, TouchableOpacity } from "react-native";
//Icons font
import { FontAwesome } from "@expo/vector-icons";

export default function CloseSheet({ closeSheet }) {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => {
          closeSheet();
        }}
        style={{
          backgroundColor: "#d6d6d6",
          padding: 19,
          paddingHorizontal: 20,
          position: "absolute",
          top: 40,
          zIndex: 9999,
          borderRadius: 100,
        }}
      >
        <FontAwesome name="times" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
