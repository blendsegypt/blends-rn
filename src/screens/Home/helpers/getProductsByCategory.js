/*

  Gets products by category (and branch_id to get stock as well)
  
  @async

*/

//Axios instance
import API from "../../../utils/axios";

export default async function getProductsByCategory(categoryID, branchID) {
  const products = await API.get(
    `app/products/category/${categoryID}/branch/${branchID}`,
  );
  return products.data.data;
}
