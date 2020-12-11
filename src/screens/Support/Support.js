import React, {useEffect} from "react";
import {View, ScrollView, StyleSheet, SafeAreaView} from "react-native";
//UI Component
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";
import Link from "../../components/ui/Link";
//Redux
import {connect} from "react-redux";
//FontAwesome icons
import {faComment, faHeart} from "@fortawesome/free-solid-svg-icons";
//Helpers
import initializeFreshchat from "./helpers/initializeFreshchat";
//FreshChat Integration
import {Freshchat} from "react-native-freshchat-sdk";

function Support({user, navigation}) {
  useEffect(() => {
    if (!user.loggedIn) return;
    initializeFreshchat(user);
  }, []);

  const showFreshChat = () => {
    Freshchat.showConversations();
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView>
        <View style={[styles.header, {justifyContent: "center"}]}>
          <Text bold style={styles.screenTitle}>
            Support
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.container}>
        {user.loggedIn ? (
          <Button
            icon={faComment}
            textColor="#437FD9"
            style={{backgroundColor: "#EBF1FF"}}
            onPress={() => {
              showFreshChat();
            }}>
            Talk to Support
          </Button>
        ) : (
          <>
            <Text style={styles.loginMessageTitle}>No Account detected.</Text>
            <Text style={styles.loginMessage}>
              Please Sign In / Register so we could better assist you.
            </Text>
            <Link
              onPress={() => navigation.navigate("Account")}
              style={{marginTop: 5}}>
              Go to Account
            </Link>
          </>
        )}

        {/* <Button style={{marginTop: 10}} secondary icon={faHeart}>
          Rate Blends on Appstore
        </Button> */}
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
  container: {
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
    paddingHorizontal: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 25,
  },
  loginMessage: {
    fontSize: 14,
    marginTop: 3,
  },
  loginMessageTitle: {
    fontSize: 18,
    color: "#C84D49",
  },
});

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, null)(Support);
