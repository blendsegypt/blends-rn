/*
 *
 *  User Reducer
 *
 */

export default function userReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case "ADD_ADDRESS":
      newState = { ...state };
      delete newState.address;
      newState.address = action.address;
      return newState;
    case "REMOVE_ADDRESS":
      newState = { ...state };
      delete newState.address;
      return newState;
    case "CONFIRM_PHONE_NUMBER":
      newState = { ...state };
      newState.phoneNumber = action.phoneNumber;
      newState.phoneNumberConfirmed = true;
      return newState;
    default:
      return state;
  }
}
