/*
 *
 *  Cart Reducer
 *
 */

// Generate a unique ID for each item in cart
const generateID = (cartItem) => {
  let id = cartItem.name;
  id += String(Math.floor(Math.random() * 1000));
  return id;
};

// Compare selectedOptions to check for repeated cart items
const compareOptions = (options1, options2) => {
  if (options1.length !== options2.length) return false;
  let identical = true;
  options1.forEach((property) => {
    // check for existence in options2
    const existing = options2.find(
      (property2) =>
        property.label === property2.label &&
        property.value === property2.value,
    );
    if (!existing) identical = false;
  });

  return identical;
};

export default function cartReducer(state = [], action) {
  let newState;
  switch (action.type) {
    case "ADD_TO_CART":
      newState = [...state];
      // If an identical item already exists, then increase its quantity
      const existingItem = newState.find(
        (item) =>
          action.item.product_id === item.product_id &&
          compareOptions(action.item.selectedOptions, item.selectedOptions),
      );
      if (existingItem) {
        existingItem.quantity++;
        return newState;
      }
      // Assign an id to the new item
      action.item.id = generateID(action.item);
      // Push new item to cart array
      newState.push(action.item);
      return newState;
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
      newState = newState.filter((item) => item.id != action.itemID);
      return newState;
    case "RESET_CART":
      newState = [];
      return newState;
    default:
      return state;
  }
}
