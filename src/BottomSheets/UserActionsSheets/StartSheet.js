import React from "react";
import {View, ScrollView, Image, StyleSheet, Platform} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import Link from "../../components/ui/Link";
import Button from "../../components/ui/Button";
//Assets
import BlendsLogo from "../../../assets/BlendsLogo.png";
//Field Validation
import CloseSheet from "./utils/CloseSheet";
//Facebook Login
import FacebookLoginButton from "../../components/FacebookLoginButton";
import Toast from "react-native-toast-message";

export default function StartSheet({setSheet, closeSheet}) {
  return (
    <>
      {Platform.OS === "android" && <CloseSheet closeSheet={closeSheet} />}
      <ScrollView
        style={styles.bottomSheetContainer}
        contentContainerStyle={{paddingBottom: 300}}>
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
              setSheet("LoginSheet");
            }}>
            Already a User?
          </Link>
        </View>
        <Text bold style={styles.title}>
          Create your Account
        </Text>
        <Text regular style={styles.message}>
          We'll need some information from you to complete your orders, don't
          worry it won't take minutes!
        </Text>
        <Button
          style={{marginTop: 20}}
          onPress={() => {
            setSheet("PhoneNumberSheet");
          }}>
          Continue
        </Button>
        <FacebookLoginButton
          onLoginCancelled={() => {
            Toast.show({
              type: "error",
              visibilityTime: 2000,
              topOffset: 70,
              text1: "Facebook Login Cancelled",
              text2:
                "You've cancelled our request to use your Facebook account for login",
            });
          }}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    marginTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 25,
    zIndex: 99,
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
  errorMessage: {
    backgroundColor: "#F3E1E1",
    padding: 15,
    marginVertical: 10,
    borderRadius: 20,
  },
});
