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
      console.log(newState);
      return newState;
    case "REMOVE_ADDRESS":
      newState = { ...state };
      delete newState.address;
      console.log(newState);
      return newState;
    default:
      return state;
  }
}
