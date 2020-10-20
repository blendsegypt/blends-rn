import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
//UI Components
import Text from "../../../components/ui/Text";
import Link from "../../../components/ui/Link";
import Button from "../../../components/ui/Button";
import TextInput from "../../../components/ui/TextInput";
//Assets
import BlendsLogo from "../../../../assets/BlendsLogo.png";
//Field Validation
import validateField from "../../../utils/validateField";
import CloseSheet from "./utils/CloseSheet";

// Login Sheet
export default function LoginSheet({
  setSheet,
  closeSheet,
  confirmUser,
  loginMode,
}) {
  const [buttonActive, setButtonActive] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({
    text: "Phone Number",
    value: "",
    minLength: 11,
    validated: false,
    errors: [],
  });
  const [password, setPassword] = useState({
    text: "Password",
    value: "",
    notEmpty: true,
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
    const errorsLength = [...phoneNumber.errors, ...password.errors].length;
    const fieldsValidated = phoneNumber.validated && password.validated;

    if (errorsLength == 0 && fieldsValidated) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [phoneNumber.errors, password.errors]);

  // Login handler ---------------------------------- To be replaced by real login
  const loginHandler = () => {
    confirmUser("Ahmed Login", phoneNumber.value);
    closeSheet();
  };

  return (
    <>
      {Platform.OS === "android" && <CloseSheet closeSheet={closeSheet} />}
      <ScrollView
        style={[styles.bottomSheetContainer]}
        contentContainerStyle={{ paddingBottom: 500 }}
        keyboardShouldPersistTaps="always"
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={BlendsLogo}
            style={{ width: 80, height: 62 }}
            resizeMode="contain"
          />
          {!loginMode && (
            <Link
              onPress={() => {
                setSheet("StartSheet");
              }}
            >
              Create a new Account
            </Link>
          )}
        </View>
        <Text bold style={styles.title}>
          Login
        </Text>
        <Text regular style={styles.message}>
          Please enter your account credentials, or use Facebook if your account
          is linked
        </Text>
        {/* Error Messages */}
        {[...phoneNumber.errors, ...password.errors].map((error, index) => {
          return (
            <View style={styles.errorMessage} key={index}>
              <Text regular style={{ color: "#b55b5b" }}>
                {error.message}
              </Text>
            </View>
          );
        })}
        <TextInput
          keyboardType="numeric"
          maxLength={11}
          onChangeText={(text) => {
            const newPhoneNumber = { ...phoneNumber, value: text };
            setPhoneNumber(newPhoneNumber);
            validate(newPhoneNumber, setPhoneNumber);
          }}
        >
          Phone Number *
        </TextInput>
        <TextInput
          secureTextEntry
          onChangeText={(text) => {
            const newPassword = { ...password, value: text };
            setPassword(newPassword);
            validate(newPassword, setPassword);
          }}
        >
          Password *
        </TextInput>
        {buttonActive ? (
          <Button style={{ marginTop: 10 }} onPress={() => loginHandler()}>
            Continue
          </Button>
        ) : (
          <Button style={{ marginTop: 10 }} disabled>
            Continue
          </Button>
        )}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: Platform.OS === "android" ? 80 : 350,
          paddingHorizontal: 25,
        }}
      >
        <Button style={{ backgroundColor: "#3077F2" }} icon="facebook">
          Sign in using Facebook
        </Button>
      </View>
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
