/*

  Update user info
  
  @async

*/

import API from "../../../utils/axios";

export default async function updateUserInfo(userInfo) {
  for (const field in userInfo) {
    if (userInfo[field] === "") {
      delete userInfo[field];
    }
  }
  await API.put("app/user", userInfo);
}
