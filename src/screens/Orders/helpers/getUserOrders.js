/*

  Gets orders associated with a user
  
  @async

*/

//Axios instance
import API from "../../../utils/axios";
//Moment (date/time manipulation)
import Moment from "moment";

export default async function getUserOrders(loggedIn) {
  if (!loggedIn) {
    return [];
  }
  const response = await API.get("orders");
  const orders = [...response.data.data];
  // Calculate order dates and time
  orders.forEach((order) => {
    if (order.order_status !== "Delivered") {
      const createdAt = Moment(order.createdAt);
      // convert createdAt to readable format
      order.createdAt = createdAt.startOf("minute").fromNow();
      // calculate estimated delivery (createdAt + 30 minutes) in case its not delivered
      const estimatedDelivery = createdAt.clone().add(30, "m").calendar();
      order.estimatedDelivery = estimatedDelivery;
    } else {
      //calculate delivery date
      order.deliveryDate = Moment(order.delivered_at).calendar();
    }
  });
  return orders;
}
