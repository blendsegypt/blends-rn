/*
 *
 *  Cart Redux actions
 *
 */

import Toast from "react-native-toast-message";

export const addToCart = (item) => {
  Toast.show({
    type: "success",
    topOffset: 50,
    visibilityTime: 500,
    text1: "Added to Cart!",
    text2: `${item.name} has been added to cart.`,
  });
  return {
    type: "ADD_TO_CART",
    item,
  };
};

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
