import React, { useRef, useEffect, useState } from "react";
import { Platform, View, Keyboard } from "react-native";
//Bottom Sheet
import BottomSheet from "@gorhom/bottom-sheet";
//Redux
import { connect } from "react-redux";
import { confirmUser } from "../../redux/actions/user.action";
//Sheets
import StartSheet from "./UserActionsSheets/StartSheet";
import LoginSheet from "./UserActionsSheets/LoginSheet";
import NewAccountSheet from "./UserActionsSheets/NewAccountSheet";
import PhoneNumberSheet from "./UserActionsSheets/PhoneNumberSheet";
import OTPSheet from "./UserActionsSheets/OTPSheet";

// Phone number entry bottom sheet
function SheetsRouter({ closeSheet, confirmUser, setSnap, loginMode }) {
  // Sheet to be shown
  const [sheet, setSheet] = useState("StartSheet");
  const [facebook, setFacebook] = useState(false);
  const [userObject, setUserObject] = useState({
    firstName: "",
    lastName: "",
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
    setSnap(0);
    return <StartSheet setSheet={setSheet} closeSheet={closeSheet} />;
  } else if (sheet == "LoginSheet") {
    //setSnap(2);
    setSnap(3);
    return (
      <LoginSheet
        setSheet={setSheet}
        closeSheet={closeSheet}
        confirmUser={confirmUser}
      />
    );
  } else if (sheet == "NewAccountSheet") {
    setSnap(3);
    return (
      <NewAccountSheet
        setSheet={setSheet}
        userObject={userObject}
        setUserObject={setUserObject}
        closeSheet={closeSheet}
      />
    );
  } else if (sheet == "PhoneNumberSheet") {
    return (
      <PhoneNumberSheet
        setSheet={setSheet}
        setFacebook={setFacebook}
        closeSheet={closeSheet}
        setUserObject={setUserObject}
      />
    );
  } else if (sheet == "OTPSheet") {
    setSnap(0);
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
    if (showUserActionsSheet && Platform.OS === "ios") {
      sheetRef.current.snapTo(snap);
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
    if (showUserActionsSheet) sheetRef.current.expand();
  };

  const _keyboardWillHide = () => {
    if (showUserActionsSheet) sheetRef.current.snapTo(snap);
  };

  // Don't use BottomSheet component at all for Android, since it doesn't register
  // presses from TouchableOpacity on the body of the BottomSheet
  return (
    <View style={{ zIndex: 9999 }}>
      {Platform.OS === "ios" ? (
        <BottomSheet
          ref={sheetRef}
          snapPoints={["55%", "65%", "75%", "85%", "95%"]}
          initialSnapIndex={-1}
          enabled={false}
        >
          <SheetsRouter
            closeSheet={closeSheet}
            confirmUser={confirmUser}
            setSnap={setSnap}
            loginMode={loginMode}
          />
        </BottomSheet>
      ) : (
        <SheetsRouter
          closeSheet={closeSheet}
          confirmUser={confirmUser}
          setSnap={setSnap}
          loginMode={loginMode}
        />
      )}
    </View>
  );
}

const mapDispatchToProps = (dispatch) => ({
  confirmUser: (fullName, phoneNumber) => {
    dispatch(confirmUser(fullName, phoneNumber));
  },
});

export default connect(null, mapDispatchToProps)(UserActions);
