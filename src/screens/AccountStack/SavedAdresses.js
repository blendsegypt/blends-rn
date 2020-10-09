import React from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
//UI Components
import Text from "../../components/ui/Text";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";

function SavedAddresses({ navigation }) { 
  return(
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

export default SavedAddresses;