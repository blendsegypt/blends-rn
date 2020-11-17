/*
 *
 *  getUserArea()
 *  - Used for retrieving user area according to the ones set in dashboard
 *  @returns area_name, area_id, branch_id
 *
 */

import API from "../../utils/axios";

export default async function getUserArea() {
  const area = await API.get("app/areas");
  console.log(area.data.data);
}
