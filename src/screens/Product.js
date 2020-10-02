import React from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
//UI Components
import Text from "../components/ui/Text";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Components
import CartIcon from "../components/CartIcon";

function Product({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <FontAwesome
            style={styles.headerChevron}
            name="chevron-left"
            size={22}
            color="#11203E"
          />
        </TouchableOpacity>
        <CartIcon />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 25,
    marginTop: 30,
    flexDirection: "row",
  },
});

export default Product;
