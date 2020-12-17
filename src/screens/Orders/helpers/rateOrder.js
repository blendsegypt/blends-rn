/*

  Updates order rating in backend
  
  @async

*/

//Axios instance
import API from "../../../utils/axios";

export default async function rateOrder(orderID, rating) {
  await API.post(`orders/rate/${orderID}`, {rating});
}
