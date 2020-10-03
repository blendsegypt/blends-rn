import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
//UI Components
import Text from "./Text";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//RN Picker
import RNPickerSelect from "react-native-picker-select";

export default function Dropdown(props) {
  return (
    <RNPickerSelect
      placeholder={{}}
      style={pickerStyles}
      items={props.items}
      onValueChange={(value) => {
        if (props.onChange) props.onChange(value);
      }}
      useNativeAndroidPickerStyle={false}
      Icon={() => {
        return <FontAwesome name="chevron-down" size={14} color="white" />;
      }}
    />
  );
}

const pickerStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#11203E",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    color: "white",
  },
  inputAndroid: {
    backgroundColor: "#11203E",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    color: "white",
  },
  iconContainer: {
    paddingRight: 20,
    paddingTop: 20,
  },
});
