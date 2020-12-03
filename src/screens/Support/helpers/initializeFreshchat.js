/*

  Initialize Freshchat chat support 3rd party
  

*/

//FreshChat Integration
import {
  Freshchat,
  FreshchatConfig,
  FreshchatUser,
} from "react-native-freshchat-sdk";

export default function initializeFreshchat(user) {
  // Setup FreshChat
  const freshchatConfig = new FreshchatConfig(
    "eeded093-e396-4fa5-8302-85223c8725c6",
    "af17ee52-db85-484b-853f-c650fdd023c5",
  );
  freshchatConfig.domain = "msdk.eu.freshchat.com";
  Freshchat.init(freshchatConfig);
  const freshchatUser = new FreshchatUser();
  freshchatUser.firstName = user.firstName;
  freshchatUser.phoneCountryCode = "+2";
  freshchatUser.phone = String(user.phoneNumber);
  Freshchat.setUser(freshchatUser, (error) => {
    console.log(error);
  });
}
