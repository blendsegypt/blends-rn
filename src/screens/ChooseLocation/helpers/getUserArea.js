/*
 *
 *  getUserArea()
 *  - Used for retrieving user area according to the areas set in backend
 *  @returns { area_name, area_id, branch_id } (Supported Area)
 *           false (Unsupported Area)
 *
 */
import API from "../../../utils/axios";
import memoize from "memoizee";
import classifyPoint from "robust-point-in-polygon";

// Load areas from API
const loadAreas = async () => {
  const response = await API.get("app/areas");
  // Parse string coordinates to arrays [lat,lng]
  let areas = response.data.data;
  areas = areas.map((area) => {
    area.area_fence = area.area_fence.map((coordinateString) => {
      const coordinates = coordinateString.split(",");
      return coordinates;
    });
    return area;
  });
  return areas;
};

// Memoize Areas array to avoid unneceassry API requests
const areasMemoized = memoize(loadAreas, {promise: true});

export default async function getUserArea(coordinates) {
  const areas = await areasMemoized();
  let targetArea = {};
  areas.forEach((area) => {
    const testCoordinates = classifyPoint(area.area_fence, coordinates);
    if (testCoordinates === -1) {
      targetArea = {
        id: area.id,
        name: area.name,
        Branches: area.Branches,
      };
    }
  });
  // If area is supported
  if (Object.keys(targetArea).length > 0) {
    return targetArea;
  }
  // If area is not supported
  return false;
}
