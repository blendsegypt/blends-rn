import React, {useState, useEffect} from "react";
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
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
//Components
import CheckoutProgress from "../components/CheckoutProgress";
//Redux
import {connect} from "react-redux";
import {addAddress} from "../redux/actions/user.action";
//Keyboard Aware ScrollView
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
//Form validation
import validateField from "../utils/validateField";

/*


  1- Grab Area from google to a locked field
  2- new structure:
    - Address Nickname
    - Area (locked)
    - Address Details (optional)
    - Street (editable) (mandatory)
    - Building (mandatory)
    - Floor (optional)
    - Flat (optional)
    - delivery notes (optional)

    + formatted street shouldn't include apartment
    + hide country and governate
    + restrict search in egypt in more restrictive way

*/

function AddressDetails({navigation, userLocation, addAddress}) {
  const [addressNickname, setAddressNickname] = useState({
    text: "Address Nickname",
    value: "",
    notEmpty: true,
    validated: false,
    errors: [],
  });
  const [street, setStreet] = useState({
    text: "Street",
    value: userLocation.street,
    notEmpty: true,
    validated: true,
    errors: [],
  });
  const [addressDetails, setAddressDetails] = useState({
    value: "",
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
    const errorsLength = [...addressNickname.errors, ...street.errors].length;
    const fieldsValidated = addressNickname.validated && street.validated;

    if (errorsLength == 0 && fieldsValidated) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [addressNickname.errors, street.errors]);

  // Review order button handler
  const reviewOrder = () => {
    const formattedAddress = `${userLocation.governate} - ${street.value}, ${userLocation.area}`;
    const address = {
      governate: userLocation.governate,
      area: userLocation.area,
      formattedAddress: formattedAddress,
      addressNickname: addressNickname.value,
      street: street.value,
      addressDetails: addressDetails.value,
      floor: floor.value,
      apartment: apartment.value,
      deliveryNotes: deliveryNotes.value,
    };
    addAddress(address);
    navigation.navigate("ReviewOrder", {threeStepsCheckout: true});
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1}}>
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Cart");
              }}
              style={{flex: 0.5, paddingTop: 25}}>
              <FontAwesomeIcon icon={faChevronLeft} size={22} color="#11203E" />
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
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingBottom: 100}}>
          <Text style={styles.containerTitle}>Address Details</Text>
          <View style={{marginTop: 15}}>
            {/* Error Messages */}
            {[...addressNickname.errors, ...street.errors].map(
              (error, index) => {
                return (
                  <View style={styles.errorMessage} key={index}>
                    <Text regular style={{color: "#b55b5b"}}>
                      {error.message}
                    </Text>
                  </View>
                );
              },
            )}
            {/* Address Form */}
            <View>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  setAddressNickname({...addressNickname, value: text});
                }}
                onBlur={() => {
                  validate(addressNickname, setAddressNickname);
                }}
                autoCapitalize="words">
                Address Nickname (eg. Home/Work) *
              </TextInput>
              <View>
                <TextInput
                  editable={false}
                  defaultValue={userLocation.governate}
                  style={[styles.textInput, {flex: 0.6}]}>
                  Governate
                </TextInput>
              </View>
              <View style={{flexDirection: "row"}}>
                <View style={{flex: 0.5, marginRight: 10}}>
                  <TextInput
                    editable={false}
                    defaultValue={userLocation.area}
                    style={[styles.textInput]}>
                    Area
                  </TextInput>
                </View>
                <TextInput
                  defaultValue={userLocation.street}
                  style={[styles.textInput, {flex: 0.5}]}
                  onChangeText={(text) => {
                    setStreet({...street, value: text});
                  }}
                  onBlur={() => {
                    validate(street, setStreet);
                  }}>
                  Street
                </TextInput>
              </View>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  setAddressDetails({...addressDetails, value: text});
                }}>
                Address Details
              </TextInput>
              <View style={{flexDirection: "row"}}>
                <TextInput
                  style={[styles.textInput, {flex: 0.4, marginRight: 10}]}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setFloor({...floor, value: text});
                  }}>
                  Floor
                </TextInput>
                <TextInput
                  style={[styles.textInput, {flex: 0.6}]}
                  onChangeText={(text) => {
                    setApartment({...apartment, value: text});
                  }}>
                  Apartment
                </TextInput>
              </View>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  setDeliveryNotes({...deliveryNotes, value: text});
                }}>
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
          }}>
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
