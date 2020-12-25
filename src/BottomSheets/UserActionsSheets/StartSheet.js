import React, {useState} from "react";
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
//Apple Login
import AppleLoginButton from "../../components/AppleLoginButton";
import Toast from "react-native-toast-message";
// Spinner overlay
import Spinner from "react-native-loading-spinner-overlay";
//Redux
import {connect} from "react-redux";
import {login} from "../../redux/actions/auth.action";

function StartSheet({
  setSheet,
  closeSheet,
  setFacebookToken,
  setFacebook,
  setApple,
  setAppleData,
  login,
}) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {Platform.OS === "android" && <CloseSheet closeSheet={closeSheet} />}
      <ScrollView
        style={styles.bottomSheetContainer}
        contentContainerStyle={{paddingBottom: 300}}>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{color: "white"}}
          animation="fade"
          overlayColor="rgba(0, 0, 0, 0.7)"
        />
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
        {Platform.OS === "ios" && (
          <AppleLoginButton
            setLoading={setLoading}
            onLoginFinished={async (appleData, user, addresses, tokens) => {
              // New User
              if (appleData) {
                setApple(true);
                setAppleData(appleData);
                setSheet("PhoneNumberSheet");
                return;
              }
              // Existing User
              const access_token = tokens.access_token;
              const refresh_token = tokens.refresh_token;
              await login(user, access_token, refresh_token, addresses);
              Toast.show({
                type: "success",
                visibilityTime: 2000,
                topOffset: 50,
                text1: `Hello, ${user.first_name}.`,
                text2: "It's time for some fresh coffee!",
              });
              closeSheet();
            }}
            onLoginError={() => {
              Toast.show({
                type: "error",
                visibilityTime: 3000,
                topOffset: 70,
                text1: "Apple Login Error",
                text2:
                  "Please try again, if the issue persist please use normal registeration",
              });
            }}
            onLoginCancelled={() => {
              Toast.show({
                type: "error",
                visibilityTime: 3000,
                topOffset: 70,
                text1: "Facebook Login Cancelled",
                text2:
                  "You've cancelled our request to use your Facebook account for login",
              });
            }}
          />
        )}
        <FacebookLoginButton
          setLoading={setLoading}
          onLoginError={() => {
            Toast.show({
              type: "error",
              visibilityTime: 3000,
              topOffset: 70,
              text1: "Facebook Login Error",
              text2:
                "Please try again, if the issue persist please use normal registeration",
            });
          }}
          onLoginFinished={async (accessToken, user, addresses, tokens) => {
            // New User
            if (accessToken) {
              setFacebook(true);
              setFacebookToken(accessToken);
              setSheet("PhoneNumberSheet");
              return;
            }
            // Existing User
            const access_token = tokens.access_token;
            const refresh_token = tokens.refresh_token;
            await login(user, access_token, refresh_token, addresses);
            Toast.show({
              type: "success",
              visibilityTime: 2000,
              topOffset: 50,
              text1: `Hello, ${user.first_name}.`,
              text2: "It's time for some fresh coffee!",
            });
            closeSheet();
          }}
          onLoginCancelled={() => {
            Toast.show({
              type: "error",
              visibilityTime: 3000,
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

const mapDispatchToProps = (dispatch) => ({
  login: (user, accessToken, refreshToken, addresses) => {
    dispatch(login(user, accessToken, refreshToken, addresses));
  },
});

export default connect(null, mapDispatchToProps)(StartSheet);
