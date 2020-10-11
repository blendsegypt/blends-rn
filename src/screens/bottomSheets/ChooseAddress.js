import React, { useRef, useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import Link from "../../components/ui/Link";
//Bottom Sheet
import BottomSheet from 'reanimated-bottom-sheet';
//Components
import Address from "../../components/Address";
//Redux
import { connect } from "react-redux";

function Sheet({ savedAddresses, setChooseAddressShown, navigation }) {
  return (
    <ScrollView style={styles.bottomSheetContainer} contentContainerStyle={{ paddingBottom: 400, }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ color: "#11203E", fontSize: 17, }}>Choose Delivery Address</Text>
        <Link onPress={() => { navigation.navigate("PinDrop", { existingUser: true }); }}>Add new Address</Link>
      </View>
      {savedAddresses.map((address, index) => {
        return (
          <Address key={index} address={address} index={index} addressSelection setChooseAddressShown={setChooseAddressShown} />
        );
      })}
    </ScrollView>
  );
}

function ChooseAddress({ chooseAddressShown, savedAddresses, setChooseAddressShown, navigation }) {
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
      renderContent={() => {
        return <Sheet savedAddresses={savedAddresses} setChooseAddressShown={setChooseAddressShown} navigation={navigation} />
      }}
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

const mapStateToProps = (state) => ({
  savedAddresses: state.userReducer.savedAddresses
});

export default connect(mapStateToProps, null)(ChooseAddress);