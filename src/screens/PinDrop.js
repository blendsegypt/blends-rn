import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
//UI Components
import Text from "../components/ui/Text";
import Link from "../components/ui/Link";
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
//Geolocation
import * as Location from "expo-location";
//Redux
import { connect } from "react-redux";
import { addAddress } from "../redux/actions/user.action";
// Loading Skeleton
import SkeletonContent from "react-native-skeleton-content";
// Custom Marker
import PinMarker from "../../assets/mapMarker.png";

function PinDrop({ addAddress, user, navigation }) {
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [addressLoaded, setAddressLoaded] = useState(false);
  const [addressObject, setAddressObject] = useState({});
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef();

  // Reverse Geocode address
  const reverseGeocode = async () => {
    const coords = { longitude, latitude };
    let location = await Location.reverseGeocodeAsync(coords);
    const addressObject = {
      street: location[0].street,
      city: location[0].city,
      name: location[0].name,
      region: location[0].region,
    };
    setAddressObject(addressObject);
    setAddressLoaded(true);
  };

  // Detect user's location
  useFocusEffect(
    useCallback(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Please allow Blends to access your Location.");
        }
        // Get Coordinates for Google Map View
        let coordinates = await Location.getCurrentPositionAsync({});
        console.log(coordinates.coords);
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
      })();
    }, [user.location])
  );

  // Handler for continue button
  const continueHandler = () => {
    addAddress(addressObject);
    navigation.navigate("Home");
  };

  //Redirect to Home Screen if location is already chosen
  useEffect(() => {
    if (user.address) navigation.navigate("Home");
  }, []);

  return (
    <View style={styles.outerContainer}>
      {locationLoaded && (
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
          <Marker image={PinMarker} coordinate={{ longitude, latitude }} />
        </MapView>
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
          <Link>Already a User?</Link>
        </View>
        {/* Address */}
        <View style={styles.address}>
          {addressLoaded ? (
            <Text style={styles.addressText}>
              {addressObject.region}
              {"\n"}
              {addressObject.city}
              {"\n"}
              {addressObject.street}
            </Text>
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
        <Button
          onPress={() => {
            continueHandler();
          }}
        >
          Continue
        </Button>
      </View>
    </View>
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
});

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  addAddress: (address) => {
    dispatch(addAddress(address));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PinDrop);
