/*
 *
 *  Cart Reducer
 *
 */

//Assets (for testing!!)
import Latte from "../../../assets/Latte.png";

let exampleCart = [
  {
    id: 1,
    image: Latte,
    name: "Latte",
    price: 24.99,
    quantity: 1,
    selectedOptions: [
      {
        label: "Cup Size",
        value: "sm",
        price: "0",
        textValue: "Small",
      },
      {
        label: "Milk Type",
        value: "skm",
        price: "0",
        textValue: "Skimmed",
      },
    ],
  },
];

export default function cartReducer(state = exampleCart, action) {
  let newState;
  switch (action.type) {
    case "ADD_TO_CART":
      // Push new item to cart array
      return [...state].push(action.item);
    case "CHANGE_QUANTITY":
      // Copy state to avoid mutation
      newState = [...state];
      // Find target item and change its quantity
      newState.forEach((item) => {
        if (item.id == action.itemID) item.quantity = action.newQuantity;
      });
      return newState;
    case "REMOVE_FROM_CART":
      // Copy state to aoid mutation
      newState = [...state];
      // Find target item and filter it out of cart array
      newState.filter((item) => item.id != action.itemID);
      return newState;
    default:
      return state;
  }
}
