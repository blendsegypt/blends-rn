import React, {useState, useEffect} from "react";
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
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
//Field Validation
import validateField from "../../../utils/validateField";
//Close Sheet component
import CloseSheet from "./utils/CloseSheet";
// Redux
import {login} from "../../../redux/actions/auth.action";
import {connect} from "react-redux";
// Toast message
import Toast from "react-native-toast-message";
// Axios
import API from "../../../utils/axios";

function NewAccountSheet({setSheet, userObject, closeSheet, login}) {
  const [buttonActive, setButtonActive] = useState(false);
  const [firstName, setFirstName] = useState({
    text: "First Name",
    value: "",
    validated: false,
    notEmpty: true,
    regex: /^[a-zA-Z\s]*$/,
    regexErrorMessage: "First name can only contain letters.",
    errors: [],
  });
  const [lastName, setLastName] = useState({
    text: "Last Name",
    value: "",
    validated: "",
    notEmpty: true,
    regex: /^[a-zA-Z\s]*$/,
    regexErrorMessage: "Last Name can only contain letters.",
    errors: [],
  });
  const [password, setPassword] = useState({
    text: "Password",
    value: "",
    validated: false,
    regex: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
    regexErrorMessage:
      "Password must be 8 characters or longer, contains atleast a letter and a number.",
    errors: [],
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState({
    text: "Password Confirmation",
    value: "",
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
      ...firstName.errors,
      ...lastName.errors,
      ...password.errors,
      ...passwordConfirmation.errors,
    ].length;
    const fieldsValidated =
      firstName.validated &&
      lastName.validated &&
      password.validated &&
      passwordConfirmation.validated;

    if (errorsLength == 0 && fieldsValidated) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [
    firstName.errors,
    lastName.errors,
    password.errors,
    passwordConfirmation.errors,
  ]);

  const handleSubmit = async () => {
    try {
      const user = {
        first_name: firstName.value,
        last_name: lastName.value,
        phone_number: userObject.phoneNumber,
        password: password.value,
        platform: "ios",
      };
      const response = await API.post("app/register/finish", user);
      // Extract user object
      const newUser = Object.assign({}, response.data.data);
      delete newUser.addresses;
      // Extract access/refresh tokens
      const accessToken = response.headers["access-token"];
      const refreshToken = response.headers["refresh-token"];
      login(newUser, accessToken, refreshToken, []);
      closeSheet();
    } catch (error) {
      Toast.show({
        type: "error",
        topOffset: 50,
        text1: "Error Occured",
        text2: "Something wrong happened on our side! Please try again.",
      });
    }
  };

  return (
    <>
      {Platform.OS === "android" && <CloseSheet closeSheet={closeSheet} />}
      <ScrollView
        style={styles.bottomSheetContainer}
        contentContainerStyle={{paddingBottom: 350}}
        keyboardShouldPersistTaps="always">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <TouchableOpacity
            onPress={() => {
              setSheet("StartSheet");
            }}
            style={{padding: 15, paddingLeft: 0}}>
            <FontAwesomeIcon icon={faChevronLeft} size={22} color="#11203E" />
          </TouchableOpacity>
          <Image
            source={BlendsLogo}
            style={{width: 80, height: 62}}
            resizeMode="contain"
          />
        </View>
        <Text bold style={styles.title}>
          Almost there!
        </Text>
        <Text regular style={styles.message}>
          Complete the following fields and your account will be ready to go.
        </Text>
        {/* Error Messages */}
        {[
          ...firstName.errors,
          ...lastName.errors,
          ...password.errors,
          ...passwordConfirmation.errors,
        ].map((error, index) => {
          return (
            <View style={styles.errorMessage} key={index}>
              <Text regular style={{color: "#b55b5b"}}>
                {error.message}
              </Text>
            </View>
          );
        })}
        <View style={{display: "flex", flexDirection: "row", marginTop: 7}}>
          <TextInput
            style={{marginVertical: 7, flex: 0.5, marginRight: 5}}
            onChangeText={(text) => {
              const newFirstName = {...firstName, value: text};
              setFirstName({...firstName, value: text});
              validate(newFirstName, setFirstName);
            }}
            onBlur={() => validate(firstName, setFirstName)}
            defaultValue={firstName.value}>
            First Name
          </TextInput>
          <TextInput
            style={{marginVertical: 7, flex: 0.5, marginLeft: 5}}
            onChangeText={(text) => {
              const newLastName = {...lastName, value: text};
              setLastName({...lastName, value: text});
              validate(newLastName, setLastName);
            }}
            onBlur={() => validate(lastName, setLastName)}
            defaultValue={lastName.value}>
            Last Name
          </TextInput>
        </View>
        <View>
          <TextInput
            style={{marginVertical: 7}}
            keyboardType="numeric"
            editable={false}
            defaultValue={userObject.phoneNumber}
            maxLength={11}>
            Phone Number
          </TextInput>
        </View>
        <TextInput
          secureTextEntry
          style={{marginVertical: 7}}
          onChangeText={(text) => {
            const passwordAfterEdit = {...password, value: text};
            setPassword(passwordAfterEdit);
            setPasswordConfirmation({...passwordConfirmation, equals: text});
            validate(passwordAfterEdit, setPassword);
          }}>
          Password
        </TextInput>
        <TextInput
          secureTextEntry
          style={{marginVertical: 7}}
          onChangeText={(text) => {
            const passwordConfirmAfterEdit = {
              ...passwordConfirmation,
              value: text,
            };
            setPasswordConfirmation(passwordConfirmAfterEdit);
            validate(passwordConfirmAfterEdit, setPasswordConfirmation);
          }}>
          Password Confirmation
        </TextInput>
        {buttonActive ? (
          <Button
            style={{marginTop: 10}}
            onPress={() => {
              handleSubmit();
            }}>
            Continue
          </Button>
        ) : (
          <Button style={{marginTop: 10}} disabled>
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
    marginVertical: 5,
    borderRadius: 20,
  },
});

const mapDispatchToProps = (dispatch) => ({
  login: (user, accessToken, refreshToken, addresses) =>
    dispatch(login(user, accessToken, refreshToken, addresses)),
});

export default connect(null, mapDispatchToProps)(NewAccountSheet);
