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
import Text from "../../components/ui/Text";
import Link from "../../components/ui/Link";
import Button from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";
//Assets
import BlendsLogo from "../../../assets/BlendsLogo.png";
import CloseSheet from "./utils/CloseSheet";
import API from "../../utils/axios";
import Toast from "react-native-toast-message";
//Redux
import {connect} from "react-redux";
import {login} from "../../redux/actions/auth.action";
//react-hook-form
import {useForm, Controller} from "react-hook-form";

// Login Sheet
function LoginSheet({setSheet, closeSheet, login, loginMode}) {
  const [buttonActive, setButtonActive] = useState(false);
  //forms configuration
  const {handleSubmit, control, errors, formState} = useForm({
    mode: "onChange",
  });

  //activate button if form is valid
  useEffect(() => {
    if (formState.isValid) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [formState]);

  // Login handler
  const loginHandler = async (data) => {
    try {
      const response = await API.post("auth/login", {
        phone_number: data.phone_number,
        password: data.password,
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
        <Controller
          name="phone_number"
          rules={{
            required: {value: true, message: "Phone Number is required"},
            pattern: {value: /^\d+$/, message: "Invalid Phone Number"},
          }}
          control={control}
          render={({onBlur, onChange, value}) => (
            <TextInput
              error={errors.phone_number}
              errorMessage={errors?.phone_number?.message}
              onChangeText={(text) => onChange(text)}
              onBlur={onBlur}
              keyboardType="numeric"
              maxLength={11}
              value={value}>
              Phone Number
            </TextInput>
          )}
        />
        <Controller
          name="password"
          rules={{
            required: {value: true, message: "Password is required"},
          }}
          control={control}
          render={({onBlur, onChange, value}) => (
            <TextInput
              error={errors.password}
              errorMessage={errors?.password?.message}
              onChangeText={(text) => onChange(text)}
              onBlur={onBlur}
              secureTextEntry
              value={value}>
              Password
            </TextInput>
          )}
        />
        {buttonActive ? (
          <Button style={{marginTop: 10}} onPress={handleSubmit(loginHandler)}>
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
