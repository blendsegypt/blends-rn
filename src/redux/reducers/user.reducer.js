/*
 *
 *  User Reducer
 *
 */

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case "ADD_ADDRESS":
      return { ...state, location: action.address };
    case "REMOVE_ADDRESS":
      return { ...state, location: undefined };
    default:
      return state;
  }
}
