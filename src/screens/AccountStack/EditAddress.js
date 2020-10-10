import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import TextInput from "../../components/ui/TextInput";
import Button from "../../components/ui/Button";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Keyboard Aware ScrollView
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Form validation
import validateField from "../../utils/validateField";
//Redux
import { connect } from "react-redux";
import { addAddress, changeAddress, removeAddress } from "../../redux/actions/user.action";

function EditAddress({ navigation, route, changeAddress, removeAddress, addAddress }) {
  const { address, newAddress } = route.params;
  console.log(navigation);
  // Address Fields state
  const [addressName, setAddressName] = useState({
    text: "Address Name",
    value: "",
    notEmpty: true,
    validated: false,
    errors: [],
  });
  const [addressDesc, setAddressDesc] = useState({
    text: "Address Description",
    value: address.addressDesc,
    notEmpty: true,
    validated: true,
    errors: [],
  });
  const [floor, setFloor] = useState({
    value: address.floor,
  });
  const [apartment, setApartment] = useState({
    value: address.apartment,
  });
  const [deliveryNotes, setDeliveryNotes] = useState({
    value: address.deliveryNotes,
  });
  // Review Order button state
  const [buttonActive, setButtonActive] = useState(false);
  const [formChanged, setFormChanged] = useState(false);

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
      addressName.validated && addressDesc.validated && formChanged;

    if (errorsLength == 0 && fieldsValidated) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [addressName.errors, addressDesc.errors, formChanged]);

  // Save button handler
  const saveAddress = () => {
    const addressObject = {
      userLocation: address.userLocation,
      addressName: address.addressName,
      addressDesc: addressDesc.value,
      floor: floor.value,
      apartment: apartment.value,
      deliveryNotes: deliveryNotes.value,
    };
    if (newAddress) {
      addressObject.addressName = addressName.value;
      addAddress(addressObject);
    } else {
      changeAddress(addressObject.addressName, addressObject);
    }
    if (newAddress) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Account' }, { name: "SavedAddresses" }],
      });
    } else {
      navigation.navigate("SavedAddresses");
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SavedAddresses");
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
            {newAddress ?
              "New Address"
              :
              `Edit Address (${address.addressName})`
            }
          </Text>
          {!newAddress &&
            <TouchableOpacity
              onPress={() => {
                removeAddress(address.addressName);
                navigation.navigate("SavedAddresses");
              }}
              style={{ flex: 0.5, paddingTop: 22, alignItems: "flex-end" }}
            >
              <FontAwesome
                style={styles.headerChevron}
                name="trash"
                size={22}
                color="#ba4b43"
              />
            </TouchableOpacity>
          }
        </View>
      </SafeAreaView>
      <ScrollView style={styles.container}>
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
        {/* Address Data Form */}
        <View>
          <TextInput
            style={[styles.textInput, !newAddress ? { display: "none" } : {}]}
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
              setFormChanged(true);
              setAddressDesc({ ...addressDesc, value: text });
            }}
            onBlur={() => {
              validate(addressDesc, setAddressDesc);
            }}
            defaultValue={addressDesc.value}
          >
            Address Description *
          </TextInput>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={[styles.textInput, { flex: 0.4, marginRight: 10 }]}
              keyboardType="numeric"
              onChangeText={(text) => {
                setFormChanged(true);
                setFloor({ ...floor, value: text });
              }}
              defaultValue={floor.value}
            >
              Floor
            </TextInput>
            <TextInput
              style={[styles.textInput, { flex: 0.6 }]}
              onChangeText={(text) => {
                setFormChanged(true);
                setApartment({ ...apartment, value: text });
              }}
              defaultValue={apartment.value}
            >
              Apartment
            </TextInput>
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              setFormChanged(true);
              setDeliveryNotes({ ...deliveryNotes, value: text });
            }}
            defaultValue={deliveryNotes.value}
          >
            Delivery Notes
          </TextInput>
          {buttonActive ?
            <Button style={{ marginTop: 5 }} icon="check" onPress={() => saveAddress()}>Save</Button>
            :
            <Button disabled style={{ marginTop: 5 }} icon="check">Save</Button>
          }
        </View>
      </ScrollView>
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
  errorMessage: {
    backgroundColor: "#F3E1E1",
    padding: 15,
    marginBottom: 10,
    borderRadius: 20,
  },
});

const mapDispatchToProps = (dispatch) => ({
  addAddress: (address) => {
    dispatch(addAddress(address));
  },
  changeAddress: (addressName, newAddress) => {
    dispatch(changeAddress(addressName, newAddress));
  },
  removeAddress: (addressName) => {
    dispatch(removeAddress(addressName));
  }
});

export default connect(null, mapDispatchToProps)(EditAddress);