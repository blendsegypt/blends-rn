import React from "react";
import Button from "./ui/Button";
//FontAwesome Icons
import {faFacebookF} from "@fortawesome/free-brands-svg-icons";
//fb-SDK dependencies
import {LoginManager, AccessToken} from "react-native-fbsdk";

function FacebookLoginButton({
  onLoginFinished,
  onLoginCancelled,
  onLoginError,
}) {
  const handleLogin = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
          if (onLoginCancelled) onLoginCancelled();
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            onLoginFinished(accessToken);
          });
        }
      },
      function (error) {
        if (onLoginError) onLoginError();
      },
    );
  };
  return (
    <Button
      style={{marginTop: 10, backgroundColor: "#3077F2"}}
      icon={faFacebookF}
      onPress={() => handleLogin()}>
      Continue using Facebook
    </Button>
  );
}

export default FacebookLoginButton;
