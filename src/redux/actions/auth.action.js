/*

  User Authentication actions (Redux/Thunk actions)
  @login => used for logging in new / old users
  @logout => used for logout

*/
import {setUser, setAddresses} from "../actions/user.action";
import {setAccessToken, setRefreshToken} from "../../utils/authToken";
import {authInterceptor} from "../../utils/axios";

export const login = (user, accessToken, refreshToken, addresses = []) => {
  return (dispatch) => {
    // Save user access token & refresh token
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    // Activate Axios authentication interceptor
    authInterceptor.activate();
    // Dispatch Redux actions to save user data
    dispatch(setUser(user));
    if (addresses.length > 0) {
      dispatch(setAddresses(addresses));
    }
  };
};

export const logout = () => {};
