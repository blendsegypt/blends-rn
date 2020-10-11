import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
//UI Components
import Text from "../components/ui/Text";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Redux
import { connect } from "react-redux";
import { switchActiveAddress } from "../redux/actions/user.action";

function Address({ navigation, address, index, addressSelection, switchActiveAddress, setChooseAddressShown }) {
  //Address in Address Selection screen
  if (addressSelection) {
    return (
      <TouchableOpacity
        style={[styles.address]}
        onPress={() => {
          switchActiveAddress(address.addressName);
          setChooseAddressShown(false);
        }}
      >
        <View style={{ flex: 0.5, justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", paddingRight: 15, }}>
            {/* Address Name */}
            <FontAwesome
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
      </TouchableOpacity>
    );
  }
  //Address in Saved addresses screen
  return (
    <TouchableOpacity style={styles.address} onPress={() => navigation.navigate("EditAddress", { address, newAddress: false })}>
      <View style={{ flex: 0.4, justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", paddingRight: 15, }}>
          {/* Address Name */}
          <FontAwesome
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
}

const styles = StyleSheet.create({
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

const mapDispatchToProps = (dispatch) => ({
  switchActiveAddress: (addressName) => {
    dispatch(switchActiveAddress(addressName));
  }
});

export default connect(null, mapDispatchToProps)(Address);