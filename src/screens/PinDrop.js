/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import MapView from 'react-native-maps';
//UI Components
import Text from '../components/ui/Text';
import Link from '../components/ui/Link';
import Button from '../components/ui/Button';
import Toast from 'react-native-toast-message';
//Redux
import {connect} from 'react-redux';
import {addLocation} from '../redux/actions/user.action';
// Loading Skeleton
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
// Custom Marker
import PinMarker from '../../assets/mapMarker.png';
// Font Icons
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons';
//Bottom Sheet
import UserActions from '../screens/bottomSheets/UserActions';
import BottomSheetOverlay from '../components/BottomSheetOverlay';
//Search Location Component
import SearchLocation from '../components/SearchLocation';
//Axios
import Axios from 'axios';
//Helpers
import decodeAddressComponents from './helpers/decodeAddressComponents';
import getUserArea from './helpers/getUserArea';
import getUserLocation from './helpers/getUserLocation';

function PinDrop({addLocation, navigation, route, loggedIn, addresses}) {
  // UserActions bottom sheet state
  const [showUserActionsSheet, setShowUserActionsSheet] = useState(false);
  // Loading state
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [addressLoaded, setAddressLoaded] = useState(false);
  // Location Object
  const [area, setArea] = useState({});
  const [formattedAddress, setFormattedAddress] = useState('');
  const [googleMapsAddress, setGoogleMapsAddress] = useState({});
  // User Original Coordinates
  const [userCoordinates, setUserCoordinates] = useState([]);
  // Current Coordinates
  const [coordinates, setCoordinates] = useState([]);
  // MapView ref
  const mapRef = useRef();
  // Guest (default) / previous user
  const [existingUser, setExistingUser] = useState(false);
  // Supported/Unsupported Area
  const [supportedArea, setSupportedArea] = useState(false);

  // Reverse Geocode address
  const reverseGeocode = async () => {
    try {
      // Reverse Geocode coordinates using Google Maps API
      const [lat, lng] = coordinates;
      const response = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address|administrative_area_level_1|administrative_area_level_2|administrative_area_level_3&key=AIzaSyAZOGnKWfosXqB9d_jkOS-T55K_b8PPOYY`,
      );
      if (response.data.results === []) return;
      const googleMapsAddress = decodeAddressComponents(response);
      setFormattedAddress(googleMapsAddress.formattedAddress);
      setGoogleMapsAddress(googleMapsAddress);
      setAddressLoaded(true);
    } catch (error) {
      Toast.show({
        type: 'error',
        topOffset: 50,
        text1: 'An Error Occured',
        text2: 'Something wrong happened on our side! Please try again.',
      });
    }
  };

  // Detect user's location
  const animateToUserLocation = async () => {
    try {
      const coordinates = await getUserLocation();
      // Set original user coordinates
      setUserCoordinates(coordinates);
      setLocationLoaded(true);
    } catch (errors) {
      Toast.show({
        type: 'error',
        topOffset: 50,
        text1: 'An Error Occured',
        text2: 'Something wrong happened on our side! Please try again.',
      });
    }
  };

  // Check if existing user
  useFocusEffect(
    useCallback(() => {
      if (route.params) {
        if (route.params.existingUser) {
          setExistingUser(true);
        } else {
          setExistingUser(false);
        }
      }
      animateToUserLocation();
    }, []),
  );

  // Reverse geocode new coordinates
  useEffect(() => {
    if (locationLoaded && mapLoaded) {
      reverseGeocode();
      // Get User Area
      (async () => {
        const userArea = await getUserArea(coordinates);
        if (userArea) {
          // Supported Area
          setSupportedArea(true);
          setArea(userArea);
        } else {
          setSupportedArea(false);
          setArea({area_name: googleMapsAddress.area});
        }
      })();
    }
  }, [coordinates]);

  // Handler for search queries
  const navigateToPlaceID = async (placeID) => {
    try {
      // Retreive place lat,lng from Google Maps API
      const response = await Axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&key=AIzaSyAZOGnKWfosXqB9d_jkOS-T55K_b8PPOYY&fields=geometry`,
      );
      const {lat, lng} = response.data.result.geometry.location;
      setCoordinates([lat, lng]);
      animateToRegion([lat, lng]);
    } catch (errors) {
      Toast.show({
        type: 'error',
        topOffset: 50,
        text1: 'An Error Occured',
        text2: 'Something wrong happened on our side! Please try again.',
      });
    }
  };

  // Handler for continue button
  const continueHandler = () => {
    const location = {
      ...googleMapsAddress,
    };
    if (supportedArea) {
      location.supported = true;
      location.area = area;
    } else {
      location.supported = false;
    }
    addLocation(location);
    navigation.navigate('Home');
  };

  // Close UserActions Bottom sheet
  const closeSheet = () => {
    setShowUserActionsSheet(false);
    if (loggedIn && addresses.length > 0) {
      navigation.navigate('Home');
    }
  };

  const animateToRegion = (coordinates) => {
    const [lat, lng] = coordinates;
    mapRef.current.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        longitudeDelta: 0.005,
        latitudeDelta: 0.005,
      },
      500,
    );
  };

  return (
    <>
      {showUserActionsSheet && (
        <BottomSheetOverlay
          setShowBottomSheet={(state) => setShowUserActionsSheet(state)}
        />
      )}
      <View style={styles.outerContainer}>
        {locationLoaded && (
          <MapView
            followsUserLocation={false}
            initialRegion={{
              latitude: userCoordinates[0],
              longitude: userCoordinates[1],
              longitudeDelta: 0.005,
              latitudeDelta: 0.005,
            }}
            onMapReady={() => {
              setMapLoaded(true);
            }}
            ref={mapRef}
            provider="google"
            style={styles.map}
            onRegionChangeComplete={(region) => {
              setCoordinates([region.latitude, region.longitude]);
            }}
          />
        )}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 20,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}>
          <Image
            pointerEvents="none"
            source={PinMarker}
            style={{width: 34, height: 70}}
            resizeMode="contain"
          />
        </View>
        {/* Go Back to my Location */}
        <View
          style={{
            position: 'absolute',
            top: 130,
            right: 0,
            left: 0,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#0E2241',
              padding: 13,
              paddingHorizontal: 15,
              borderRadius: 50,
            }}
            onPress={() => {
              setCoordinates(userCoordinates);
              animateToRegion(userCoordinates);
            }}>
            <FontAwesomeIcon icon={faLocationArrow} size={23} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* Search Locations Input */}
        <SafeAreaView
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: 999,
          }}>
          <SearchLocation
            navigateToPlaceID={navigateToPlaceID}
            coordinates={coordinates}
          />
        </SafeAreaView>
        <View style={styles.container}>
          {/* Title */}
          <View style={styles.title}>
            <Text style={styles.titleText} semiBold>
              Confirm your Location
            </Text>
            {!existingUser && (
              <Link onPress={() => setShowUserActionsSheet(true)}>
                Already a User?
              </Link>
            )}
          </View>
          {/* Address */}
          <View style={styles.address}>
            {addressLoaded ? (
              <Text style={styles.addressText}>
                {formattedAddress} ({area.area_name})
              </Text>
            ) : (
              <SkeletonContent
                containerStyle={{width: 100, height: 70}}
                isLoading={true}
                animationDirection="horizontalLeft"
                duration="800"
                boneColor="#D1D1D1"
                layout={[
                  {
                    key: 'address1',
                    width: 130,
                    height: 20,
                    borderRadius: 10,
                  },
                  {
                    key: 'address2',
                    width: 100,
                    height: 20,
                    borderRadius: 10,
                    marginTop: 5,
                  },
                  {
                    key: 'address3',
                    width: 150,
                    height: 20,
                    borderRadius: 10,
                    marginTop: 5,
                  },
                ]}
              />
            )}
            <View>
              {addressLoaded ? (
                <View
                  style={[
                    styles.addressTag,
                    supportedArea ? styles.supportedTag : styles.unsupportedTag,
                  ]}>
                  <Text
                    style={[
                      styles.addressTagText,
                      supportedArea
                        ? styles.supportedTagText
                        : styles.unsupportedTagText,
                    ]}>
                    {supportedArea ? 'Supported' : 'Unsupported'}
                  </Text>
                </View>
              ) : (
                <SkeletonContent
                  containerStyle={{width: 100, height: 70}}
                  isLoading={true}
                  animationDirection="horizontalLeft"
                  duration="800"
                  boneColor="#D1D1D1"
                  layout={[
                    {
                      key: 'tag',
                      width: 100,
                      height: 25,
                      borderRadius: 10,
                      marginLeft: 135,
                      marginTop: 15,
                    },
                  ]}
                />
              )}
            </View>
          </View>
          {/* Continue Button */}
          {!existingUser ? (
            addressLoaded ? (
              <Button
                onPress={() => {
                  continueHandler();
                }}>
                {supportedArea ? 'Continue' : 'Continue anyways'}
              </Button>
            ) : (
              <Button disabled>Continue</Button>
            )
          ) : (
            <Button
              onPress={() => {
                // Navigate to Edit Address in Account (Add address mode)
                const address = {
                  ...googleMapsAddress,
                  addressDetails: '',
                  floor: '',
                  apartment: '',
                  deliveryNotes: '',
                };
                navigation.navigate('Home', {
                  screen: 'Account',
                  params: {
                    screen: 'EditAddress',
                    params: {address, newAddress: true},
                  },
                });
              }}>
              Add Location
            </Button>
          )}
        </View>
      </View>
      {showUserActionsSheet && (
        <UserActions
          showUserActionsSheet={showUserActionsSheet}
          closeSheet={closeSheet}
          loginMode
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#f5f5f5',
    height: '100%',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: -1,
  },
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    paddingHorizontal: 25,
    paddingVertical: 40,
    paddingBottom: 40,
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 9999,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
  },
  titleText: {
    color: '#C84D49',
    fontSize: 18,
    flex: 0.95,
  },
  address: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignContent: 'space-between',
  },
  addressText: {
    fontSize: 16,
    lineHeight: 25,
    color: '#0E2241',
    flex: 0.95,
  },
  addressTag: {
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    marginLeft: 50,
    marginTop: 15,
  },
  supportedTag: {
    backgroundColor: '#DCEFE0',
  },
  supportedTagText: {
    color: '#3F8A4E',
  },
  unsupportedTag: {
    backgroundColor: '#efdcdc',
  },
  unsupportedTagText: {
    color: '#8a3f3f',
  },
  loadingContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
  },
  loadingBar: {
    backgroundColor: '#f5f5f5',
    width: 130,
    height: 17,
    marginTop: 5,
    flex: 1,
  },
  loadingArea: {
    flexDirection: 'column',
    marginBottom: 10,
    flex: 0.95,
  },
  loadingTag: {
    backgroundColor: '#f5f5f5',
    width: 110,
    height: 30,
    marginTop: 20,
    flex: 1,
    borderRadius: 50,
  },
  overlay: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.8,
    zIndex: 99,
  },
});

const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn,
  addresses: state.userReducer.addresses,
});

const mapDispatchToProps = (dispatch) => ({
  addLocation: (location) => {
    dispatch(addLocation(location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PinDrop);
