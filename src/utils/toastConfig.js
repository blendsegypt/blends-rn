/*

  Toast messages configuration

*/
import React from "react";
import { View, StyleSheet } from "react-native";
// UI Components
import Text from "../components/ui/Text";

export default {
  success: (internalState) => (
    <View style={[styles.toast, styles.successToast]}>
      <Text style={[styles.toastTitle, styles.successText]}>
        {internalState.text1}
      </Text>
      <Text style={[styles.toastText, styles.successText]}>
        {internalState.text2}
      </Text>
    </View>
  ),
  error: (internalState) => (
    <View style={[styles.toast, styles.errorToast]}>
      <Text style={[styles.toastTitle, styles.errorText]}>
        {internalState.text1}
      </Text>
      <Text style={[styles.toastText, styles.errorText]}>
        {internalState.text2}
      </Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  // General Toast
  toast: {
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  toastTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  toastText: {
    paddingTop: 3,
    color: "#e74c3c",
    fontWeight: "100",
  },
  // Error Toast
  errorToast: {
    backgroundColor: "#f7d2d2",
  },
  errorText: {
    color: "#e74c3c",
  },
  // Success Toast
  successToast: {
    backgroundColor: "#e5f7df",
  },
  successText: {
    color: "#528741",
  },
});
