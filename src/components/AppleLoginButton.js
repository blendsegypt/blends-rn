import React from "react";
import Button from "./ui/Button";
//FontAwesome Icons
import {faApple} from "@fortawesome/free-brands-svg-icons";
//Login by Apple dependencies
import {appleAuth} from "@invertase/react-native-apple-authentication";
//Axios instance
import API from "../utils/axios";

function AppleLoginButton({
  setLoading,
  onLoginFinished,
  onLoginCancelled,
  onLoginError,
}) {
  const checkIfUser = async (
    uid,
    firstName,
    lastName,
    email,
    nonce,
    identityToken,
  ) => {
    try {
      const response = await API.post("auth/apple", {
        uid,
      });
      const user = Object.assign({}, response.data.data);
      const addresses = user.addresses;
      delete user.addresses;
      // Extract access/refresh tokens
      const access_token = response.headers["access-token"];
      const refresh_token = response.headers["refresh-token"];
      onLoginFinished(null, user, addresses, {access_token, refresh_token});
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.status === 404) {
        const appleData = {
          uid,
          firstName,
          lastName,
          email,
          nonce,
          identityToken,
        };
        onLoginFinished(appleData);
        return;
      }
      onLoginError();
    }
  };
  const handleLogin = async () => {
    setLoading(true);
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const {
        email,
        fullName,
        identityToken,
        nonce,
        user,
      } = appleAuthRequestResponse;

      const {givenName, familyName} = fullName;

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        checkIfUser(user, givenName, familyName, email, nonce, identityToken);
      } else {
        setLoading(false);
        onLoginError();
      }
    } catch (error) {
      setLoading(false);
      if (error.code === appleAuth.Error.CANCELED) {
        onLoginCancelled();
      } else {
        onLoginError();
      }
    }
  };
  return (
    <Button
      style={{marginTop: 10, backgroundColor: "#000"}}
      icon={faApple}
      onPress={() => handleLogin()}>
      Sign In with Apple
    </Button>
  );
}

export default AppleLoginButton;
