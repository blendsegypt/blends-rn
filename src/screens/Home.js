import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
//UI Components
import Text from "../components/ui/Text";
//Redux
import { connect } from "react-redux";
//Screens
import PinDrop from "../screens/PinDrop";

function Home({ user }) {
  // If no address is selected show the pin location screen
  if (!user.location) return <PinDrop />;

  return (
    <SafeAreaView>
      <Text>Homepage</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, null)(Home);
