import React, { useRef, useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import BottomSheet from 'reanimated-bottom-sheet';

function renderContent() {
  return (
    <ScrollView style={styles.bottomSheetContainer}>
      <Text>testtestesteste</Text>
    </ScrollView>
  );
}

function ChooseAddress({ chooseAddressShown }) {
  // Sheet ref
  const sheetRef = useRef(null);
  // Snap bottom sheet based on props
  useEffect(() => {
    if (chooseAddressShown) {
      sheetRef.current.snapTo(0);
    } else {
      sheetRef.current.snapTo(2);
    }
  }, [chooseAddressShown]);
  return (
    <BottomSheet
      ref={sheetRef}
      initialSnap={2}
      snapPoints={[450, 300, 0]}
      borderRadius={10}
      renderContent={renderContent}
    />
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: 750,
    paddingTop: 50,
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
});

export default ChooseAddress;