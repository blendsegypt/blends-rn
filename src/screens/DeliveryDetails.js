import React from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
//UI Components
import Text from "../components/ui/Text";
import TextInput from "../components/ui/TextInput";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Components
import CheckoutProgress from "../components/CheckoutProgress";
//Redux
import { connect } from "react-redux";

function DeliveryDetails({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cart");
            }}
            style={{ flex: 0.5, paddingTop: 25 }}
          >
            <FontAwesome name="chevron-left" size={22} color="#11203E" />
          </TouchableOpacity>
          <Text bold style={styles.screenTitle}>
            Delivery Details
          </Text>
        </View>
      </SafeAreaView>
      <CheckoutProgress
        steps={[
          {
            label: "Cart",
            active: true,
          },
          {
            label: "Delivery Details",
            active: true,
          },
          {
            label: "Confirm",
            active: false,
          },
        ]}
      />
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
});

const mapStateToProps = (state) => ({});

export default DeliveryDetails;
