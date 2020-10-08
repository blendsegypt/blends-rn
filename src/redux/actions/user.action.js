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
