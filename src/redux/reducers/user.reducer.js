/*
 *
 *  User Reducer
 *  @note => addresses[0] is the active address
 *
 */

export default function userReducer(
  // Initial User Reducer state
  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    wallet: null,
    referralCode: "",
    loggedIn: false,
    addresses: [],
    location: {},
  },
  action,
) {
  let newState;
  switch (action.type) {
    case "ADD_LOCATION":
      newState = {...state};
      delete newState.location;
      newState.location = action.location;
      return newState;
    case "REMOVE_LOCATION":
      newState = {...state};
      delete newState.location;
      return newState;
    case "SET_USER":
      newState = {...state};
      newState.loggedIn = true;
      newState.id = action.user.id;
      newState.firstName = action.user.first_name;
      newState.lastName = action.user.last_name;
      newState.phoneNumber = action.user.phone_number;
      newState.referralCode = action.user.referral_code;
      newState.wallet = action.user.wallet;
      return newState;
    case "SET_ADDRESSES":
      newState = {...state};
      newState.addresses = action.addresses;
      newState.addressConfirmed = true;
      return newState;
    case "ADD_ADDRESS":
      newState = {...state};
      newState.addressConfirmed = true;
      newState.addresses.unshift(action.address);
      return newState;
    case "REMOVE_ADDRESS":
      newState = {...state};
      // Find target address and filter it out of addresses array
      newState.addresses = newState.addresses.filter(
        (address) => address.nickname !== action.nickname,
      );
      if (newState.addresses.length === 0) newState.addressConfirmed = false;
      return newState;
    case "CHANGE_ADDRESS":
      newState = {...state};
      // Find target address and replace it with new address
      newState.addresses = newState.addresses.map((address) => {
        if (address.nickname === action.nickname) return action.newAddress;
        return address;
      });
      if (newState.addresses.length === 0) newState.addressConfirmed = false;
      return newState;
    case "SWITCH_ACTIVE_ADDRESS":
      newState = {...state};
      // Find target address and save it
      const newActive = newState.addresses.find(
        (address) => address.nickname === action.nickname,
      );
      // Find target address and filter it out of addresses array
      newState.addresses = newState.addresses.filter(
        (address) => address.nickname !== action.nickname,
      );
      // Add the new active address in the beginning of the array
      newState.addresses.unshift(newActive);
      return newState;
    case "UPDATE_PERSONAL_INFO":
      newState = {...state, ...action.personalInfo};
      return newState;
    case "LOGOUT_USER":
      newState = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        wallet: null,
        referralCode: "",
        loggedIn: false,
        addresses: [],
        location: {},
      };
      return newState;
    default:
      return state;
  }
}
