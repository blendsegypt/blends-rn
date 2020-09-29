import React from "react";
import { View, StyleSheet } from "react-native";
//UI Components
import Text from "../../components/ui/Text";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Redux
import { connect } from "react-redux";

function HomeHeader({ user }) {
  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.buttonContainer}>
          <View style={[styles.iconicButton, styles.locationButton]}>
            <FontAwesome name="map-marker" size={24} color="white" />
          </View>
          <View style={[styles.tag, styles.locationTag]}>
            <Text style={[styles.tagText]}>{user.location.city}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={[styles.iconicButton, styles.cartButton]}>
            <FontAwesome name="shopping-cart" size={21} color="white" />
          </View>
          <View style={[styles.tag, styles.cartTag]}>
            <Text style={[styles.tagText]}>5</Text>
          </View>
        </View>
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

export default connect(mapStateToProps, null)(HomeHeader);
