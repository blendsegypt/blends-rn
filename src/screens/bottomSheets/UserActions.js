import React, { useRef, useEffect, useState } from "react";
import { Platform, View } from "react-native";
//Bottom Sheet
import BottomSheet from "@gorhom/bottom-sheet";
//Redux
import { connect } from "react-redux";
import { confirmUser } from "../../redux/actions/user.action";
//Sheets
import StartSheet from "./UserActionsSheets/StartSheet";
import LoginSheet from "./UserActionsSheets/LoginSheet";
import NewAccountSheet from "./UserActionsSheets/NewAccountSheet";
import NewAccountFBSheet from "./UserActionsSheets/NewAccountFBSheet";
import OTPSheet from "./UserActionsSheets/OTPSheet";
//test
import Text from "../../components/ui/Text";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    setSnap(0);
    return <StartSheet setSheet={setSheet} closeSheet={closeSheet} />;
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
    setSnap(3);
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
