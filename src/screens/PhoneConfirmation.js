import React, { useRef, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image, Keyboard } from "react-native";
//UI Components
import Text from "../components/ui/Text";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import Link from "../components/ui/Link";
//Bottom Sheet
import BottomSheet from "reanimated-bottom-sheet";
//Assets
import BlendsLogo from "../../assets/BlendsLogo.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Redux
import { connect } from "react-redux";
import { confirmPhoneNumber } from "../redux/actions/user.action";

// Phone number entry bottom sheet
function Sheet({ confirmUser, confirmPhoneNumber }) {
  // Phone number sheet state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [sendOTPButtonActive, setSendOTPButtonActive] = useState(false);
  // OTP sheet state
  const [OTP, setOTP] = useState("");
  const [confirmButtonActive, setConfirmButtonActive] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(null);

  // Start Resending counter
  const startResendCounter = () => {
    setCanResend(false);
    const timeout = setTimeout(() => {
      setCanResend(true);
    }, 10000);
    setResendTimeout(timeout);
  };

  // Make button active when phone number is fully entered
  useEffect(() => {
    if (phoneNumber.length == 11) {
      setSendOTPButtonActive(true);
    } else {
      setSendOTPButtonActive(false);
    }
  }, [phoneNumber]);

  // Make button active when OTP is fully entered
  useEffect(() => {
    if (OTP.length == 4) {
      setConfirmButtonActive(true);
    } else {
      setConfirmButtonActive(false);
    }
    //Timeout cleanup
    return () => {
      clearTimeout(resendTimeout);
    };
  }, [OTP]);

  // Phone number not entered yet / Switch to another phone number
  if (!showOTP) {
    return (
      <ScrollView style={styles.bottomSheetContainer} extraScrollHeight={10}>
        <Image
          source={BlendsLogo}
          style={{ width: 80, height: 62 }}
          resizeMode="contain"
        />
        <Text bold style={styles.title}>
          Please enter your phone number
        </Text>
        <Text regular style={styles.message}>
          We’ll send you an OTP (one time password) to confirm your phone number
        </Text>
        <Text style={[styles.message, { paddingTop: 3 }]}>
          If you’re already a user you’ll be redirected to login
        </Text>
        <TextInput
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
          keyboardType="numeric"
          maxLength={11}
        >
          Phone Number (01XXXXXXXXX)
        </TextInput>
        {sendOTPButtonActive ? (
          <Button
            style={{ marginTop: 20 }}
            onPress={() => {
              setShowOTP(true);
              startResendCounter();
            }}
          >
            Sign Up / Login
          </Button>
        ) : (
          <Button style={{ marginTop: 20 }} disabled>
            Sign Up / Login
          </Button>
        )}
      </ScrollView>
    );
  }

  // Enter OTP Sheet
  return (
    <KeyboardAwareScrollView style={styles.bottomSheetContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={BlendsLogo}
          style={{ width: 80, height: 62 }}
          resizeMode="contain"
        />
        <Link
          style={{ marginLeft: 85 }}
          onPress={() => {
            clearTimeout(resendTimeout);
            setShowOTP(false);
            setSendOTPButtonActive(false);
          }}
        >
          Enter different phone number
        </Link>
      </View>
      <Text bold style={styles.title}>
        OTP (One Time Password)
      </Text>
      <Text regular style={styles.message}>
        We've sent an OTP to <Text bold>{phoneNumber}</Text> If you didn't
        receive anything on your phone number, please click on Resend
      </Text>
      <View style={{ flexDirection: "row", alignContent: "space-between" }}>
        <TextInput
          keyboardType="numeric"
          style={{ flex: 0.5 }}
          maxLength={4}
          onChangeText={(text) => {
            setOTP(text);
          }}
        >
          OTP (XXXX)
        </TextInput>
        <View style={styles.resendButton}>
          {canResend ? (
            <Button
              secondary
              icon="envelope"
              style={{ paddingVertical: 23, marginTop: 7, paddingRight: 15 }}
              onPress={() => {
                startResendCounter();
              }}
            >
              Resend
            </Button>
          ) : (
            <Button
              disabled
              icon="envelope"
              style={{ paddingVertical: 23, marginTop: 7, paddingRight: 15 }}
            >
              Resend
            </Button>
          )}
        </View>
      </View>
      {confirmButtonActive ? (
        <Button
          style={{ marginTop: 20 }}
          onPress={() => {
            confirmPhoneNumber(phoneNumber);
            confirmUser();
          }}
        >
          Confirm
        </Button>
      ) : (
        <Button style={{ marginTop: 20 }} disabled>
          Confirm
        </Button>
      )}
    </KeyboardAwareScrollView>
  );
}

function PhoneConfirmation({ confirmUser, confirmPhoneNumber }) {
  const sheetRef = useRef(null);
  // Once mounted scroll up the bottom sheet
  useEffect(() => {
    sheetRef.current.snapTo(0);
  }, []);

  // Scroll bottom sheet up when keyboard is triggered
  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", _keyboardWillHide);
    // Cleanup
    return () => {
      Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
    };
  });

  const _keyboardWillShow = () => {
    sheetRef.current.snapTo(1);
  };

  const _keyboardWillHide = () => {
    sheetRef.current.snapTo(0);
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[450, 750, 0]}
      borderRadius={20}
      renderContent={() => {
        return (
          <Sheet
            confirmUser={confirmUser}
            confirmPhoneNumber={confirmPhoneNumber}
          />
        );
      }}
      initialSnap={2}
    />
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: 750,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 25,
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
  textInputError: {
    borderWidth: 1,
    borderColor: "#eda1a1",
  },
  resendButton: {
    flex: 0.5,
    marginLeft: 15,
  },
});

const mapDispatchToProps = (dispatch) => ({
  confirmPhoneNumber: (phoneNumber) => {
    dispatch(confirmPhoneNumber(phoneNumber));
  },
});

export default connect(null, mapDispatchToProps)(PhoneConfirmation);
