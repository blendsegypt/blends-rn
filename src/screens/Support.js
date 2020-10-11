import React from "react";
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
//UI Component
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";

function Support() {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={[styles.header, { justifyContent: "center" }]}>
          <Text bold style={styles.screenTitle}>
            Support
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.container}>
        <Button
          icon="commenting"
          textColor="#437FD9"
          style={{ backgroundColor: "#EBF1FF" }}
        >
          Talk to Support
        </Button>
        <Button style={{ marginTop: 10 }} secondary icon="heart">Rate Blends on Appstore</Button>
      </ScrollView>
    </View >
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
    paddingTop: 25,
  }
});

export default Support;
