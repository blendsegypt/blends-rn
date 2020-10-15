import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import MapView from "react-native-maps";
//UI Components
import Text from "../components/ui/Text";
import Link from "../components/ui/Link";
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
//Geolocation
import * as Location from "expo-location";
//Redux
import { connect } from "react-redux";
import { addLocation } from "../redux/actions/user.action";
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content";
// Custom Marker
import PinMarker from "../../assets/mapMarker.png";
// Font Icons
import { FontAwesome } from "@expo/vector-icons";
//Bottom Sheet
import UserActions from "../screens/bottomSheets/UserActions";
import BottomSheetOverlay from "../components/BottomSheetOverlay";
//Axios
import Axios from "../utils/axios";

function PinDrop({
  addLocation,
  user,
  navigation,
  route,
  phoneNumberConfirmed,
}) {
  // UserActions bottom sheet state
  const [showUserActionsSheet, setShowUserActionsSheet] = useState(false);
  // Loading state
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [addressLoaded, setAddressLoaded] = useState(false);
  // Location Object
  const [formattedAddress, setFormattedAddress] = useState("");
  const [area, setArea] = useState("");
  // Coordinates
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  // MapView ref
  const mapRef = useRef();
  // Guest (default) / previous user
  const [existingUser, setExistingUser] = useState(false);

  // Reverse Geocode address
  const reverseGeocode = () => {
    // Reverse Geocode coordinates using Google Maps API
    Axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAZOGnKWfosXqB9d_jkOS-T55K_b8PPOYY`
    )
      .then((response) => {
        const formattedAddress = response.data.results[0].formatted_address;
        const area = response.data.results[0].address_components[1].short_name;
        setFormattedAddress(formattedAddress);
        setArea(area);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
    setAddressLoaded(true);
  };

  // Detect user's location
  const getUserLocation = async () => {
    if (user.location && route.params == undefined) return;
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Please allow Blends to access your Location.");
    }
    // Get Coordinates for Google Map View
    let coordinates = await Location.getCurrentPositionAsync({});
    setLatitude(coordinates.coords.latitude);
    setLongitude(coordinates.coords.longitude);
    setLocationLoaded(true);
    // Reverse Geocode the coordinates to physical address
    reverseGeocode();
    mapRef.current.animateToRegion(
      {
        longitude: coordinates.coords.longitude,
        latitude: coordinates.coords.latitude,
        longitudeDelta: 0.005,
        latitudeDelta: 0.005,
      },
      500
    );
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
      getUserLocation();
    }, [route.params])
  );

  // Get user location as soon as screen is loaded
  useFocusEffect(
    useCallback(() => {
      getUserLocation();
    }, [user.location])
  );

  // Handler for continue button
  const continueHandler = () => {
    addLocation({ area, formattedAddress });
    navigation.navigate("Home");
  };

  // Redirect to Home Screen if location is already chosen
  useEffect(() => {
    if (user.location) navigation.navigate("Home");
  }, []);

  // Close UserActions Bottom sheet
  const closeSheet = () => {
    setShowUserActionsSheet(false);
  };

  useEffect(() => {
    if (phoneNumberConfirmed) {
      if (user.savedAddresses.length > 0) navigation.navigate("Home");
    }
  }, [phoneNumberConfirmed]);

  return (
    <>
      {showUserActionsSheet && (
        <BottomSheetOverlay
          setShowBottomSheet={(state) => setShowUserActionsSheet(state)}
        />
      )}
      <View style={styles.outerContainer}>
        {locationLoaded && (
          <>
            <MapView
              ref={mapRef}
              provider="google"
              style={styles.map}
              initialRegion={{
                longitude,
                latitude,
                longitudeDelta: 0.005,
                latitudeDelta: 0.005,
              }}
              onRegionChange={(region) => {
                setLongitude(region.longitude);
                setLatitude(region.latitude);
              }}
              onRegionChangeComplete={() => {
                reverseGeocode();
              }}
            >
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 20,
                  left: 0,
                  right: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Image
                  pointerEvents="none"
                  source={PinMarker}
                  style={{ width: 34, height: 70 }}
                  resizeMode="contain"
                />
              </View>
            </MapView>
            <View
              style={{
                position: "absolute",
                top: 130,
                right: 0,
                left: 0,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#0E2241",
                  padding: 13,
                  paddingHorizontal: 15,
                  borderRadius: 50,
                }}
                onPress={() => {
                  getUserLocation();
                }}
              >
                <FontAwesome name="location-arrow" size={23} color="#fff" />
              </TouchableOpacity>
            </View>
          </>
        )}
        <SafeAreaView style={styles.search}>
          <View style={styles.searchContainer}>
            <TextInput>Search...</TextInput>
          </View>
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
              <Text style={styles.addressText}>{formattedAddress}</Text>
            ) : (
              <SkeletonContent
                containerStyle={{ width: 100, height: 70 }}
                isLoading={true}
                animationDirection="horizontalLeft"
                duration="800"
                boneColor="#D1D1D1"
                layout={[
                  {
                    key: "address1",
                    width: 130,
                    height: 20,
                    borderRadius: 10,
                  },
                  {
                    key: "address2",
                    width: 100,
                    height: 20,
                    borderRadius: 10,
                    marginTop: 5,
                  },
                  {
                    key: "address3",
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
                <View style={styles.supportedTag}>
                  <Text style={styles.supportedTagText}>Supported</Text>
                </View>
              ) : (
                <SkeletonContent
                  containerStyle={{ width: 100, height: 70 }}
                  isLoading={true}
                  animationDirection="horizontalLeft"
                  duration="800"
                  boneColor="#D1D1D1"
                  layout={[
                    {
                      key: "tag",
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
                }}
              >
                Continue
              </Button>
            ) : (
              <Button disabled>Continue</Button>
            )
          ) : (
            <Button
              onPress={() => {
                // Navigate to Edit Address in Account
                const address = {
                  userLocation: { area, formattedAddress },
                  addressDesc: "",
                  floor: "",
                  apartment: "",
                  deliveryNotes: "",
                };
                navigation.navigate("Home", {
                  screen: "Account",
                  params: {
                    screen: "EditAddress",
                    params: { address, newAddress: true },
                  },
                });
              }}
            >
              Add Location
            </Button>
          )}
        </View>
      </View>
      <UserActions
        showUserActionsSheet={showUserActionsSheet}
        closeSheet={closeSheet}
        loginMode
      />
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#f5f5f5",
    height: "100%",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -1,
  },
  container: {
    backgroundColor: "white",
    position: "absolute",
    paddingHorizontal: 25,
    paddingVertical: 40,
    paddingBottom: 40,
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 9999,
  },
  search: {
    position: "absolute",
    width: "100%",
    zIndex: 999,
  },
  searchContainer: {
    paddingHorizontal: 25,
  },
  title: {
    flex: 1,
    flexDirection: "row",
  },
  titleText: {
    color: "#C84D49",
    fontSize: 18,
    flex: 0.95,
  },
  address: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignContent: "space-between",
  },
  addressText: {
    fontSize: 16,
    lineHeight: 25,
    color: "#0E2241",
    flex: 0.95,
  },
  supportedTag: {
    backgroundColor: "#DCEFE0",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    marginLeft: 50,
    marginTop: 15,
  },
  supportedTagText: {
    color: "#3F8A4E",
  },
  loadingContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "red",
  },
  loadingBar: {
    backgroundColor: "#f5f5f5",
    width: 130,
    height: 17,
    marginTop: 5,
    flex: 1,
  },
  loadingArea: {
    flexDirection: "column",
    marginBottom: 10,
    flex: 0.95,
  },
  loadingTag: {
    backgroundColor: "#f5f5f5",
    width: 110,
    height: 30,
    marginTop: 20,
    flex: 1,
    borderRadius: 50,
  },
  overlay: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.8,
    zIndex: 99,
  },
});

const mapStateToProps = (state) => ({
  user: state.userReducer,
  phoneNumberConfirmed: state.userReducer.phoneNumberConfirmed,
});

const mapDispatchToProps = (dispatch) => ({
  addLocation: (location) => {
    dispatch(addLocation(location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PinDrop);
