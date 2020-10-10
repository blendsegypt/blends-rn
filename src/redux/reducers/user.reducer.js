/*
 *
 *  User Reducer
 *
 */

export default function userReducer(state = { savedAddresses: [] }, action) {
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
      // Find target item and filter it out of cart array
      newState.savedAddresses = newState.savedAddresses.filter((address) => address.addressName != action.addressName);
      if (newState.savedAddresses.length == 0) newState.addressConfirmed = false;
      return newState;
    case "CHANGE_ADDRESS":
      newState = { ...state };
      // Find target item and replace it with new address
      newState.savedAddresses = newState.savedAddresses.map((address) => {
        if (address.addressName == action.addressName) return action.newAddress;
        return address;
      });
      if (newState.savedAddresses.length == 0) newState.addressConfirmed = false;
      return newState;
    default:
      return state;
  }
}
