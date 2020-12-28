/*
 *
 *  getUserLocation()
 *  - Used for retrieving user geographic location
 *  @returns [lat,lng]
 *
 */

import {Platform} from "react-native";
//Geolocation
import Geolocation from "@react-native-community/geolocation";

export default function getUserLocation() {
  // Promisify Geolocation.getCurrentPosition since it relies on outdated callbacks
  return new Promise((resolve, reject) => {
    //Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        resolve([latitude, longitude]);
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: Platform.OS === "android" ? false : true,
        timeout: 15000,
        maximumAge: 5,
      },
    );
  });
}
