/*
 *
 *  Dropdown.js
 *  Custom component for Buttons (Based on react-native-picker-select)
 *
 *  @Usage:
 *  <Dropdown
 *    items={[]}
 *    onChange={() => { fn() }}
 *  >
 *
 */

import React from "react";
import {StyleSheet} from "react-native";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
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
        return <FontAwesomeIcon icon={faChevronDown} size={14} color="white" />;
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
