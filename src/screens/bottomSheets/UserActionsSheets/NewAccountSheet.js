import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
//UI Components
import Text from "../../../components/ui/Text";
import Button from "../../../components/ui/Button";
import TextInput from "../../../components/ui/TextInput";
//Assets
import BlendsLogo from "../../../../assets/BlendsLogo.png";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Field Validation
import validateField from "../../../utils/validateField";
//Close Sheet component
import CloseSheet from "./utils/CloseSheet";

export default function NewAccountSheet({
  setSheet,
  userObject,
  setUserObject,
  closeSheet,
}) {
  const [buttonActive, setButtonActive] = useState(false);
  const [fullName, setFullName] = useState({
    text: "Full Name",
    value: userObject.fullName,
    validated: Boolean(userObject.fullName),
    notEmpty: true,
    regex: /^[a-zA-Z\s]*$/,
    regexErrorMessage: "Full Name can only contain characters and spaces",
    errors: [],
  });
  const [phoneNumber, setPhoneNumber] = useState({
    text: "Phone Number",
    value: userObject.phoneNumber,
    minLength: 11,
    validated: Boolean(userObject.phoneNumber),
    errors: [],
  });
  const [password, setPassword] = useState({
    text: "Password",
    value: "",
    notEmpty: true,
    validated: false,
    errors: [],
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState({
    text: "Password Confirmation",
    value: "",
    notEmpty: true,
    equality: true,
    equals: "",
    validated: false,
    errors: [],
  });

  // Validate fields using validate.js from utils folder
  const validate = (field, fieldSetter) => {
    // Validate field
    const fieldAfterValidation = validateField(field);
    // Use the supplied setter to set the validated field
    fieldSetter(fieldAfterValidation);
  };

  // Check if there's no errors, activate the continue button
  useEffect(() => {
    const errorsLength = [
      ...fullName.errors,
      ...phoneNumber.errors,
      ...password.errors,
      ...passwordConfirmation.errors,
    ].length;
    const fieldsValidated =
      fullName.validated &&
      phoneNumber.validated &&
      password.validated &&
      passwordConfirmation.validated;

    if (errorsLength == 0 && fieldsValidated) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [
    fullName.errors,
    phoneNumber.errors,
    password.errors,
    passwordConfirmation.errors,
  ]);

  return (
    <>
      {Platform.OS === "android" && <CloseSheet closeSheet={closeSheet} />}
      <ScrollView
        style={styles.bottomSheetContainer}
        contentContainerStyle={{ paddingBottom: 350 }}
        keyboardShouldPersistTaps="always"
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setSheet("StartSheet");
            }}
            style={{ padding: 15, paddingLeft: 0 }}
          >
            <FontAwesome name="chevron-left" size={22} color="#11203E" />
          </TouchableOpacity>
          <Image
            source={BlendsLogo}
            style={{ width: 80, height: 62 }}
            resizeMode="contain"
          />
        </View>
        <Text bold style={styles.title}>
          New Account
        </Text>
        <Text regular style={styles.message}>
          We'll send you an OTP (One Time Password) to confirm your phone
          number.
        </Text>
        {/* Error Messages */}
        {[
          ...fullName.errors,
          ...phoneNumber.errors,
          ...password.errors,
          ...passwordConfirmation.errors,
        ].map((error, index) => {
          return (
            <View style={styles.errorMessage} key={index}>
              <Text regular style={{ color: "#b55b5b" }}>
                {error.message}
              </Text>
            </View>
          );
        })}
        <TextInput
          style={{ marginVertical: 7 }}
          onChangeText={(text) => {
            const newFullName = { ...fullName, value: text };
            setFullName({ ...fullName, value: text });
            validate(newFullName, setFullName);
          }}
          onBlur={() => validate(fullName, setFullName)}
          defaultValue={fullName.value}
        >
          Full Name
        </TextInput>
        <TextInput
          style={{ marginVertical: 7 }}
          onChangeText={(text) => {
            const newPhoneNumber = { ...phoneNumber, value: text };
            setPhoneNumber(newPhoneNumber);
            validate(newPhoneNumber, setPhoneNumber);
          }}
          keyboardType="numeric"
          defaultValue={phoneNumber.value}
          maxLength={11}
        >
          Phone Number
        </TextInput>
        <TextInput
          secureTextEntry
          style={{ marginVertical: 7 }}
          onChangeText={(text) => {
            const passwordAfterEdit = { ...password, value: text };
            setPassword(passwordAfterEdit);
            setPasswordConfirmation({ ...passwordConfirmation, equals: text });
            validate(passwordAfterEdit, setPassword);
          }}
        >
          Password
        </TextInput>
        <TextInput
          secureTextEntry
          style={{ marginVertical: 7 }}
          onChangeText={(text) => {
            const passwordConfirmAfterEdit = {
              ...passwordConfirmation,
              value: text,
            };
            setPasswordConfirmation(passwordConfirmAfterEdit);
            validate(passwordConfirmAfterEdit, setPasswordConfirmation);
          }}
        >
          Password Confirmation
        </TextInput>
        {buttonActive ? (
          <Button
            style={{ marginTop: 10 }}
            onPress={() => {
              setUserObject({
                fullName: fullName.value,
                phoneNumber: phoneNumber.value,
              });
              setSheet("OTPSheet");
            }}
          >
            Continue
          </Button>
        ) : (
          <Button style={{ marginTop: 10 }} disabled>
            Continue
          </Button>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: Dimensions.get("window").height,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 25,
    marginTop: Platform.OS === "android" ? 25 : 0,
  },
  title: {
    fontSize: 19,
    paddingTop: 25,
    color: "#11203E",
  },
  message: {
    paddingTop: 7,
    fontSize: 15,
    color: "#8A8A8A",
    lineHeight: 23,
  },
  errorMessage: {
    backgroundColor: "#F3E1E1",
    padding: 15,
    marginVertical: 10,
    borderRadius: 20,
  },
});
