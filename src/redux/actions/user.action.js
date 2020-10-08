/*
 *
 *  User Redux Actions
 *
 */

export const addAddress = (address) => ({
  type: "ADD_ADDRESS",
  address,
});

export const removeAddress = () => ({
  type: "REMOVE_ADDRESS",
});

export const confirmPhoneNumber = (phoneNumber) => ({
  type: "CONFIRM_PHONE_NUMBER",
  phoneNumber,
});
