/*

  Gets branch status to check if branch is closed or not
  
  @async

*/

//Axios instance
import API from "../../../utils/axios";

export default async function getBanners() {
  const banners = await API.get("app/banners");
  return banners.data.data;
}
