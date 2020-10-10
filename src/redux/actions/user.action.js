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

export const confirmUser = (fullName, phoneNumber) => ({
  type: "CONFIRM_USER",
  fullName,
  phoneNumber,
});

export const addAddress = (address) => ({
  type: "ADD_ADDRESS",
  address,
});

export const removeAddress = (addressName) => ({
  type: "REMOVE_ADDRESS",
  addressName
});

export const changeAddress = (addressName, newAddress) => ({
  type: "CHANGE_ADDRESS",
  addressName,
  newAddress,
});
