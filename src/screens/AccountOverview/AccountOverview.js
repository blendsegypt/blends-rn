import React, {useState, useCallback} from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
//UI Components
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";
//Toast Messages
import Toast from "react-native-toast-message";
//Redux
import {connect} from "react-redux";
import {logout} from "../../redux/actions/auth.action";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faChevronRight,
  faMapMarkerAlt,
  faGift,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
//Bottom Sheets
import UserActions from "../../BottomSheets/UserActions";
import BottomSheetOverlay from "../../components/BottomSheetOverlay";
//Helpers
import logoutUser from "./helpers/logoutUser";
import getWallet from "./helpers/getWallet";

function Account({navigation, firstName, lastName, loggedIn, wallet, logout}) {
  const [showUserActionsSheet, setShowUserActionsSheet] = useState(false);
  const [walletValue, setWalletValue] = useState(wallet);

  const closeSheet = () => {
    setShowUserActionsSheet(false);
    // use setTimeout to show bottom sheet snap animation then navigate to Home screen
    setTimeout(() => {
      navigation.navigate("Home");
    }, 200);
  };

  const updateWallet = async () => {
    const walletFromAPI = await getWallet();
    setWalletValue(walletFromAPI);
  };

  // Check if user is logged in when focusing the Account screen
  useFocusEffect(
    useCallback(() => {
      if (!loggedIn) {
        // Hide tab bar
        navigation.dangerouslyGetParent().setOptions({tabBarVisible: false});
        // fix for bottom sheet, add setShowUserActionsSheet in async queue
        setTimeout(() => {
          setShowUserActionsSheet(true);
        }, 10);
      } else {
        // Show tab bar
        navigation.dangerouslyGetParent().setOptions({tabBarVisible: true});
        setShowUserActionsSheet(false);
        // Update wallet
        updateWallet();
      }
    }, [loggedIn]),
  );

  // Logout user
  const handleLogout = async () => {
    try {
      logoutUser(logout);
      navigation.navigate("ChooseLocation");
    } catch (error) {
      Toast.show({
        type: "error",
        topOffset: 50,
        visibilityTime: 2000,
        text1: "An Error Occured",
        text2: "Something wrong while logging out! Please try again.",
      });
    }
  };

  return (
    <>
      {showUserActionsSheet && (
        <BottomSheetOverlay setShowBottomSheet={(state) => closeSheet()} />
      )}
      <View style={{flex: 1}}>
        <SafeAreaView>
          <View style={[styles.header, {justifyContent: "center"}]}>
            <Text bold style={styles.screenTitle}>
              Account
            </Text>
          </View>
        </SafeAreaView>
        <ScrollView style={styles.accountContainer}>
          {/* Personal Data (Name and Balance) */}
          <View style={styles.personalInformatoin}>
            <View
              style={{flexDirection: "row", flex: 0.5, alignItems: "center"}}>
              <FontAwesomeIcon icon={faUser} size={17} color="#C84D49" />
              <Text style={{color: "#C84D49", fontSize: 17, paddingLeft: 8}}>
                {loggedIn ? firstName + " " + lastName : "Guest"}
              </Text>
            </View>
            {/* If guest then no balance */}
            <View style={{flex: 0.5}}>
              {loggedIn && (
                <Text
                  regular
                  style={{color: "#C84D49", fontSize: 17, textAlign: "right"}}>
                  Balance: <Text bold>{walletValue} EGP</Text>
                </Text>
              )}
            </View>
          </View>
          {/* Settings List (only users) */}
          {loggedIn && (
            <>
              <View style={styles.settingsContainer}>
                {/* Personal Information */}
                <TouchableOpacity
                  style={styles.setting}
                  onPress={() => {
                    navigation.navigate("PersonalInformation");
                  }}>
                  <FontAwesomeIcon
                    icon={faUser}
                    size={22}
                    color="#11203E"
                    style={{flex: 0.07}}
                  />
                  <Text style={{fontSize: 16, paddingLeft: 10, flex: 0.95}}>
                    Personal Information
                  </Text>
                  <View style={{flex: 0.05}}>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      size={17}
                      color="#B7B7B7"
                      style={{
                        alignSelf: "flex-end",
                        textAlign: "right",
                      }}
                    />
                  </View>
                </TouchableOpacity>
                {/* Saved Addresses */}
                <TouchableOpacity
                  style={styles.setting}
                  onPress={() => {
                    navigation.navigate("SavedAddresses");
                  }}>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    size={22}
                    color="#11203E"
                    style={{flex: 0.07}}
                  />
                  <Text style={{fontSize: 16, paddingLeft: 10, flex: 0.95}}>
                    Saved Addresses
                  </Text>
                  <View style={{flex: 0.05}}>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      size={17}
                      color="#B7B7B7"
                      style={{
                        alignSelf: "flex-end",
                        textAlign: "right",
                      }}
                    />
                  </View>
                </TouchableOpacity>
                {/* Invite a friend */}
                <TouchableOpacity
                  style={[styles.setting, {borderBottomWidth: 0}]}
                  onPress={() => {
                    navigation.navigate("InviteAFriend");
                  }}>
                  <FontAwesomeIcon
                    icon={faGift}
                    size={22}
                    color="#11203E"
                    style={{flex: 0.07}}
                  />
                  <Text style={{fontSize: 16, paddingLeft: 10, flex: 0.95}}>
                    Invite a friend
                  </Text>
                  <View style={{flex: 0.05}}>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      size={17}
                      color="#B7B7B7"
                      style={{
                        alignSelf: "flex-end",
                        textAlign: "right",
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <Button
                style={{
                  marginTop: 15,
                  backgroundColor: "#A46B6B",
                  marginHorizontal: 25,
                }}
                onPress={handleLogout}
                icon={faPowerOff}>
                Logout
              </Button>
            </>
          )}
        </ScrollView>
      </View>
      {showUserActionsSheet && (
        <UserActions
          showUserActionsSheet={showUserActionsSheet}
          closeSheet={closeSheet}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 25,
    marginTop: 10,
    flexDirection: "row",
  },
  screenTitle: {
    fontSize: 25,
    paddingTop: 20,
  },
  accountContainer: {
    marginTop: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15.65,
    elevation: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  personalInformatoin: {
    backgroundColor: "#FFF1F0",
    padding: 25,
    borderRadius: 20,
    marginTop: 25,
    flexDirection: "row",
    marginHorizontal: 25,
  },
  settingsContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15.65,
    elevation: 8,
    borderRadius: 25,
    marginTop: 20,
  },
  setting: {
    flexDirection: "row",
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  guestsButtons: {
    paddingHorizontal: 25,
    marginTop: 15,
  },
  overlay: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.8,
    zIndex: 99,
  },
});

const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn,
  firstName: state.userReducer.firstName,
  lastName: state.userReducer.lastName,
  wallet: state.userReducer.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
