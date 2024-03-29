import React from "react";
import {View, StyleSheet} from "react-native";
// UI Components
import Text from "./ui/Text";

function CheckoutProgress({steps}) {
  // Padding array used to add proper padding for either 2 / 3 steps progress bar
  const twoStepsPadding = [10, 90];
  const threeStepsPadding = [10, 55, 50];
  return (
    <View
      style={{
        paddingHorizontal: 25,
        marginVertical: 30,
      }}>
      {/* Progress Bar */}
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        {steps.map((step, index) => {
          const lastIndex = steps.length - 1;
          return (
            <React.Fragment key={index}>
              <View
                style={[
                  styles.circle,
                  step.active ? {backgroundColor: "#64AB84"} : {},
                ]}></View>
              {index != lastIndex && (
                <View
                  style={[
                    styles.bar,
                    steps[index + 1].active ? {backgroundColor: "#64AB84"} : {},
                  ]}></View>
              )}
            </React.Fragment>
          );
        })}
      </View>
      {/* Progress Labels */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 5,
        }}>
        {steps.map((step, index) => {
          return (
            <View key={index}>
              <Text
                regular
                style={{
                  color: step.active ? "#64AB84" : "#BBBBBB",
                  paddingLeft:
                    steps.length == 2
                      ? twoStepsPadding[index]
                      : threeStepsPadding[index],
                }}>
                {step.label}
              </Text>
            </View>
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
