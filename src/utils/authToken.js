/*

  authToken
  - Saves access/refresh token in mobile keychain using 'react-native-keychain'
  - Retrived access/refresh tokens from keychain

*/

import Keychain from 'react-native-keychain';

export const setAccessToken = (value) => {
  Keychain.setGenericPassword('access-token', value, {
    service: 'access-token',
  });
};

export const setRefreshToken = (value) => {
  Keychain.setGenericPassword('refresh-token', value, {
    service: 'refresh-token',
  });
};

export const getAccessToken = async () => {
  const value = await Keychain.getGenericPassword('access-token');
  if (value) {
    return value.password;
  }
};

export const getRefreshToken = async () => {
  const value = await Keychain.getGenericPassword('refresh-token');
  if (value) {
    return value.password;
  }
};

export const removeAccessToken = () => {
  Keychain.resetGenericPassword({service: 'access-token'});
};

export const removeRefreshToken = () => {
  Keychain.resetGenericPassword({service: 'refresh-token'});
};
