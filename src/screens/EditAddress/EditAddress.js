import React from "react";
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
//Toast Messages
import Toast from "react-native-toast-message";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
//Keyboard Aware ScrollView
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
//Redux
import {connect} from "react-redux";
import {
  addAddress,
  changeAddress,
  removeAddress,
} from "../../redux/actions/user.action";
//react-hook-form
import {useForm, Controller} from "react-hook-form";
//Helpers
import updateAddress from "./helpers/updateAddress";
//Axios instance
import API from "../../utils/axios";

function EditAddress({
  navigation,
  route,
  changeAddress,
  removeAddress,
  addAddress,
  addresses,
}) {
  const {address, newAddress} = route.params;
  //form configuration
  const {handleSubmit, control, errors} = useForm({
    mode: "onBlur",
    defaultValues: {
      nickname: address.nickname || "",
      street: address.street,
      details: address.details || "",
      building: address.building || "",
      floor: address.floor || "",
      flat: address.flat || "",
      driver_notes: address.driver_notes || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const updatedAddress = Object.assign(address, data);
      if (!newAddress) {
        // Updating already existing address
        const addressID = updatedAddress.id;
        await updateAddress(addressID, updatedAddress);
        changeAddress(address.nickname, updatedAddress);
        Toast.show({
          type: "success",
          visibilityTime: 2000,
          topOffset: 70,
          text1: "Updated!",
          text2: `${address.nickname} has been updated.`,
        });
        navigation.navigate("SavedAddresses");
      } else {
        // Adding new address
        updatedAddress.coordinates = JSON.stringify(updatedAddress.coordinates);
        updatedAddress.area_id = address.Area.id;
        const response = await API.post("user/addresses", updatedAddress);
        updatedAddress.id = response.data.data.id;
        addAddress(updatedAddress);
        navigation.reset({
          index: 0,
          routes: [{name: "Account"}, {name: "SavedAddresses"}],
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        topOffset: 50,
        visibilityTime: 2000,
        text1: "An Error Occured",
        text2: "Something went wrong! Please try again.",
      });
    }
  };

  const onDelete = async () => {
    try {
      let onlyOneAddress = false;
      await API.delete(`user/addresses/${address.id}`);
      if (addresses.length === 1) {
        onlyOneAddress = true;
      }
      removeAddress(address.nickname);
      if (onlyOneAddress) {
        navigation.reset({
          index: 0,
          routes: [{name: "Home"}, {name: "ChooseLocation"}],
        });
        return;
      }
      navigation.navigate("SavedAddresses");
    } catch (error) {
      Toast.show({
        type: "error",
        topOffset: 50,
        visibilityTime: 2000,
        text1: "An Error Occured",
        text2: "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SavedAddresses");
            }}
            style={{flex: 0.5, paddingTop: 25}}>
            <FontAwesomeIcon
              style={styles.headerChevron}
              icon={faChevronLeft}
              size={22}
              color="#11203E"
            />
          </TouchableOpacity>
          <Text bold style={styles.screenTitle}>
            {newAddress ? "New Address" : `Edit Address (${address.nickname})`}
          </Text>
          {!newAddress && (
            <TouchableOpacity
              onPress={() => {
                onDelete();
              }}
              style={{flex: 0.5, paddingTop: 22, alignItems: "flex-end"}}>
              <FontAwesomeIcon
                style={styles.headerChevron}
                icon={faTrash}
                size={18}
                color="#ba4b43"
              />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
      <ScrollView style={styles.container}>
        {/* Address Data Form */}
        <View>
          {newAddress && (
            <Controller
              name="nickname"
              rules={{
                required: {
                  value: true,
                  message: "Nickname is required",
                },
              }}
              control={control}
              render={({onBlur, onChange, value}) => (
                <TextInput
                  error={errors.nickname}
                  errorMessage={errors?.nickname?.message}
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  containerStyle={{flex: 0.5}}
                  value={value}>
                  Nickname *
                </TextInput>
              )}
            />
          )}
          <View>
            <TextInput
              editable={false}
              defaultValue={address.governate}
              containerStyle={[styles.textInput, {flex: 0.6}]}>
              Governate
            </TextInput>
          </View>
          <View style={{flexDirection: "row"}}>
            <View style={{flex: 0.5, marginRight: 10}}>
              <TextInput
                editable={false}
                defaultValue={address.Area.name}
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
          <View>
            <Button
              style={{marginTop: 5}}
              icon={faCheck}
              onPress={handleSubmit(onSubmit)}>
              Save
            </Button>
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
  changeAddress: (nickname, newAddress) => {
    dispatch(changeAddress(nickname, newAddress));
  },
  removeAddress: (nickname) => {
    dispatch(removeAddress(nickname));
  },
});

const mapStateToProps = (state) => ({
  addresses: state.userReducer.addresses,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);
