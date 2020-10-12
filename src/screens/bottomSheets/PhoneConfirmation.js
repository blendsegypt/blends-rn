import React, { useRef, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image, Keyboard } from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import TextInput from "../../components/ui/TextInput";
import Button from "../../components/ui/Button";
import Link from "../../components/ui/Link";
//Bottom Sheet
import BottomSheet from "reanimated-bottom-sheet";
//Assets
import BlendsLogo from "../../../assets/BlendsLogo.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Redux
import { connect } from "react-redux";
import { confirmUser } from "../../redux/actions/user.action";

// Phone number entry bottom sheet
function Sheet({ confirmUser, confirmUserRedux }) {
  // Phone number sheet state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
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
    if (phoneNumber.length == 11 && fullName.length > 1) {
      setSendOTPButtonActive(true);
    } else {
      setSendOTPButtonActive(false);
    }
  }, [phoneNumber, fullName]);

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
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Image
            source={BlendsLogo}
            style={{ width: 80, height: 62 }}
            resizeMode="contain"
          />
          <Link
            onPress={() => {
              // Navigate to Login ------------------------- TBC
            }}
          >
            Already a User?
        </Link>
        </View>
        <Text bold style={styles.title}>
          Confirm your Account
        </Text>
        <Text regular style={styles.message}>
          We’ll send you an OTP (one time password) to confirm your phone number
        </Text>
        <TextInput
          onChangeText={(text) => {
            setFullName(text);
          }}
          style={{ marginTop: 15, marginVertical: 7 }}
          defaultValue={fullName}
        >
          Full Name *
        </TextInput>
        <TextInput
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
          keyboardType="numeric"
          maxLength={11}
          style={{ marginVertical: 7 }}
          defaultValue={phoneNumber}
        >
          Phone Number (01XXXXXXXXX) *
        </TextInput>
        {sendOTPButtonActive ? (
          <Button
            style={{ marginTop: 20 }}
            onPress={() => {
              setShowOTP(true);
              startResendCounter();
            }}
          >
            Register
          </Button>
        ) : (
            <>
              <Button style={{ marginTop: 20 }} disabled>
                Register
              </Button>
              <Button style={{ marginTop: 10, backgroundColor: "#3077F2" }} icon="facebook">
                Sign in using Facebook
              </Button>
            </>
          )}
      </ScrollView>
    );
  }

  // Enter OTP Sheet
  return (
    <KeyboardAwareScrollView style={styles.bottomSheetContainer}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Image
          source={BlendsLogo}
          style={{ width: 80, height: 62 }}
          resizeMode="contain"
        />
        <Link
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
            confirmUserRedux(fullName, phoneNumber);
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

function PhoneConfirmation({ confirmUser, confirmUserRedux, showPhoneConfirmation }) {
  const sheetRef = useRef(null);
  // Show / Hide based on showPhoneConfirmation prop
  useEffect(() => {
    if (showPhoneConfirmation) {
      sheetRef.current.snapTo(0);
    } else {
      sheetRef.current.snapTo(2);
    }
  }, [showPhoneConfirmation]);

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
      snapPoints={[600, 750, 0]}
      borderRadius={20}
      renderContent={() => {
        return (
          <Sheet
            confirmUser={confirmUser}
            confirmUserRedux={confirmUserRedux}
          />
        );
      }}
      initialSnap={2}
    />
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: 800,
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
  confirmUserRedux: (fullName, phoneNumber) => {
    dispatch(confirmUser(fullName, phoneNumber));
  },
});

export default connect(null, mapDispatchToProps)(PhoneConfirmation);
