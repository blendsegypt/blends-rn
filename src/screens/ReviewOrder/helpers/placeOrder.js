/*

  Places an order on the backend system
  
  @async

*/

//Axios instance
import API from "../../../utils/axios";

export default async function placeOrder(
  branchID,
  userID,
  addressID,
  subtotal,
  cartItems,
  promocode,
  walletUsed,
) {
  const order = {
    branch_id: branchID,
    user_id: userID,
    delivery_address_id: addressID,
    sub_total: Number(subtotal),
    total: Number(subtotal) + 5,
    delivery_charges: 5,
    walletUsed,
  };
  order.OrderItems = cartItems.map((item) => {
    return {
      product_id: item.product_id,
      quantity: item.quantity,
      options: JSON.stringify(item.selectedOptions),
    };
  });
  if (promocode !== "") {
    order.promo_code = promocode;
  }
  await API.post("app/orders", order);
}
