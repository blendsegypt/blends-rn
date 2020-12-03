/*

  Gets single order details
  
  @async

*/

//Axios instance
import API from "../../../utils/axios";
//MomentJS
import Moment from "moment";

export default async function getOrder(orderID) {
  const response = await API.get(`app/orders/order/${orderID}`);
  const order = Object.assign({}, response.data.data);
  // Calculate order dates and time
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
    order.createdAt = Moment(order.createdAt).startOf("minute").fromNow();
  }
  // Format order
  order.OrderItems.forEach((item) => {
    item.name = item.Product.name;
    item.image = item.Product.product_image_url;
    item.selectedOptions = JSON.parse(item.options);
  });

  return order;
}
