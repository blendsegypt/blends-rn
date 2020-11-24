/*
 *
 *  User Redux Actions
 *
 */

export const addLocation = (location) => ({
  type: "ADD_LOCATION",
  location,
});

export const removeLocation = () => ({
  type: "REMOVE_LOCATION",
});

export const setUser = (user) => ({
  type: "SET_USER",
  user,
});

export const setAddresses = (addresses) => ({
  type: "SET_ADDRESSES",
  addresses,
});

export const addAddress = (address) => ({
  type: "ADD_ADDRESS",
  address,
});

export const removeAddress = (addressNickname) => ({
  type: "REMOVE_ADDRESS",
  addressNickname,
});

export const changeAddress = (addressNickname, newAddress) => ({
  type: "CHANGE_ADDRESS",
  addressNickname,
  newAddress,
});

export const switchActiveAddress = (addressNickname) => ({
  type: "SWITCH_ACTIVE_ADDRESS",
  addressNickname,
});

export const updatePersonalInfo = (personalInfo) => ({
  type: "UPDATE_PERSONAL_INFO",
  personalInfo,
});
