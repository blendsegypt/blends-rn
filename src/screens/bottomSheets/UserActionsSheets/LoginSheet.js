import React, {useState, useEffect} from "react";
import {
  View,
  ScrollView,
  Image,
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
import API from "../../../utils/axios";
import Toast from "react-native-toast-message";
//Redux
import {connect} from "react-redux";
import {login} from "../../../redux/actions/auth.action";
import {faFacebookF} from "@fortawesome/free-brands-svg-icons";

// Login Sheet
function LoginSheet({setSheet, closeSheet, login, loginMode}) {
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

  // Login handler
  const loginHandler = async () => {
    try {
      const response = await API.post("app/auth/login", {
        phone_number: phoneNumber.value,
        password: password.value,
      });
      // Extract user object and addresses array
      const user = Object.assign({}, response.data.data);
      const addresses = user.addresses;
      delete user.addresses;
      // Extract access/refresh tokens
      const accessToken = response.headers["access-token"];
      const refreshToken = response.headers["refresh-token"];
      login(user, accessToken, refreshToken, addresses);
      Toast.show({
        type: "success",
        visibilityTime: 2000,
        topOffset: 50,
        text1: `Hello, ${user.first_name}.`,
        text2: "It's time for some fresh coffee!",
      });
      closeSheet();
    } catch (error) {
      if (error.response) {
        console.log(error.response.config.data);
        if (error.response.data.error === "INVALID_CREDENTIALS") {
          Toast.show({
            type: "error",
            visibilityTime: 2000,
            topOffset: 70,
            text1: "Invalid Phone number / Password",
            text2: "Please try again",
          });
          return;
        }
      }
      Toast.show({
        type: "error",
        visibilityTime: 2000,
        topOffset: 50,
        text1: "An Error Occured",
        text2: "Something wrong happened on our side! Please try again.",
      });
    }
  };

  return (
    <>
      {Platform.OS === "android" && <CloseSheet closeSheet={closeSheet} />}
      <ScrollView
        style={[styles.bottomSheetContainer]}
        contentContainerStyle={{paddingBottom: 300}}
        keyboardShouldPersistTaps="always">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Image
            source={BlendsLogo}
            style={{width: 80, height: 62}}
            resizeMode="contain"
          />
          {!loginMode && (
            <Link
              onPress={() => {
                setSheet("StartSheet");
              }}>
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
              <Text regular style={{color: "#b55b5b"}}>
                {error.message}
              </Text>
            </View>
          );
        })}
        <TextInput
          keyboardType="numeric"
          maxLength={11}
          onChangeText={(text) => {
            const newPhoneNumber = {...phoneNumber, value: text};
            setPhoneNumber(newPhoneNumber);
            validate(newPhoneNumber, setPhoneNumber);
          }}>
          Phone Number *
        </TextInput>
        <TextInput
          secureTextEntry
          onChangeText={(text) => {
            const newPassword = {...password, value: text};
            setPassword(newPassword);
            validate(newPassword, setPassword);
          }}>
          Password *
        </TextInput>
        {buttonActive ? (
          <Button style={{marginTop: 10}} onPress={() => loginHandler()}>
            Continue
          </Button>
        ) : (
          <Button style={{marginTop: 10}} disabled>
            Continue
          </Button>
        )}
        <Button
          style={{backgroundColor: "#3077F2", marginTop: 10}}
          icon={faFacebookF}>
          Sign in using Facebook
        </Button>
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

const mapDispatchToProps = (dispatch) => ({
  login: (user, accessToken, refreshToken, addresses) => {
    dispatch(login(user, accessToken, refreshToken, addresses));
  },
});

export default connect(null, mapDispatchToProps)(LoginSheet);
