import React from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
//UI Components
import Text from "../components/ui/Text";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";

function ReviewOrder({ navigation }) {
  return (
    <View>
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
            Review Order
          </Text>
        </View>
      </SafeAreaView>
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

export default ReviewOrder;
