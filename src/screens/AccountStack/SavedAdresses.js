import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
//UI Components
import Text from "../../components/ui/Text";
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
      <ScrollView style={styles.container}>
        {/* Saved Addresses */}
        {savedAddresses.map((address, index) => {
          return (
            <TouchableOpacity style={styles.address} key={index} onPress={() => navigation.navigate("EditAddress", { address })}>
              <View style={{ flex: 0.4, justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", paddingRight: 15, }}>
                  {/* Address Name */}
                  <FontAwesome
                    style={styles.headerChevron}
                    name="map-marker"
                    size={18}
                    color="#11203E"
                  />
                  <Text style={{ fontSize: 15, paddingHorizontal: 5, color: "#11203E" }}>{address.addressName}</Text>
                </View>
                {/* Address Active? */}
                {index == 0 &&
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.activeAddressTag}>
                      <Text style={{ color: "#fff", fontSize: 12 }}>Active</Text>
                    </View>
                  </View>
                }
              </View>
              <View style={{ flex: 0.5 }}>
                {/* Address Location */}
                <Text style={{ fontSize: 14, lineHeight: 19, color: "#9c9c9c" }}>
                  {address.userLocation.region}{"\n"}
                  {address.userLocation.city}{"\n"}
                  {address.userLocation.street}
                </Text>
              </View>
              {/* Chevron Right */}
              <View style={{ flex: 0.1, alignItems: "flex-end", alignSelf: "center" }}>
                <FontAwesome
                  style={styles.headerChevron}
                  name="chevron-right"
                  size={15}
                  color="#9c9c9c"
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
  },
  address: {
    backgroundColor: "red",
    flexDirection: "row",
    padding: 15,
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
    borderRadius: 20,
    marginTop: 25,
  },
  activeAddressTag: {
    backgroundColor: "#C84D49",
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 20,
  }
});

const mapStateToProps = (state) => ({
  savedAddresses: state.userReducer.savedAddresses
});

export default connect(mapStateToProps, null)(SavedAddresses);