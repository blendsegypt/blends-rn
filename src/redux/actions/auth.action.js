/*

  User Authentication actions (Redux/Thunk actions)
  @login => used for logging in new / old users
  @logout => used for logout

*/
import { setUser, setAddresses } from "../actions/user.action";
import { setToken, removeToken } from "../../utils/authToken";
import { authInterceptor } from "../../utils/axios";

export const login = (user, accessToken, refreshToken, addresses = []) => {
  return (dispatch) => {
    // Save user access token & refresh token
    setToken("access-token", accessToken);
    setToken("refresh-token", refreshToken);
    // Dispatch Redux actions to save user data
    dispatch(setUser(user));
    dispatch(setAddresses(addresses));
    // Activate Axios authentication interceptor
    authInterceptor.activate();
  };
};

export const logout = () => {};
