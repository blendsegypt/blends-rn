import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
//Assets
import InviteAFriendIllustration from "../../../assets/InviteAFriendIllustration.png";
//Redux
import {connect} from "react-redux";
//Toast messages
import Toast from "react-native-toast-message";

function InviteAFriend({navigation, referralCode}) {
  const copyCodeToClipboard = () => {
    //use clipboard package to copy
    Toast.show({
      type: "success",
      topOffset: 50,
      visibilityTime: 2000,
      text1: "Copied to Clipboard!",
      text2: "Your referral code is now saved in your clipboard",
    });
  };
  return (
    <View style={{flex: 1}}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Account");
            }}
            style={{flex: 0.5, paddingTop: 25}}>
            <FontAwesomeIcon
              style={styles.headerChevron}
              icon={faChevronLeft}
              size={22}
              color="#11203E"
            />
          </TouchableOpacity>
          <Text bold style={styles.screenTitle}>
            Invite a Friend
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView
        style={styles.invitation}
        contentContainerStyle={{paddingBottom: 150}}>
        <Image
          source={InviteAFriendIllustration}
          style={{width: 272, height: 265, alignSelf: "center"}}
        />
        <Text style={styles.invitationMessage} bold>
          Invite your friends and get 20 EGP to use in Blends!
        </Text>
        <View style={styles.steps}>
          {/* Step 1 */}
          <View style={styles.step}>
            <View>
              <View style={styles.stepCircle}>
                <Text style={{color: "#bababa"}}>1</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{paddingLeft: 10, flexShrink: 1}}
              onPress={copyCodeToClipboard}>
              <Text>
                Click here to copy your code{" "}
                <Text style={{color: "#CE4C4C"}}>{referralCode}</Text>
              </Text>
            </TouchableOpacity>
          </View>
          {/* Step 2 */}
          <View style={styles.step}>
            <View>
              <View style={styles.stepCircle}>
                <Text style={{color: "#bababa"}}>2</Text>
              </View>
            </View>
            <Text
              style={{
                paddingLeft: 10,
                color: "#11203E",
                fontSize: 15,
                flexShrink: 1,
              }}>
              Ask your friends to use the code while creating their account
            </Text>
          </View>
          {/* Step 3 */}
          <View style={styles.step}>
            <View>
              <View style={styles.stepCircle}>
                <Text style={{color: "#bababa"}}>3</Text>
              </View>
            </View>
            <Text
              style={{
                paddingLeft: 10,
                color: "#11203E",
                fontSize: 15,
                flexShrink: 1,
              }}>
              Both of you get instant credit in your wallet that you can use in
              Blends!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
  invitation: {
    paddingTop: 50,
  },
  invitationMessage: {
    paddingHorizontal: 30,
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
    lineHeight: 25,
    color: "#C84D49",
  },
  steps: {
    paddingHorizontal: 45,
  },
  step: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
  },
  stepCircle: {
    backgroundColor: "#FCFCFC",
    padding: 20,
    paddingHorizontal: 25,
    borderRadius: 100,
  },
});

const mapStateToProps = (state) => ({
  referralCode: state.userReducer.referralCode,
});

export default connect(mapStateToProps, null)(InviteAFriend);
