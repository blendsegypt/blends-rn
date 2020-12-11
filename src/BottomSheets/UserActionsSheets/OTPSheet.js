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
import Button from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";
import Link from "../../components/ui/Link";
//Assets
import BlendsLogo from "../../../assets/BlendsLogo.png";
//Close Sheet component (Android only)
import Toast from "react-native-toast-message";
import CloseSheet from "./utils/CloseSheet";
import API from "../../utils/axios";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
//react-hook-form
import {useForm, Controller} from "react-hook-form";

export default function OTPSheet({
  setSheet,
  facebook,
  closeSheet,
  fullName,
  phoneNumber,
}) {
  const [buttonActive, setButtonActive] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(null);

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

  // Start Resending counter
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCanResend(true);
    }, 10000);
    setResendTimeout(timeout);
    return () => {
      clearTimeout(resendTimeout);
    };
  }, [canResend]);

  useEffect(() => {
    //Timeout cleanup
    return () => {
      clearTimeout(resendTimeout);
    };
  }, []);

  // Resend OTP
  const resendOTP = async () => {
    try {
      await API.post("app/register/resend/OTP", {
        phone_number: phoneNumber,
      });
      Toast.show({
        type: "success",
        topOffset: 70,
        visibilityTime: 2000,
        text1: "OTP Resent!",
        text2: "A new OTP has been sent to your mobile phone number",
      });
      clearTimeout(resendTimeout);
      setCanResend(false);
    } catch (error) {
      Toast.show({
        type: "error",
        topOffset: 70,
        visibilityTime: 2000,
        text1: "An Error Occured",
        text2: "Sorry about that. Could you please try again?",
      });
    }
  };

  // Confirm OTP
  const onSubmit = async (data) => {
    try {
      await API.post("app/register/verify/otp", {
        phone_number: phoneNumber,
        OTP: data.OTP,
      });
      setSheet("NewAccountSheet");
    } catch (error) {
      Toast.show({
        type: "error",
        topOffset: 70,
        visibilityTime: 2000,
        text1: "Wrong OTP!",
        text2: "Please make sure you entered the right OTP",
      });
    }
  };

  return (
    <>
      {Platform.OS === "android" && <CloseSheet closeSheet={closeSheet} />}
      <ScrollView
        style={styles.bottomSheetContainer}
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
          <Link
            onPress={() => {
              setSheet("PhoneNumberSheet");
            }}>
            Enter different phone number
          </Link>
        </View>
        <Text bold style={styles.title}>
          OTP (One Time Password)
        </Text>
        <Text regular style={styles.message}>
          We've sent an OTP to <Text bold>0112323123</Text> If you didn't
          receive anything on your phone number, please click on Resend
        </Text>
        <View style={{flexDirection: "row", alignContent: "space-between"}}>
          <Controller
            name="OTP"
            rules={{
              required: {value: true, message: "OTP is required"},
              pattern: {value: /^\d+$/, message: "Invalid OTP"},
            }}
            control={control}
            render={({onBlur, onChange, value}) => (
              <TextInput
                error={errors.OTP}
                errorMessage={errors?.OTP?.message}
                onChangeText={(text) => onChange(text)}
                onBlur={onBlur}
                keyboardType="numeric"
                maxLength={4}
                containerStyle={{flex: 0.5}}
                value={value}>
                OTP
              </TextInput>
            )}
          />
          <View style={styles.resendButton}>
            {canResend ? (
              <Button
                secondary
                icon={faEnvelope}
                style={{
                  paddingVertical: 23,
                  marginTop: 7,
                  paddingRight: 15,
                }}
                onPress={resendOTP}>
                Resend
              </Button>
            ) : (
              <Button
                disabled
                icon={faEnvelope}
                style={{paddingVertical: 23, marginTop: 7, paddingRight: 15}}>
                Resend
              </Button>
            )}
          </View>
        </View>
        {buttonActive ? (
          <Button style={{marginTop: 20}} onPress={handleSubmit(onSubmit)}>
            Confirm
          </Button>
        ) : (
          <Button style={{marginTop: 20}} disabled>
            Confirm
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
  resendButton: {
    flex: 0.5,
    marginLeft: 15,
  },
});
