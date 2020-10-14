/*
 *
 *  User Reducer
 *  @note => savedAddresses[0] is the active address
 *
 */

export default function userReducer(
  state = { phoneNumberConfirmed: false, savedAddresses: [] },
  action
) {
  let newState;
  switch (action.type) {
    case "ADD_LOCATION":
      newState = { ...state };
      delete newState.location;
      newState.location = action.location;
      return newState;
    case "REMOVE_LOCATION":
      newState = { ...state };
      delete newState.location;
      return newState;
    case "CONFIRM_USER":
      newState = { ...state };
      newState.phoneNumber = action.phoneNumber;
      newState.fullName = action.fullName;
      newState.phoneNumberConfirmed = true;
      return newState;
    case "ADD_ADDRESS":
      newState = { ...state };
      newState.addressConfirmed = true;
      newState.savedAddresses.unshift(action.address);
      return newState;
    case "REMOVE_ADDRESS":
      newState = { ...state };
      // Find target address and filter it out of addresses array
      newState.savedAddresses = newState.savedAddresses.filter(
        (address) => address.addressName != action.addressName
      );
      if (newState.savedAddresses.length == 0)
        newState.addressConfirmed = false;
      return newState;
    case "CHANGE_ADDRESS":
      newState = { ...state };
      // Find target address and replace it with new address
      newState.savedAddresses = newState.savedAddresses.map((address) => {
        if (address.addressName == action.addressName) return action.newAddress;
        return address;
      });
      if (newState.savedAddresses.length == 0)
        newState.addressConfirmed = false;
      return newState;
    case "SWITCH_ACTIVE_ADDRESS":
      newState = { ...state };
      // Find target address and save it
      const newActive = newState.savedAddresses.find(
        (address) => address.addressName == action.addressName
      );
      // Find target address and filter it out of addresses array
      newState.savedAddresses = newState.savedAddresses.filter(
        (address) => address.addressName != action.addressName
      );
      // Add the new active address in the beginning of the array
      newState.savedAddresses.unshift(newActive);
      return newState;
    case "UPDATE_PERSONAL_INFO":
      newState = { ...state, ...action.personalInfo };
      return newState;
    default:
      return state;
  }
}
