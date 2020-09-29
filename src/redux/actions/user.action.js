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
