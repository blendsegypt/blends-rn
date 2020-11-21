/*

  authToken
  - Saves access/refresh token in mobile keychain using 'react-native-keychain'
  - Retrived access/refresh tokens from keychain

*/

import Keychain from "react-native-keychain";

// key can be either "refreshToken" / "accessToken"
export const setToken = (key, value) => {
  Keychain.setGenericPassword(key, value, { service: key });
};

export const getToken = async (key) => {
  const value = await Keychain.getGenericPassword(key);
  if (value) {
    return value.password;
  }
};

export const removeToken = (key) => {
  Keychain.resetGenericPassword({ service: key });
};
