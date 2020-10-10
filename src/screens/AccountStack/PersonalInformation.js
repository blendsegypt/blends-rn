import React from "react";
import { ScrollView, View, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import TextInput from "../../components/ui/TextInput";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Redux
import { connect } from "react-redux";

function PersonalInformation({ navigation, fullName, phoneNumber }) {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Account");
            }}
            style={{ flex: 0.5, paddingTop: 25 }}
          >
            <FontAwesome
              style={styles.headerChevron}
              name="chevron-left"
              size={22}
              color="#11203E"
            />
          </TouchableOpacity>
          <Text bold style={styles.screenTitle}>
            Personal Information
          </Text>
        </View>
      </SafeAreaView>
      {/* Personal Information Form */}
      <ScrollView style={styles.container}>
        {/* Full Name */}
        <TextInput defaultValue={fullName} style={{ marginVertical: 7 }}></TextInput>
        {/* Phone Number */}
        <TextInput defaultValue={phoneNumber} style={{ marginVertical: 7 }}></TextInput>
        {/* Email */}
        <TextInput style={{ marginVertical: 7 }}>Email</TextInput>
        {/* Password */}
        <TextInput style={{ marginVertical: 7 }}>Password</TextInput>
        {/* Password Confirmation */}
        <TextInput style={{ marginVertical: 7 }}>Password Confirmation</TextInput>
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
  }
});

const mapStateToProps = (state) => ({
  fullName: state.userReducer.fullName,
  phoneNumber: state.userReducer.phoneNumber,
})

export default connect(mapStateToProps, null)(PersonalInformation);
