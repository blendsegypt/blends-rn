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

export const removeAddress = (nickname) => ({
  type: "REMOVE_ADDRESS",
  nickname,
});

export const changeAddress = (nickname, newAddress) => ({
  type: "CHANGE_ADDRESS",
  nickname,
  newAddress,
});

export const switchActiveAddress = (nickname) => ({
  type: "SWITCH_ACTIVE_ADDRESS",
  nickname,
});

export const updatePersonalInfo = (personalInfo) => ({
  type: "UPDATE_PERSONAL_INFO",
  personalInfo,
});

export const logoutUser = () => ({
  type: "LOGOUT_USER",
});
