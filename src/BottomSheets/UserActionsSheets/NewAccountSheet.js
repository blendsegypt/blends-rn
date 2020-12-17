import React, {useState, useEffect} from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";
//Assets
import BlendsLogo from "../../../assets/BlendsLogo.png";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
//Close Sheet component
import CloseSheet from "./utils/CloseSheet";
// Redux
import {login} from "../../redux/actions/auth.action";
import {connect} from "react-redux";
// Toast message
import Toast from "react-native-toast-message";
// Axios
import API from "../../utils/axios";
//react-hook-form
import {useForm, Controller} from "react-hook-form";

function NewAccountSheet({setSheet, userObject, closeSheet, login}) {
  const [referralCode, setReferralCode] = useState("");
  const [buttonActive, setButtonActive] = useState(false);
  //forms configuration
  const {handleSubmit, control, errors, formState, watch} = useForm({
    mode: "onChange",
  });

  //activate button if form is valid
  useEffect(() => {
    if (formState.isValid) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [formState]);

  const onSubmit = async (data) => {
    try {
      const user = {
        ...data,
        phone_number: userObject.phoneNumber,
        platform: Platform.OS === "ios" ? "ios" : "android",
      };
      if (referralCode !== "") {
        user.referring_user_code = referralCode;
      }
      const response = await API.post("register/finish", user);
      // Extract user object
      const newUser = Object.assign({}, response.data.data);
      delete newUser.addresses;
      // Extract access/refresh tokens
      const accessToken = response.headers["access-token"];
      const refreshToken = response.headers["refresh-token"];
      login(newUser, accessToken, refreshToken, []);
      closeSheet();
    } catch (error) {
      Toast.show({
        type: "error",
        topOffset: 50,
        visibilityTime: 2000,
        text1: "Error Occured",
        text2: "Something wrong happened on our side! Please try again.",
      });
    }
  };

  return (
    <>
      {Platform.OS === "android" && <CloseSheet closeSheet={closeSheet} />}
      <ScrollView
        style={styles.bottomSheetContainer}
        contentContainerStyle={{paddingBottom: 350}}
        keyboardShouldPersistTaps="always">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <TouchableOpacity
            onPress={() => {
              setSheet("StartSheet");
            }}
            style={{padding: 15, paddingLeft: 0}}>
            <FontAwesomeIcon icon={faChevronLeft} size={22} color="#11203E" />
          </TouchableOpacity>
          <Image
            source={BlendsLogo}
            style={{width: 80, height: 62}}
            resizeMode="contain"
          />
        </View>
        <Text bold style={styles.title}>
          Almost there!
        </Text>
        <Text regular style={styles.message}>
          Complete the following fields and your account will be ready to go.
        </Text>
        <View style={{display: "flex", flexDirection: "row", marginTop: 7}}>
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
                containerStyle={{flex: 0.5, marginRight: 5}}>
                First Name *
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
                containerStyle={{flex: 0.5, marginLeft: 5}}>
                Last Name *
              </TextInput>
            )}
          />
        </View>
        <View>
          <TextInput value={userObject.phoneNumber} editable={false}>
            Phone Number *
          </TextInput>
        </View>
        <Controller
          name="password"
          rules={{
            required: {value: true, message: "Password is required"},
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
              message:
                "Password must be 8 characters or longer, contains atleast a letter and a number.",
            },
          }}
          control={control}
          render={({onBlur, onChange, value}) => (
            <TextInput
              error={errors.password}
              errorMessage={errors?.password?.message}
              onChangeText={(text) => onChange(text)}
              onBlur={onBlur}
              secureTextEntry
              value={value}>
              Password *
            </TextInput>
          )}
        />
        <Controller
          name="password_confirmation"
          rules={{
            required: {
              value: true,
              message: "Password Confirmation is required",
            },
            validate: {
              matchesPassword: (value) =>
                value === watch("password") ||
                "Password Confirmation doesn't match password",
            },
          }}
          control={control}
          render={({onBlur, onChange, value}) => (
            <TextInput
              error={errors.password_confirmation}
              errorMessage={errors?.password_confirmation?.message}
              onChangeText={(text) => onChange(text)}
              onBlur={onBlur}
              secureTextEntry
              value={value}>
              Password Confirmation *
            </TextInput>
          )}
        />
        <TextInput
          style={{marginVertical: 7}}
          onChangeText={(text) => {
            setReferralCode(text);
          }}>
          Referral Code (optional)
        </TextInput>
        {buttonActive ? (
          <Button style={{marginTop: 10}} onPress={handleSubmit(onSubmit)}>
            Continue
          </Button>
        ) : (
          <Button style={{marginTop: 10}} disabled>
            Continue
          </Button>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: Dimensions.get("window").height,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 25,
    marginTop: Platform.OS === "android" ? 25 : 0,
  },
  title: {
    fontSize: 19,
    paddingTop: 25,
    color: "#11203E",
  },
  message: {
    paddingTop: 7,
    fontSize: 15,
    color: "#8A8A8A",
    lineHeight: 23,
  },
  errorMessage: {
    backgroundColor: "#F3E1E1",
    padding: 15,
    marginVertical: 5,
    borderRadius: 20,
  },
});

const mapDispatchToProps = (dispatch) => ({
  login: (user, accessToken, refreshToken, addresses) =>
    dispatch(login(user, accessToken, refreshToken, addresses)),
});

export default connect(null, mapDispatchToProps)(NewAccountSheet);
