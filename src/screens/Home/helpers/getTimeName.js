/*

  Gets the name of the current time period (Morning, Afternoon, Evening)
  
  @async

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
