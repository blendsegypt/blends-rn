/*

  Logs user out of the backend
  
  @async

*/

//axios instance
import API from "../../../utils/axios";

export default async function logoutUser(reduxLogoutAction) {
  await API.post("auth/logout", {});
  reduxLogoutAction();
}
