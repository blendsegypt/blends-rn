/*
 *
 *  TextInput.js
 *  Custom component for Text inputs (based on react-native's TextInput)
 *
 *  @Usage:
 *  <TextInput
 *    onChangeText={() => fn() }
 *    onBlur={() => fn() }
 *    keyboardType={String}
 *    maxLength={Number}
 *    defaultValue={String}
 *    secureTextEntry={Boolean}
 *    editable={Boolean}
 *  >
 *    Placeholder
 *  </TextInput>
 *
 */

import React from "react";
import {TextInput, StyleSheet, View} from "react-native";
// Custom font for Text Input fields
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";

export default function (props) {
  return (
    <>
      <TextInput
        style={[styles.textInput, props.style]}
        placeholder={props.children}
        placeholderTextColor="#BCBCBC"
        onChangeText={(text) => {
          if (props.onChangeText) props.onChangeText(text);
        }}
        onBlur={() => {
          if (props.onBlur) props.onBlur();
        }}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
        defaultValue={props.defaultValue}
        secureTextEntry={props.secureTextEntry}
        editable={props.editable === false ? false : true}
        autoCapitalize={"words"}
      />
      {props.editable === false && (
        <View style={styles.lock}>
          <FontAwesomeIcon icon={faLock} size={16} color="#11203E" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#fff",
    padding: 17,
    paddingVertical: 20,
    fontSize: 15,
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
    color: "#11203E",
    fontFamily: "FiraSans-Regular",
  },
  lock: {
    position: "absolute",
    right: 17,
    top: 28,
  },
});
