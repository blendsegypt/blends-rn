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

export const removeAddress = (id) => ({
  type: "REMOVE_ADDRESS",
  id,
});

export const changeAddress = (id, newAddress) => ({
  type: "CHANGE_ADDRESS",
  id,
  newAddress,
});

export const switchActiveAddress = (id) => ({
  type: "SWITCH_ACTIVE_ADDRESS",
  id,
});

export const updatePersonalInfo = (personalInfo) => ({
  type: "UPDATE_PERSONAL_INFO",
  personalInfo,
});

export const logoutUser = () => ({
  type: "LOGOUT_USER",
});
