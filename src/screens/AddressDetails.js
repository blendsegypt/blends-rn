import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
//UI Components
import Text from "../components/ui/Text";
import TextInput from "../components/ui/TextInput";
import Link from "../components/ui/Link";
import Button from "../components/ui/Button";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Components
import CheckoutProgress from "../components/CheckoutProgress";
//Redux
import { connect } from "react-redux";
//Keyboard Aware ScrollView
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function AddressDetails({ navigation, userLocation }) {
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Cart");
              }}
              style={{ flex: 0.5, paddingTop: 25 }}
            >
              <FontAwesome name="chevron-left" size={22} color="#11203E" />
            </TouchableOpacity>
            <Text bold style={styles.screenTitle}>
              Address Details
            </Text>
          </View>
        </SafeAreaView>
        <CheckoutProgress
          steps={[
            {
              label: "Cart",
              active: true,
            },
            {
              label: "Address Details",
              active: true,
            },
            {
              label: "Confirm",
              active: false,
            },
          ]}
        />
        <ScrollView style={styles.container}>
          <Text style={styles.containerTitle}>Address Details</Text>
          <View>
            {/* User Location */}
            <View
              style={{
                flexDirection: "row",
                alignIt: "center",
                marginVertical: 5,
              }}
            >
              <Text style={styles.location}>
                {userLocation.region} - {userLocation.city} -{" "}
                {userLocation.street}
              </Text>
            </View>
            {/* Address Form */}
            <View>
              <TextInput style={styles.textInput}>Full Name</TextInput>
              <TextInput style={styles.textInput}>
                Address Name (eg. Home / Work)
              </TextInput>
              <TextInput style={styles.textInput}>
                Address Description
              </TextInput>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={[styles.textInput, { flex: 0.4, marginRight: 10 }]}
                >
                  Floor
                </TextInput>
                <TextInput style={[styles.textInput, { flex: 0.6 }]}>
                  Apartment
                </TextInput>
              </View>
              <TextInput style={styles.textInput}>
                Delivery Notes (eg. beside police station)
              </TextInput>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 25,
            backgroundColor: "#fff",
            paddingBottom: 25,
          }}
        >
          <Button>Review Order</Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
    paddingTop: 30,
  },
  containerTitle: {
    color: "#C84D49",
    fontSize: 16,
  },
  location: {
    fontSize: 16,
    paddingLeft: 10,
    lineHeight: 23,
    marginVertical: 10,
  },
  textInput: {
    marginVertical: 7,
  },
});

const mapStateToProps = (state) => ({
  userLocation: state.userReducer.location,
});

export default connect(mapStateToProps, null)(AddressDetails);
