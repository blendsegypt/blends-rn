import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
//UI Component
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";
//Redux
import { connect } from "react-redux";
//FreshChat Integration
import {
  Freshchat,
  FreshchatConfig,
  FreshchatUser,
  ConversationOptions,
} from "react-native-freshchat-sdk";

function Support({ user }) {
  useEffect(() => {
    // Setup FreshChat
    const freshchatConfig = new FreshchatConfig(
      "eeded093-e396-4fa5-8302-85223c8725c6",
      "af17ee52-db85-484b-853f-c650fdd023c5"
    );
    freshchatConfig.domain = "msdk.eu.freshchat.com";
    Freshchat.init(freshchatConfig);
    const freshchatUser = new FreshchatUser();
    // Split fullName to first name
    const firstName = user.fullName.split(" ")[0];
    freshchatUser.firstName = firstName;
    freshchatUser.phoneCountryCode = "+2";
    freshchatUser.phone = user.phoneNumber;
    Freshchat.setUser(freshchatUser, (error) => {
      console.log(error);
    });
  }, []);

  const showFreshChat = () => {
    Freshchat.showConversations();
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={[styles.header, { justifyContent: "center" }]}>
          <Text bold style={styles.screenTitle}>
            Support
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.container}>
        <Button
          icon="commenting"
          textColor="#437FD9"
          style={{ backgroundColor: "#EBF1FF" }}
          onPress={() => {
            showFreshChat();
          }}
        >
          Talk to Support
        </Button>
        <Button style={{ marginTop: 10 }} secondary icon="heart">
          Rate Blends on Appstore
        </Button>
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
});

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, null)(Support);
