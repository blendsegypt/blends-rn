import React, {useState, useEffect} from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";
//Assets
import BlendsLogo from "../../../assets/BlendsLogo.png";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
//Close Sheet Component
import Toast from "react-native-toast-message";
import CloseSheet from "./utils/CloseSheet";
import API from "../../utils/axios";
//react-hook-form
import {useForm, Controller} from "react-hook-form";

export default function PhoneNumberSheet({
  setSheet,
  setFacebook,
  closeSheet,
  setUserObject,
}) {
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

  const onSubmit = async (data) => {
    try {
      await API.post("register/verify/phone", {
        phone_number: data.phone_number,
      });
      setUserObject({phoneNumber: data.phone_number});
      setSheet("OTPSheet");
    } catch (error) {
      if (
        error.response ||
        error.response.data.errors[0] === "PHONE_NUMBER_EXISTS"
      ) {
        Toast.show({
          type: "error",
          topOffset: 70,
          visibilityTime: 2000,
          text1: "Phone Number already exists!",
          text2: "Please choose a different phone number to continue",
        });
        return;
      }
      Toast.show({
        type: "error",
        topOffset: 70,
        visibilityTime: 2000,
        text1: "An Error Occured!",
        text2: "Sorry about that. Could you please try again?",
      });
    }
  };

  return (
    <>
      {Platform.OS === "android" && <CloseSheet closeSheet={closeSheet} />}
      <KeyboardAvoidingView
        style={styles.bottomSheetContainer}
        extraScrollHeight={10}
        keyboardShouldPersistTaps="always"
        behavior="height">
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
          Confirm your phone number
        </Text>
        <Text regular style={styles.message}>
          We'll send you an OTP (One Time Password) to confirm your phone
          number.
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
        {buttonActive ? (
          <Button style={{marginTop: 10}} onPress={handleSubmit(onSubmit)}>
            Continue
          </Button>
        ) : (
          <Button style={{marginTop: 10}} disabled>
            Continue
          </Button>
        )}
      </KeyboardAvoidingView>
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
