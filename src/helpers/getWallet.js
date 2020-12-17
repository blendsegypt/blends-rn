/*

  Retrieves wallet value from backend
  
  @async

*/

import API from "../utils/axios";

export default async function getWallet() {
  const userInfo = await API.get("user");
  return userInfo.data.data.wallet;
}
