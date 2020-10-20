import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Keyboard,
  Dimensions,
  Platform,
} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";
import Link from "../../components/ui/Link";
//Bottom Sheet
import BottomSheet from "reanimated-bottom-sheet";
//Assets
import BlendsLogo from "../../../assets/BlendsLogo.png";
//Redux
import { connect } from "react-redux";
import { confirmUser } from "../../redux/actions/user.action";
//Sheets
import LoginSheet from "./UserActionsSheets/LoginSheet";
import NewAccountSheet from "./UserActionsSheets/NewAccountSheet";
import NewAccountFBSheet from "./UserActionsSheets/NewAccountFBSheet";
import OTPSheet from "./UserActionsSheets/OTPSheet";
//Close Sheet component
import CloseSheet from "./UserActionsSheets/utils/CloseSheet";

// Phone number entry bottom sheet
function SheetsRouter({ closeSheet, confirmUser, setSnap, loginMode }) {
  // Sheet to be shown
  const [sheet, setSheet] = useState("StartSheet");
  const [facebook, setFacebook] = useState(false);
  const [userObject, setUserObject] = useState({
    fullName: "",
    phoneNumber: "",
  });

  // If Login mode
  if (loginMode) {
    setSnap(2);
    return (
      <LoginSheet
        setSheet={setSheet}
        closeSheet={closeSheet}
        confirmUser={confirmUser}
        loginMode
      />
    );
  }

  // Sheets navigation
  if (sheet == "StartSheet") {
    setSnap(1);
    return <StartSheet setSheet={setSheet} closeSheet={closeSheet} />;
  } else if (sheet == "LoginSheet") {
    setSnap(3);
    return (
      <LoginSheet
        setSheet={setSheet}
        closeSheet={closeSheet}
        confirmUser={confirmUser}
      />
    );
  } else if (sheet == "NewAccountSheet") {
    setSnap(5);
    return (
      <NewAccountSheet
        setSheet={setSheet}
        userObject={userObject}
        setUserObject={setUserObject}
        closeSheet={closeSheet}
      />
    );
  } else if (sheet == "NewAccountFBSheet") {
    return (
      <NewAccountFBSheet
        setSheet={setSheet}
        setFacebook={setFacebook}
        closeSheet={closeSheet}
      />
    );
  } else if (sheet == "OTPSheet") {
    setSnap(7);
  }
  return (
    <OTPSheet
      setSheet={setSheet}
      facebook={facebook}
      closeSheet={closeSheet}
      confirmUser={confirmUser}
      fullName={userObject.fullName}
      phoneNumber={userObject.phoneNumber}
      closeSheet={closeSheet}
    />
  );
}

// Start Sheet
function StartSheet({ setSheet, closeSheet }) {
  return (
    <>
      {Platform.OS === "android" && <CloseSheet closeSheet={closeSheet} />}
      <ScrollView style={styles.bottomSheetContainer} extraScrollHeight={10}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={BlendsLogo}
            style={{ width: 80, height: 62 }}
            resizeMode="contain"
          />
          <Link
            onPress={() => {
              setSheet("LoginSheet");
            }}
          >
            Already a User?
          </Link>
        </View>
        <Text bold style={styles.title}>
          Create your Account
        </Text>
        <Text regular style={styles.message}>
          You need to create an account to confirm your order, don't worry it
          won't take minutes!
        </Text>
        <Button
          style={{ marginTop: 20 }}
          onPress={() => {
            setSheet("NewAccountSheet");
          }}
        >
          Continue
        </Button>
        <Button
          style={{ marginTop: 10, backgroundColor: "#3077F2" }}
          icon="facebook"
          onPress={() => setSheet("NewAccountFBSheet")}
        >
          Signup using Facebook
        </Button>
      </ScrollView>
    </>
  );
}

function UserActions({
  closeSheet,
  confirmUser,
  showUserActionsSheet,
  loginMode,
}) {
  const sheetRef = useRef(null);
  const [snap, setSnap] = useState(0);
  // Show / Hide based on showUserActionsSheet prop
  useEffect(() => {
    if (showUserActionsSheet) {
      sheetRef.current.snapTo(snap);
    } else {
      if (Platform.OS === "ios") sheetRef.current.snapTo(0);
    }
  }, [showUserActionsSheet, snap]);

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

  // Each bottom sheet snap has an adjacent index that allows for keyboard movement
  const _keyboardWillShow = () => {
    if (showUserActionsSheet) sheetRef.current.snapTo(snap + 1);
  };

  const _keyboardWillHide = () => {
    if (showUserActionsSheet) sheetRef.current.snapTo(snap);
  };

  return (
    <>
      {Platform.OS === "android" ? (
        showUserActionsSheet && (
          <BottomSheet
            ref={sheetRef}
            snapPoints={[
              0, // Closed
              200, // StartSheet
              700,
              Dimensions.get("window").height - 320, // LoginSheet
              Dimensions.get("window").height - 30, // LoginSheet(Keyboard)
              Dimensions.get("window").height - 250, // NewAccountSheet
              900, // NewAccountSheet(Keyboard)
              450, // OTPSheet
              750, // OTPSheet(Keyboard)
            ]}
            borderRadius={20}
            renderContent={() => {
              return (
                <SheetsRouter
                  closeSheet={closeSheet}
                  confirmUser={confirmUser}
                  setSnap={setSnap}
                  loginMode={loginMode}
                />
              );
            }}
            initialSnap={0}
            enabledGestureInteraction={false}
          />
        )
      ) : (
        <BottomSheet
          ref={sheetRef}
          snapPoints={[
            0, // Closed
            200, // StartSheet
            700,
            Dimensions.get("window").height - 320, // LoginSheet
            Dimensions.get("window").height - 30, // LoginSheet(Keyboard)
            Dimensions.get("window").height - 250, // NewAccountSheet
            900, // NewAccountSheet(Keyboard)
            450, // OTPSheet
            750, // OTPSheet(Keyboard)
          ]}
          borderRadius={20}
          renderContent={() => {
            return (
              <SheetsRouter
                closeSheet={closeSheet}
                confirmUser={confirmUser}
                setSnap={setSnap}
                loginMode={loginMode}
              />
            );
          }}
          initialSnap={0}
          enabledGestureInteraction={false}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: 800,
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
  confirmUser: (fullName, phoneNumber) => {
    dispatch(confirmUser(fullName, phoneNumber));
  },
});

export default connect(null, mapDispatchToProps)(UserActions);
