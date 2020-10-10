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
    case "CONFIRM_PHONE_NUMBER":
      newState = { ...state };
      newState.phoneNumber = action.phoneNumber;
      newState.phoneNumberConfirmed = true;
      return newState;
    case "ADD_ADDRESS":
      newState = { ...state };
      newState.addressConfirmed = true;
      newState.savedAddresses.push(action.address);
      return newState;
    case "REMOVE_ADDRESS":
      // Copy state to aoid mutation
      newState = { ...state };
      // Find target item and filter it out of cart array
      newState = newState.savedAddresses.filter((address) => address.addressName != action.addressName);
      if (newState.savedAddresses.length == 0) newState.addressConfirmed = false;
      return newState;
    default:
      return state;
  }
}
