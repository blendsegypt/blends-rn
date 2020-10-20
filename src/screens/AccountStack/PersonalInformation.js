import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import TextInput from "../../components/ui/TextInput";
import Button from "../../components/ui/Button";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Redux
import { connect } from "react-redux";
import { updatePersonalInfo } from "../../redux/actions/user.action";
//Form Field Validation
import validateField from "../../utils/validateField";

function PersonalInformation({
  navigation,
  fullNameRedux,
  phoneNumberRedux,
  updatePersonalInfo,
}) {
  const [formChanged, setFormChanged] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);

  // Personal Fields
  const [fullName, setFullName] = useState({
    text: "Full Name",
    value: fullNameRedux,
    notEmpty: true,
    validated: true,
    errors: [],
  });
  const [phoneNumber, setPhoneNumber] = useState({
    text: "Phone Number",
    value: phoneNumberRedux,
    notEmpty: true,
    validated: true,
    regex: /^\d+$/,
    regexErrorMessage: "Phone Number can only contain numbers",
    errors: [],
  });
  const [email, setEmail] = useState({
    text: "Email",
    value: "",
    validated: true,
    notEmpty: true,
    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    regexErrorMessage: "The email you've entered is not a valid email",
    errors: [],
  });
  const [password, setPassword] = useState({
    text: "Password",
    value: "",
    validated: true,
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState({
    text: "Password Confirmation",
    value: "",
    equality: true,
    equals: "",
    validated: true,
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
      ...email.errors,
      ...passwordConfirmation.errors,
    ].length;
    const fieldsValidated =
      fullName.validated &&
      phoneNumber.validated &&
      email.validated &&
      passwordConfirmation.validated &&
      formChanged;

    if (errorsLength == 0 && fieldsValidated) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [
    fullName.errors,
    phoneNumber.errors,
    email.errors,
    passwordConfirmation.errors,
    formChanged,
  ]);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Account");
            }}
            style={{ flex: 0.5, paddingTop: 25 }}
          >
            <FontAwesome
              style={styles.headerChevron}
              name="chevron-left"
              size={22}
              color="#11203E"
            />
          </TouchableOpacity>
          <Text bold style={styles.screenTitle}>
            Personal Information
          </Text>
        </View>
      </SafeAreaView>
      {/* Personal Information Form */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {/* Error Messages */}
        {[
          ...fullName.errors,
          ...phoneNumber.errors,
          ...email.errors,
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
        {/* Full Name */}
        <TextInput
          onChangeText={(text) => {
            setFullName({ ...fullName, value: text });
          }}
          onBlur={() => {
            setFormChanged(true);
            validate(fullName, setFullName);
          }}
          defaultValue={fullName.value}
          style={{ marginVertical: 7, marginHorizontal: 25 }}
        >
          Full Name
        </TextInput>
        {/* Phone Number */}
        <TextInput
          onChangeText={(text) => {
            setPhoneNumber({ ...phoneNumber, value: text });
          }}
          onBlur={() => {
            setFormChanged(true);
            validate(phoneNumber, setPhoneNumber);
          }}
          keyboardType="numeric"
          defaultValue={phoneNumber.value}
          maxLength={11}
          style={{ marginVertical: 7, marginHorizontal: 25 }}
        >
          Phone Number
        </TextInput>
        {/* Email */}
        <TextInput
          onChangeText={(text) => {
            setEmail({ ...email, value: text });
          }}
          onBlur={() => {
            setFormChanged(true);
            validate(email, setEmail);
          }}
          style={{ marginVertical: 7, marginHorizontal: 25 }}
        >
          Email
        </TextInput>
        {/* Password */}
        <TextInput
          secureTextEntry
          onChangeText={(text) => {
            setPassword({ ...password, value: text });
            setPasswordConfirmation({
              ...passwordConfirmation,
              equals: text,
              validated: false,
            });
          }}
          style={{ marginVertical: 7, marginHorizontal: 25 }}
        >
          Password
        </TextInput>
        {/* Password Confirmation */}
        <TextInput
          secureTextEntry
          onChangeText={(text) => {
            setPasswordConfirmation({ ...passwordConfirmation, value: text });
          }}
          onBlur={() => {
            setFormChanged(true);
            validate(passwordConfirmation, setPasswordConfirmation);
          }}
          style={{ marginVertical: 7, marginHorizontal: 25 }}
        >
          Password Confirmation
        </TextInput>
        {/* Save Button */}
        <View style={{ marginHorizontal: 25 }}>
          {buttonActive ? (
            <Button
              icon="check"
              style={{ marginTop: 10 }}
              onPress={() => {
                const newPersonalInfo = {
                  fullName: fullName.value,
                  phoneNumber: phoneNumber.value,
                  email: email.value,
                };
                updatePersonalInfo(newPersonalInfo);
                navigation.navigate("Account");
              }}
            >
              Save
            </Button>
          ) : (
            <Button disabled icon="check" style={{ marginTop: 10 }}>
              Save
            </Button>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 25,
    marginTop: 10,
    flexDirection: "row",
  },
  screenTitle: {
    fontSize: 25,
    paddingTop: 20,
  },
  container: {
    marginTop: 25,
    backgroundColor: "#fff",
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 25,
  },
  errorMessage: {
    backgroundColor: "#F3E1E1",
    padding: 15,
    marginBottom: 10,
    borderRadius: 20,
  },
});

const mapStateToProps = (state) => ({
  fullNameRedux: state.userReducer.fullName,
  phoneNumberRedux: state.userReducer.phoneNumber,
});

const mapDispatchToProps = (dispatch) => ({
  updatePersonalInfo: (personalInfo) => {
    dispatch(updatePersonalInfo(personalInfo));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformation);
