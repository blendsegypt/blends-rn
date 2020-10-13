import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Keyboard,
  TouchableOpacity,
  Dimensions,
} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import TextInput from "../../components/ui/TextInput";
import Button from "../../components/ui/Button";
import Link from "../../components/ui/Link";
//Bottom Sheet
import BottomSheet from "reanimated-bottom-sheet";
//Assets
import BlendsLogo from "../../../assets/BlendsLogo.png";
//Redux
import { connect } from "react-redux";
import { confirmUser } from "../../redux/actions/user.action";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Sheets
import LoginSheet from "./UserActionsSheets/LoginSheet";
import NewAccountSheet from "./UserActionsSheets/NewAccountSheet";
import NewAccountFBSheet from "./UserActionsSheets/NewAccountFBSheet";
import OTPSheet from "./UserActionsSheets/OTPSheet";

// Phone number entry bottom sheet
function SheetsRouter({ closeSheet, confirmUser, setSnap }) {
  // Sheet to be shown
  const [sheet, setSheet] = useState("StartSheet");
  const [facebook, setFacebook] = useState(false);
  const [userObject, setUserObject] = useState({
    fullName: "Khalid Khalil",
    phoneNumber: "01149050646",
  });

  // Sheets navigation
  if (sheet == "StartSheet") {
    setSnap(1);
    return <StartSheet setSheet={setSheet} />;
  } else if (sheet == "LoginSheet") {
    setSnap(2);
    return (
      <LoginSheet
        setSheet={setSheet}
        closeSheet={closeSheet}
        confirmUser={confirmUser}
      />
    );
  } else if (sheet == "NewAccountSheet") {
    setSnap(4);
    return (
      <NewAccountSheet
        setSheet={setSheet}
        userObject={userObject}
        setUserObject={setUserObject}
      />
    );
  } else if (sheet == "NewAccountFBSheet") {
    return <NewAccountFBSheet setSheet={setSheet} setFacebook={setFacebook} />;
  } else if (sheet == "OTPSheet") {
    setSnap(6);
  }
  return (
    <OTPSheet
      setSheet={setSheet}
      facebook={facebook}
      closeSheet={closeSheet}
      confirmUser={confirmUser}
      fullName={userObject.fullName}
      phoneNumber={userObject.phoneNumber}
    />
  );
}

// Start Sheet
function StartSheet({ setSheet }) {
  return (
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
  );
}

function UserActions({ closeSheet, confirmUser, showPhoneConfirmation }) {
  const sheetRef = useRef(null);
  const [snap, setSnap] = useState(0);
  // Show / Hide based on showPhoneConfirmation prop
  useEffect(() => {
    if (showPhoneConfirmation) {
      sheetRef.current.snapTo(snap);
    } else {
      console.log("close sheet");
      sheetRef.current.snapTo(0);
    }
  }, [showPhoneConfirmation, snap]);

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
    if (showPhoneConfirmation) sheetRef.current.snapTo(snap + 1);
  };

  const _keyboardWillHide = () => {
    if (showPhoneConfirmation) sheetRef.current.snapTo(snap);
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[
        0, // Closed
        430, // StartSheet
        Dimensions.get("window").height - 320, // LoginSheet
        Dimensions.get("window").height - 90, // LoginSheet(Keyboard)
        Dimensions.get("window").height - 250, // NewAccountSheet
        850, // NewAccountSheet(Keyboard)
        450, // OTPSheet
        650, // OTPSheet(Keyboard)
      ]}
      borderRadius={20}
      renderContent={() => {
        return (
          <SheetsRouter
            closeSheet={closeSheet}
            confirmUser={confirmUser}
            setSnap={setSnap}
          />
        );
      }}
      initialSnap={0}
      enabledGestureInteraction={false}
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
