/*

  Updates order rating in backend
  
  @async

*/

//Axios instance
import API from "../../../utils/axios";

export default async function rateOrder(orderID, rating) {
  await API.post(`app/orders/rate/${orderID}`, {rating});
}
