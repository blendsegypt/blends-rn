import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function (props) {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={props.children}
      placeholderTextColor="#BCBCBC"
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#fff",
    padding: 17,
    borderRadius: 50,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15.65,
    elevation: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fff",
  },
});
