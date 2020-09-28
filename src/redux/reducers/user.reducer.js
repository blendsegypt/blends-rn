/*
 *
 *  User Reducer
 *
 */

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case "ADD_ADDRESS":
      return { ...state, location: action.address };
    default:
      return state;
  }
}
