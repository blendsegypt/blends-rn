import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";
//Components
import Address from "../../components/Address";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Redux
import { connect } from "react-redux";

function SavedAddresses({ navigation, savedAddresses }) {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Account");
            }}
            style={{ flex: 0.5, paddingTop: 25 }}
          >
            <FontAwesome
              style={styles.headerChevron}
              name="chevron-left"
              size={22}
              color="#11203E"
            />
          </TouchableOpacity>
          <Text bold style={styles.screenTitle}>
            Saved Addresses
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Saved Addresses */}
        {savedAddresses.map((address, index) => {
          return (
            <Address key={index} navigation={navigation} address={address} index={index} />
          );
        })}
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 25,
          backgroundColor: "#fff",
          paddingBottom: 110,
          paddingTop: 10,
        }}
      >
        <Button
          icon="map-marker"
          onPress={() => {
            navigation.navigate("PinDrop", { existingUser: true });
          }}
        >
          Add New Address
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 25,
    marginTop: 10,
    flexDirection: "row",
  },
  screenTitle: {
    fontSize: 25,
    paddingTop: 20,
  },
  container: {
    marginTop: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15.65,
    elevation: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }
});

const mapStateToProps = (state) => ({
  savedAddresses: state.userReducer.savedAddresses
});

export default connect(mapStateToProps, null)(SavedAddresses);