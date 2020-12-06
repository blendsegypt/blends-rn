import React, {useState, useEffect} from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import TextInput from "../../components/ui/TextInput";
import Button from "../../components/ui/Button";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
//Components
import CheckoutProgress from "../../components/CheckoutProgress";
//Redux
import {connect} from "react-redux";
import {addAddress} from "../../redux/actions/user.action";
//Keyboard Aware ScrollView
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
//react-hook-form
import {useForm, Controller} from "react-hook-form";
//Axios instance
import API from "../../utils/axios";

function AddressDetails({navigation, location, userID, addAddress}) {
  //form configuration
  const {handleSubmit, control, errors} = useForm({
    mode: "onBlur",
    defaultValues: {
      nickname: "",
      street: location.street,
      details: "",
      building: "",
      floor: "",
      flat: "",
      driver_notes: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const address = {
        ...data,
        ...location,
      };
      address.coordinates = JSON.stringify(address.coordinates);
      address.coordinates = address.coordinates.substring(
        1,
        address.coordinates.length - 1,
      );
      address.area_id = location.Area.id;
      address.user_id = userID;
      // Add address
      const newAddress = await API.post("app/user/addresses", address);
      address.id = newAddress.data.data.id;
      addAddress(address);
      navigation.navigate("ReviewOrder", {threeStepsCheckout: true});
    } catch (error) {
      console.log(error.response);
      console.log(error);
    }
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
        {/* Address Details Form */}
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingBottom: 100}}>
          <Text style={styles.containerTitle}>Address Details</Text>
          <View style={{marginTop: 15}}>
            <View>
              <Controller
                name="nickname"
                rules={{
                  required: {
                    value: true,
                    message: "Address Nickname is required",
                  },
                  maxLength: {
                    value: 15,
                    message: "Address Nickname cannot exceed 15 characters",
                  },
                }}
                control={control}
                render={({onBlur, onChange, value}) => (
                  <TextInput
                    error={errors.nickname}
                    errorMessage={errors?.nickname?.message}
                    onChangeText={(text) => onChange(text)}
                    onBlur={onBlur}
                    value={value}>
                    Address Nickname (eg. Home/Work) *
                  </TextInput>
                )}
              />
              <View>
                <TextInput
                  editable={false}
                  defaultValue={location.governate}
                  containerStyle={[styles.textInput, {flex: 0.6}]}>
                  Governate
                </TextInput>
              </View>
              <View style={{flexDirection: "row"}}>
                <View style={{flex: 0.5, marginRight: 10}}>
                  <TextInput
                    editable={false}
                    defaultValue={location.Area.name}
                    containerStyle={[styles.textInput]}>
                    Area
                  </TextInput>
                </View>
                <Controller
                  name="street"
                  rules={{
                    required: {
                      value: true,
                      message: "Street is required",
                    },
                  }}
                  control={control}
                  render={({onBlur, onChange, value}) => (
                    <TextInput
                      error={errors.street}
                      errorMessage={errors?.street?.message}
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      containerStyle={{flex: 0.5}}
                      value={value}>
                      Street *
                    </TextInput>
                  )}
                />
              </View>
              <Controller
                name="details"
                rules={{
                  required: {
                    value: true,
                    message: "Address Details is required",
                  },
                }}
                control={control}
                render={({onBlur, onChange, value}) => (
                  <TextInput
                    error={errors.details}
                    errorMessage={errors?.details?.message}
                    onChangeText={(text) => onChange(text)}
                    onBlur={onBlur}
                    containerStyle={{flex: 0.5}}
                    value={value}>
                    Address Details (description) *
                  </TextInput>
                )}
              />
              <View style={{flexDirection: "row"}}>
                <Controller
                  name="floor"
                  control={control}
                  render={({onBlur, onChange, value}) => (
                    <TextInput
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      containerStyle={{flex: 0.333, marginRight: 10}}
                      value={value}>
                      Floor
                    </TextInput>
                  )}
                />
                <Controller
                  name="building"
                  control={control}
                  render={({onBlur, onChange, value}) => (
                    <TextInput
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      containerStyle={{flex: 0.333, marginRight: 10}}
                      value={value}>
                      Building
                    </TextInput>
                  )}
                />
                <Controller
                  name="flat"
                  control={control}
                  render={({onBlur, onChange, value}) => (
                    <TextInput
                      onChangeText={(text) => onChange(text)}
                      onBlur={onBlur}
                      containerStyle={{flex: 0.333}}
                      value={value}>
                      Flat
                    </TextInput>
                  )}
                />
              </View>
              <Controller
                name="driver_notes"
                control={control}
                render={({onBlur, onChange, value}) => (
                  <TextInput
                    onChangeText={(text) => onChange(text)}
                    onBlur={onBlur}
                    value={value}>
                    Delivery notes (eg. beside police station)
                  </TextInput>
                )}
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 25,
            backgroundColor: "#fff",
            paddingBottom: 25,
          }}>
          <Button onPress={handleSubmit(onSubmit)}>Review Order</Button>
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
  errorMessage: {
    backgroundColor: "#F3E1E1",
    padding: 15,
    marginBottom: 10,
    borderRadius: 20,
  },
});

const mapStateToProps = (state) => ({
  location: state.userReducer.location,
  userID: state.userReducer.id,
});

const mapDispatchToProps = (dispatch) => ({
  addAddress: (address) => {
    dispatch(addAddress(address));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetails);
