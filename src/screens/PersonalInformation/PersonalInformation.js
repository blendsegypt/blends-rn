import React, {useState, useEffect} from "react";
import {
  ScrollView,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import TextInput from "../../components/ui/TextInput";
import Button from "../../components/ui/Button";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft, faCheck} from "@fortawesome/free-solid-svg-icons";
//Toast messages
import Toast from "react-native-toast-message";
//Redux
import {connect} from "react-redux";
import {updatePersonalInfo} from "../../redux/actions/user.action";
//react-hook-form
import {useForm, Controller} from "react-hook-form";
//helpers
import updateUserInfo from "./helpers/updateUserInfo";
//Email regex
const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function PersonalInformation({
  navigation,
  firstName,
  lastName,
  phoneNumber,
  email,
  updatePersonalInfo,
}) {
  //forms configuration
  const {handleSubmit, control, errors, formState, setValue} = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: firstName,
      last_name: lastName,
      email: email || "",
    },
  });
  //button active/disabled state
  const [canSave, setCanSave] = useState(false);

  //check if form is touched & validated
  useEffect(() => {
    if (formState.isDirty && Object.keys(errors).length === 0) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [formState]);

  const onSubmit = async (data) => {
    try {
      await updateUserInfo(data);
      updatePersonalInfo({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email || "",
      });
      navigation.navigate("Account");
      Toast.show({
        type: "success",
        visibilityTime: 2000,
        topOffset: 70,
        text1: "Updated!",
        text2: "Your personal details has been updated.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        visibilityTime: 2000,
        topOffset: 70,
        text1: "Error!",
        text2: "An Error Occured! Please try again.",
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Account");
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
            Personal Information
          </Text>
        </View>
      </SafeAreaView>
      {/* Personal Information Form */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 150}}
        keyboardShouldPersistTaps="handled">
        {/* First/Last Name */}
        <View style={{flexDirection: "row"}}>
          <Controller
            name="first_name"
            rules={{
              required: {value: true, message: "First Name is required"},
              pattern: {value: /^[A-Za-z]+$/, message: "Invalid First Name"},
            }}
            control={control}
            render={({onBlur, onChange, value}) => (
              <TextInput
                error={errors.first_name}
                errorMessage={errors?.first_name?.message}
                onChangeText={(text) => onChange(text)}
                onBlur={onBlur}
                value={value}
                containerStyle={{marginLeft: 25, marginRight: 10, flex: 0.5}}>
                First Name
              </TextInput>
            )}
          />
          <Controller
            name="last_name"
            rules={{
              required: {value: true, message: "Last Name is required"},
              pattern: {value: /^[A-Za-z]+$/, message: "Invalid Last Name"},
            }}
            control={control}
            render={({onBlur, onChange, value}) => (
              <TextInput
                error={errors.last_name}
                errorMessage={errors?.last_name?.message}
                onChangeText={(text) => onChange(text)}
                onBlur={onBlur}
                value={value}
                defaultValue=""
                containerStyle={{marginRight: 25, flex: 0.5}}>
                Last Name
              </TextInput>
            )}
          />
        </View>
        {/* Phone Number */}
        <TextInput
          editable={false}
          keyboardType="numeric"
          defaultValue={String(phoneNumber)}
          maxLength={11}
          containerStyle={{marginHorizontal: 25}}>
          Phone Number
        </TextInput>
        {/* Email */}
        <Controller
          name="email"
          rules={{
            validate: {
              email: (value) =>
                value === "" ||
                (value.match(EMAIL_REGEX) && value !== "") ||
                "Invalid Email",
            },
          }}
          control={control}
          render={({onBlur, onChange, value}) => (
            <TextInput
              error={errors.email}
              errorMessage={errors?.email?.message}
              onChangeText={(text) => onChange(text)}
              onBlur={onBlur}
              value={value}
              defaultValue=""
              containerStyle={{marginHorizontal: 25}}>
              Email
            </TextInput>
          )}
        />
        {/* Password */}
        {/* <TextInput
          secureTextEntry
          onChangeText={(text) => {}}
          containerStyle={{marginHorizontal: 25}}>
          Password
        </TextInput> */}
        {/* Password Confirmation */}
        {/* <TextInput
          secureTextEntry
          onChangeText={(text) => {}}
          onBlur={() => {}}
          containerStyle={{marginHorizontal: 25}}>
          Password Confirmation
        </TextInput> */}
        {/* Save Button */}
        <View style={{marginHorizontal: 25}}>
          {canSave ? (
            <Button
              icon={faCheck}
              style={{marginTop: 10}}
              onPress={handleSubmit(onSubmit)}>
              Save
            </Button>
          ) : (
            <Button disabled icon={faCheck} style={{marginTop: 10}}>
              Save
            </Button>
          )}
        </View>
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

const mapStateToProps = (state) => ({
  firstName: state.userReducer.firstName,
  lastName: state.userReducer.lastName,
  phoneNumber: state.userReducer.phoneNumber,
  email: state.userReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  updatePersonalInfo: (personalInfo) => {
    dispatch(updatePersonalInfo(personalInfo));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalInformation);
