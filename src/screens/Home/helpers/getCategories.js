/*

  Gets products categories
  
  @async

*/

//Axios instance
import API from "../../../utils/axios";

export default async function getCategories() {
  const categories = await API.get("products/categories");
  return categories.data.data;
}
