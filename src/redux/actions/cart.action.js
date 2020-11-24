/*
 *
 *  Cart Redux actions
 *
 */

export const addToCart = (item) => ({
  type: "ADD_TO_CART",
  item,
});

export const changeQuantity = (itemID, newQuantity) => ({
  type: "CHANGE_QUANTITY",
  itemID,
  newQuantity,
});

export const removeFromCart = (itemID) => ({
  type: "REMOVE_FROM_CART",
  itemID,
});

export const resetCart = () => ({
  type: "RESET_CART",
});
