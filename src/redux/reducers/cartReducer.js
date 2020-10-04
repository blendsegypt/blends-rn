/*
 *
 *  Cart Reducer
 *
 */

//Assets (for testing!!)
import Latte from "../../../assets/Latte.png";

// let exampleCart = [
//   {
//     image: Latte,
//     name: "Latte",
//     price: 24.99,
//     quantity: 1,
//     selectedOptions: [
//       {
//         label: "Cup Size",
//         value: "sm",
//         price: "0",
//         textValue: "Small",
//       },
//       {
//         label: "Milk Type",
//         value: "skm",
//         price: "0",
//         textValue: "Skimmed",
//       },
//     ],
//   },
// ];
let exampleCart = [];

export default function cartReducer(
  state = {
    cartItems: exampleCart,
    cartCount: exampleCart.length,
    cartTotal: 24.99,
  },
  action
) {
  return state;
}
