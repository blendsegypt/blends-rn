import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
import {
  addAddress,
  changeAddress,
  removeAddress,
} from "../../redux/actions/user.action";

function EditAddress({
  navigation,
  route,
  changeAddress,
  removeAddress,
  addAddress,
}) {
  const { address, newAddress } = route.params;
  const [addressNickname, setAddressNickname] = useState({
    text: "Address Nickname",
    value: "",
    notEmpty: true,
    validated: false,
    errors: [],
  });
  const [street, setStreet] = useState({
    text: "Street",
    value: address.street,
    notEmpty: true,
    validated: true,
    errors: [],
  });
  const [addressDetails, setAddressDetails] = useState({
    value: address.addressDetails,
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
    const errorsLength = [...street.errors].length;
    const fieldsValidated = street.validated && formChanged;

    if (errorsLength == 0 && fieldsValidated) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [street.validated, formChanged]);

  // Save button handler
  const saveAddress = () => {
    const formattedAddress = `${address.governate} - ${street.value}, ${address.area}`;
    const addressObject = {
      governate: address.governate,
      area: address.area,
      formattedAddress: formattedAddress,
      addressNickname: address.addressNickname,
      street: street.value,
      addressDetails: addressDetails.value,
      floor: floor.value,
      apartment: apartment.value,
      deliveryNotes: deliveryNotes.value,
    };
    if (newAddress) {
      addressObject.addressNickname = addressNickname.value;
      addAddress(addressObject);
    } else {
      changeAddress(address.addressNickname, addressObject);
    }
    if (newAddress) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Account" }, { name: "SavedAddresses" }],
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
            {newAddress
              ? "New Address"
              : `Edit Address (${address.addressNickname})`}
          </Text>
          {!newAddress && (
            <TouchableOpacity
              onPress={() => {
                removeAddress(address.addressNickname);
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
          )}
        </View>
      </SafeAreaView>
      <ScrollView style={styles.container}>
        {/* Error Messages */}
        {[...street.errors].map((error, index) => {
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
              setAddressNickname({ ...addressNickname, value: text });
            }}
            onBlur={() => {
              validate(addressNickname, setAddressNickname);
            }}
          >
            Address Name (eg. Home / Work) *
          </TextInput>
          <View>
            <TextInput
              editable={false}
              defaultValue={address.governate}
              style={[styles.textInput, { flex: 0.6 }]}
            >
              Governate
            </TextInput>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.5, marginRight: 10 }}>
              <TextInput
                editable={false}
                defaultValue={address.area}
                style={[styles.textInput]}
              >
                Area
              </TextInput>
            </View>
            <TextInput
              defaultValue={address.street}
              style={[styles.textInput, { flex: 0.5 }]}
              onChangeText={(text) => {
                setFormChanged(true);
                setStreet({ ...street, value: text });
              }}
              onBlur={() => {
                validate(street, setStreet);
              }}
            >
              Street
            </TextInput>
          </View>
          <TextInput
            onChangeText={(text) => {
              setFormChanged(true);
              setAddressDetails({ ...addressDetails, value: text });
            }}
            defaultValue={addressDetails.value}
          >
            Address Details
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
            onChangeText={(text) => {
              setFormChanged(true);
              setDeliveryNotes({ ...deliveryNotes, value: text });
            }}
            defaultValue={deliveryNotes.value}
          >
            Delivery Notes
          </TextInput>
          <View>
            {buttonActive ? (
              <Button
                style={{ marginTop: 5 }}
                icon="check"
                onPress={() => saveAddress()}
              >
                Save
              </Button>
            ) : (
              <Button disabled style={{ marginTop: 5 }} icon="check">
                Save
              </Button>
            )}
          </View>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 25,
    paddingHorizontal: 25,
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
  changeAddress: (addressNickname, newAddress) => {
    dispatch(changeAddress(addressNickname, newAddress));
  },
  removeAddress: (addressNickname) => {
    dispatch(removeAddress(addressNickname));
  },
});

export default connect(null, mapDispatchToProps)(EditAddress);
