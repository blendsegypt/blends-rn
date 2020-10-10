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

export const confirmPhoneNumber = (phoneNumber) => ({
  type: "CONFIRM_PHONE_NUMBER",
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
