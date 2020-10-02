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
    default:
      return state;
  }
}
