/*

  Gets branch status to check if branch is closed or not
  
  @async

*/

//Axios instance
import API from "../../../utils/axios";

export default async function updateAddress(addressID, updatedAddress) {
  await API.put(`user/addresses/${addressID}`, updatedAddress);
}
