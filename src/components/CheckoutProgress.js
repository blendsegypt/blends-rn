import React from "react";
import { View, StyleSheet } from "react-native";
// UI Components
import Text from "./ui/Text";

function CheckoutProgress({ steps }) {
  // Padding array used to add proper padding for either 2 / 3 steps progress bar
  const labelsPadding = [10, 50, 50];
  return (
    <View
      style={{
        paddingHorizontal: 25,
        marginTop: 30,
        marginBottom: 50,
      }}
    >
      {/* Progress Bar */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {steps.map((step, index) => {
          const lastIndex = steps.length - 1;
          return (
            <>
              <View
                style={[
                  styles.circle,
                  step.active ? { backgroundColor: "#64AB84" } : {},
                ]}
              ></View>
              {index != lastIndex && (
                <View
                  style={[
                    styles.bar,
                    steps[index + 1].active
                      ? { backgroundColor: "#64AB84" }
                      : {},
                  ]}
                ></View>
              )}
            </>
          );
        })}
      </View>
      {/* Progress Labels */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 5,
        }}
      >
        {steps.map((step, index) => {
          return (
            <Text
              regular
              style={{
                color: step.active ? "#64AB84" : "#BBBBBB",
                paddingLeft: labelsPadding[index],
              }}
            >
              {step.label}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "#D0D0D0",
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  bar: {
    backgroundColor: "#D0D0D0",
    width: 110,
    height: 2,
    marginTop: 5,
  },
});

export default CheckoutProgress;
