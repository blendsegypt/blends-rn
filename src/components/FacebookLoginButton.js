import React from "react";
import Button from "./ui/Button";
//FontAwesome Icons
import {faFacebookF} from "@fortawesome/free-brands-svg-icons";
//fb-SDK dependencies
import {LoginManager, AccessToken} from "react-native-fbsdk";
//Axios instance
import API from "../utils/axios";

function FacebookLoginButton({
  setFacebookLoading,
  onLoginFinished,
  onLoginCancelled,
  onLoginError,
}) {
  const checkIfUser = async (accessToken) => {
    try {
      const response = await API.post("auth/facebook", {
        fbToken: accessToken,
      });
      const user = Object.assign({}, response.data.data);
      const addresses = user.addresses;
      delete user.addresses;
      // Extract access/refresh tokens
      const access_token = response.headers["access-token"];
      const refresh_token = response.headers["refresh-token"];
      onLoginFinished(null, user, addresses, {access_token, refresh_token});
    } catch (error) {
      if (error.response.status === 404) {
        onLoginFinished(accessToken);
        return;
      }
      onLoginError();
    }
  };
  const handleLogin = () => {
    setFacebookLoading(true);
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
          if (onLoginCancelled) onLoginCancelled();
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            checkIfUser(accessToken);
          });
        }
        setFacebookLoading(false);
      },
      function (error) {
        if (onLoginError) onLoginError();
        setFacebookLoading(false);
      },
    );
  };
  return (
    <Button
      style={{marginTop: 10, backgroundColor: "#3077F2"}}
      icon={faFacebookF}
      onPress={() => handleLogin()}>
      Login using Facebook
    </Button>
  );
}

export default FacebookLoginButton;
