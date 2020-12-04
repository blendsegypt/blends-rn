/*

  Gets user's recent orders
  
  @async

*/

//Axios instance
import API from "../../../utils/axios";

export default async function getRecentOrders(branchID) {
  const recentOrders = await API.get(`app/orders/recent/branch/${branchID}`);
  const orders = recentOrders.data.data;
  const recentOrderItems = [];
  orders.forEach((order) => {
    order.OrderItems.forEach((orderItem) => {
      //check if product is already pushed
      const check = recentOrderItems.find(
        (item) => item.id === orderItem.Product.id,
      );
      if (check) return;

      recentOrderItems.push({
        ...orderItem.Product,
      });
    });
  });
  return recentOrderItems;
}
