import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
//UI Components
import Text from "../../components/ui/Text";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Redux
import { connect } from "react-redux";
import { removeLocation } from "../../redux/actions/user.action";
//Components
import CartIcon from "../../components/CartIcon";

function HomeHeader({ user, removeLocation, navigation, setChooseAddressShown, chooseAddressShown }) {
  let location;
  if (user.savedAddresses.length > 0) {
    location = user.savedAddresses[0].addressName;
  } else if (user.location) {
    location = user.location.city;
  } else {
    location = "Not Selected";
  }
  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.iconicButton, styles.locationButton]}
            onPress={() => {
              if (user.addressConfirmed) {
                setChooseAddressShown(!chooseAddressShown);
              } else {
                navigation.navigate("PinDrop", { existingUser: false });
                removeLocation();
              }
            }}
          >
            <FontAwesome name="map-marker" size={24} color="white" />
          </TouchableOpacity>
          <View style={[styles.tag, styles.locationTag]}>
            <Text style={[styles.tagText]}>{location}</Text>
          </View>
        </View>
        <CartIcon navigation={navigation} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 25,
    marginTop: 50,
    paddingBottom: 10,
  },
  buttonContainer: {
    flex: 0.5,
  },
  iconicButton: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 50,
    width: 62,
    height: 62,
    marginTop: 10,
  },
  locationButton: {
    backgroundColor: "#11203E",
  },
  cartButton: {
    backgroundColor: "#C84D49",
    paddingVertical: 19,
    paddingHorizontal: 20,
    marginLeft: "auto",
    marginRight: 5,
  },
  tag: {
    backgroundColor: "red",
    position: "absolute",
    padding: 7,
    borderRadius: 50,
  },
  tagText: {
    color: "white",
    fontSize: 13,
  },
  locationTag: {
    backgroundColor: "#C84D49",
    marginLeft: 40,
  },
  cartTag: {
    backgroundColor: "#11203E",
    paddingHorizontal: 10,
    paddingVertical: 6,
    top: 0,
    right: 0,
  },
});

const mapStateToProps = (state) => ({
  user: state.userReducer,
});
const mapDispatchToProps = (dispatch) => ({
  removeLocation: () => {
    dispatch(removeLocation());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
