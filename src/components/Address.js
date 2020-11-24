import React from "react";
import {TouchableOpacity, View, StyleSheet} from "react-native";
//UI Components
import Text from "../components/ui/Text";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
  faMapMarkerAlt,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
//Redux
import {connect} from "react-redux";
import {switchActiveAddress} from "../redux/actions/user.action";

function Address({
  navigation,
  address,
  index,
  addressSelection,
  switchActiveAddress,
  setChooseAddressShown,
}) {
  //Address in Address Selection screen
  if (addressSelection) {
    return (
      <TouchableOpacity
        style={[styles.address]}
        onPress={() => {
          switchActiveAddress(address.addressNickname);
          setChooseAddressShown(false);
        }}>
        <View style={{flex: 0.5, justifyContent: "space-between"}}>
          <View style={{flexDirection: "row", paddingRight: 15}}>
            {/* Address Nickname */}
            <FontAwesomeIcon icon={faMapMarkerAlt} size={18} color="#11203E" />
            <Text
              style={{fontSize: 15, paddingHorizontal: 5, color: "#11203E"}}>
              {address.addressNickname}
            </Text>
          </View>
          {/* Address Active? */}
          {index == 0 && (
            <View style={{flexDirection: "row"}}>
              <View style={styles.activeAddressTag}>
                <Text style={{color: "#fff", fontSize: 12}}>Active</Text>
              </View>
            </View>
          )}
        </View>
        <View style={{flex: 0.5}}>
          {/* Address Location */}
          <Text style={{fontSize: 14, lineHeight: 19, color: "#9c9c9c"}}>
            {address.formattedAddress}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  //Address in Saved addresses screen
  return (
    <TouchableOpacity
      style={styles.address}
      onPress={() =>
        navigation.navigate("EditAddress", {address, newAddress: false})
      }>
      <View style={{flex: 0.4, justifyContent: "space-between"}}>
        <View style={{flexDirection: "row", paddingRight: 15}}>
          {/* Address Nickname */}
          <FontAwesomeIcon icon={faMapMarkerAlt} size={18} color="#11203E" />
          <Text style={{fontSize: 15, paddingHorizontal: 5, color: "#11203E"}}>
            {address.addressNickname}
          </Text>
        </View>
        {/* Address Active? */}
        {index == 0 && (
          <View style={{flexDirection: "row"}}>
            <View style={styles.activeAddressTag}>
              <Text style={{color: "#fff", fontSize: 12}}>Active</Text>
            </View>
          </View>
        )}
      </View>
      <View style={{flex: 0.5}}>
        {/* Address Location */}
        <Text style={{fontSize: 14, lineHeight: 19, color: "#9c9c9c"}}>
          {address.formattedAddress}
        </Text>
      </View>
      {/* Chevron Right */}
      <View style={{flex: 0.1, alignItems: "flex-end", alignSelf: "center"}}>
        <FontAwesomeIcon
          style={styles.headerChevron}
          icon={faChevronRight}
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
    marginHorizontal: 25,
  },
  activeAddressTag: {
    backgroundColor: "#C84D49",
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 20,
    marginTop: 15,
  },
});

const mapDispatchToProps = (dispatch) => ({
  switchActiveAddress: (addressName) => {
    dispatch(switchActiveAddress(addressName));
  },
});

export default connect(null, mapDispatchToProps)(Address);
