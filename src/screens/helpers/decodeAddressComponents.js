/*
 *
 *  decodeAddressComponents()
 *  - Used for decoding address from Google Maps API
 *  @returns governate, area, street & formatted address
 *
 */

export default function decodeAddressComponents(googleMapsResponse) {
  if (!googleMapsResponse.data.results[0]) return;
  // Get Governate from address components
  const governate = googleMapsResponse.data.results[0].address_components
    .find((component) =>
      component.types.includes("administrative_area_level_1")
    )
    .long_name.split(" ")[0];
  // Get Area from address components
  let area = googleMapsResponse.data.results[0].address_components.find(
    (component) => component.types.includes("administrative_area_level_2")
  );
  if (area) area = area.long_name;
  // Get Street Number from address components
  let street_number = googleMapsResponse.data.results[0].address_components.find(
    (component) => component.types.includes("street_number")
  );
  if (street_number) street_number = street_number.long_name;
  // Get Route from address components
  let route = googleMapsResponse.data.results[0].address_components.find(
    (component) => component.types.includes("route")
  );
  if (route) route = route.long_name;
  // Format Street
  let street = `${street_number} ${route}`;
  // Format whole address
  const formattedAddress = `${governate} - ${street}, ${area}`;

  return {
    governate,
    area,
    street,
    formattedAddress,
  };
}
