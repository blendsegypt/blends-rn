import React, { useState, useEffect } from "react";
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
import Button from "../components/ui/Button";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Components
import CheckoutProgress from "../components/CheckoutProgress";
//Redux
import { connect } from "react-redux";
import { addAddress } from "../redux/actions/user.action";
//Keyboard Aware ScrollView
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Form validation
import validateField from "../utils/validateField";

function AddressDetails({ navigation, userLocation, addAddress }) {
  // Address Fields state ------------------------------------------------ To be transfered to phoneConfirmation bottom sheet
  // const [fullName, setFullName] = useState({
  //   text: "Full Name",
  //   value: "",
  //   notEmpty: true,
  //   regex: /^[a-zA-Z\s]*$/,
  //   regexErrorMessage: "Full Name can only contain letters",
  //   validated: false,
  //   errors: [],
  // });
  const [addressName, setAddressName] = useState({
    text: "Address Name",
    value: "",
    notEmpty: true,
    validated: false,
    errors: [],
  });
  const [addressDesc, setAddressDesc] = useState({
    text: "Address Description",
    value: "",
    notEmpty: true,
    validated: false,
    errors: [],
  });
  const [floor, setFloor] = useState({
    value: "",
  });
  const [apartment, setApartment] = useState({
    value: "",
  });
  const [deliveryNotes, setDeliveryNotes] = useState({
    value: "",
  });
  // Review Order button state
  const [buttonActive, setButtonActive] = useState(false);

  // Validate fields using validate.js from utils folder
  const validate = (field, fieldSetter) => {
    // Validate field
    const fieldAfterValidation = validateField(field);
    // Use the supplied setter to set the validated field
    fieldSetter(fieldAfterValidation);
  };

  // Check if there's no errors, activate the continue button
  useEffect(() => {
    const errorsLength = [
      ...addressName.errors,
      ...addressDesc.errors,
    ].length;
    const fieldsValidated =
      addressName.validated && addressDesc.validated;

    if (errorsLength == 0 && fieldsValidated) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [addressName.errors, addressDesc.errors]);

  // Review order button handler
  const reviewOrder = () => {
    const address = {
      userLocation,
      addressName: addressName.value,
      addressDesc: addressDesc.value,
      floor: floor.value,
      apartment: apartment.value,
      deliveryNotes: deliveryNotes.value,
    };
    addAddress(address);
    navigation.navigate("ReviewOrder", { threeStepsCheckout: true });
  };

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
            {/* Error Messages */}
            {[
              ...addressName.errors,
              ...addressDesc.errors,
            ].map((error, index) => {
              return (
                <View style={styles.errorMessage} key={index}>
                  <Text regular style={{ color: "#b55b5b" }}>
                    {error.message}
                  </Text>
                </View>
              );
            })}
            {/* Address Form */}
            <View>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  setAddressName({ ...addressName, value: text });
                }}
                onBlur={() => {
                  validate(addressName, setAddressName);
                }}
              >
                Address Name (eg. Home / Work) *
              </TextInput>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  setAddressDesc({ ...addressDesc, value: text });
                }}
                onBlur={() => {
                  validate(addressDesc, setAddressDesc);
                }}
              >
                Address Description *
              </TextInput>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={[styles.textInput, { flex: 0.4, marginRight: 10 }]}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setFloor({ ...floor, value: text });
                  }}
                >
                  Floor
                </TextInput>
                <TextInput
                  style={[styles.textInput, { flex: 0.6 }]}
                  onChangeText={(text) => {
                    setApartment({ ...apartment, value: text });
                  }}
                >
                  Apartment
                </TextInput>
              </View>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  setDeliveryNotes({ ...deliveryNotes, value: text });
                }}
              >
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
          {buttonActive ? (
            <Button onPress={() => reviewOrder()}>Review Order</Button>
          ) : (
              <Button disabled>Review Order</Button>
            )}
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
  errorMessage: {
    backgroundColor: "#F3E1E1",
    padding: 15,
    marginBottom: 10,
    borderRadius: 20,
  },
});

const mapStateToProps = (state) => ({
  userLocation: state.userReducer.location,
});

const mapDispatchToProps = (dispatch) => ({
  addAddress: (address) => {
    dispatch(addAddress(address));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetails);
