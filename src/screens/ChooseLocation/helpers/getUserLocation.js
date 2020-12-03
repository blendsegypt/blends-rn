/*
 *
 *  getUserLocation()
 *  - Used for retrieving user geographic location
 *  @returns [lat,lng]
 *
 */

//Geolocation
import Geolocation from "@react-native-community/geolocation";

export default getUserLocation = () => {
  // Promisify Geolocation.getCurrentPosition since it relies on outdated callbacks
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        resolve([latitude, longitude]);
      },
      (error) => {
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 5},
    );
  });
};
