import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
//UI Components
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";
//Redux
import { connect } from "react-redux";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";

function Account({ navigation, fullName }) {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={[styles.header, { justifyContent: "center" }]}>
          <Text bold style={styles.screenTitle}>
            Account
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.accountContainer}>
        {/* Personal Data (Name and Balance) */}
        <View style={styles.personalInformatoin}>
          <View style={{ flexDirection: "row", flex: 0.5 }}>
            <FontAwesome name="user" size={17} color="#C84D49" />
            <Text style={{ color: "#C84D49", fontSize: 17, paddingLeft: 8 }}>
              {fullName}
            </Text>
          </View>
          <View style={{ flex: 0.5 }}>
            <Text
              regular
              style={{ color: "#C84D49", fontSize: 17, textAlign: "right" }}
            >
              Balance: <Text bold>0 EGP</Text>
            </Text>
          </View>
        </View>
        {/* Settings List */}
        <View style={styles.settingsContainer}>
          {/* Personal Information */}
          <TouchableOpacity style={styles.setting} onPress={() => { navigation.navigate("PersonalInformation"); }}>
            <FontAwesome
              name="user"
              size={22}
              color="#11203E"
              style={{ flex: 0.07 }}
            />
            <Text style={{ fontSize: 16, paddingLeft: 10, flex: 0.83 }}>
              Personal Information
            </Text>
            <FontAwesome
              name="chevron-right"
              size={17}
              color="#B7B7B7"
              style={{ flex: 0.1, textAlign: "right" }}
            />
          </TouchableOpacity>
          {/* Saved Addresses */}
          <TouchableOpacity style={styles.setting} onPress={() => { navigation.navigate("SavedAddresses"); }}>
            <FontAwesome
              name="map-marker"
              size={22}
              color="#11203E"
              style={{ flex: 0.07 }}
            />
            <Text style={{ fontSize: 16, paddingLeft: 10, flex: 0.83 }}>
              Saved Addresses
            </Text>
            <FontAwesome
              name="chevron-right"
              size={17}
              color="#B7B7B7"
              style={{ flex: 0.1, textAlign: "right" }}
            />
          </TouchableOpacity>
          {/* Invite a friend */}
          <TouchableOpacity style={styles.setting} onPress={() => { navigation.navigate("InviteAFriend"); }}>
            <FontAwesome
              name="gift"
              size={22}
              color="#11203E"
              style={{ flex: 0.07 }}
            />
            <Text style={{ fontSize: 16, paddingLeft: 10, flex: 0.83 }}>
              Invite a friend
            </Text>
            <FontAwesome
              name="chevron-right"
              size={17}
              color="#B7B7B7"
              style={{ flex: 0.1, textAlign: "right" }}
            />
          </TouchableOpacity>
        </View>
        <Button
          style={{ marginTop: 15, backgroundColor: "#A46B6B" }}
          icon="power-off"
        >
          Logout
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
    paddingHorizontal: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  personalInformatoin: {
    backgroundColor: "#FFF1F0",
    padding: 25,
    borderRadius: 20,
    marginTop: 25,
    flexDirection: "row",
  },
  settingsContainer: {
    backgroundColor: "#fff",
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
});

const mapStateToProps = (state) => ({
  fullName: state.userReducer.savedAddresses[0].fullName,
});

export default connect(mapStateToProps, null)(Account);
