/*

  Gets the name of the current time period (Morning, Afternoon, Evening)
  

*/

export default function getTimeName() {
  const timeNow = new Date();
  const hours = timeNow.getHours();
  if (hours < 12) {
    return "Morning";
  } else if (hours < 18) {
    return "Afternoon";
  } else {
    return "Evening";
  }
}
