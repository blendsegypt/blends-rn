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
    default:
      return state;
  }
}
