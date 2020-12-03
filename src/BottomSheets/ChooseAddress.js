import React, {useRef, useEffect, useState} from "react";
import {View, StyleSheet, ScrollView, Dimensions, Platform} from "react-native";
//UI Components
import Text from "../components/ui/Text";
import Link from "../components/ui/Link";
//Bottom Sheet
import BottomSheet from "@gorhom/bottom-sheet";
//Components
import Address from "../components/Address";
//Redux
import {connect} from "react-redux";
//Close Sheet Component
import CloseSheet from "./UserActionsSheets/utils/CloseSheet";

function Sheet({addresses, setChooseAddressShown, navigation, setSnap}) {
  useEffect(() => {
    setSnap(1);
  }, []);
  const closeSheet = () => {
    setChooseAddressShown(false);
  };
  return (
    <>
      {Platform.OS === "android" && <CloseSheet closeSheet={closeSheet} />}
      <ScrollView
        style={styles.bottomSheetContainer}
        contentContainerStyle={{paddingBottom: 400}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text style={{color: "#11203E", fontSize: 17, paddingLeft: 25}}>
            Choose Delivery Address
          </Text>
          <Link
            onPress={() => {
              navigation.navigate("ChooseLocation", {existingUser: true});
            }}
            style={{marginRight: 25}}>
            Add new Address
          </Link>
        </View>
        {addresses.map((address, index) => {
          return (
            <Address
              key={index}
              address={address}
              index={index}
              addressSelection
              setChooseAddressShown={setChooseAddressShown}
            />
          );
        })}
      </ScrollView>
    </>
  );
}

function ChooseAddress({
  chooseAddressShown,
  addresses,
  setChooseAddressShown,
  navigation,
}) {
  // Sheet ref
  const sheetRef = useRef(null);
  const [snap, setSnap] = useState(0);
  useEffect(() => {
    // Snap bottom sheet based on props
    if (chooseAddressShown && Platform.OS === "ios" && sheetRef.current) {
      sheetRef.current.snapTo(snap);
    }
  }, [chooseAddressShown, snap]);

  //if (!addresses) return <View></View>;
  return (
    <View style={{zIndex: 9999}}>
      <BottomSheet
        ref={sheetRef}
        initialSnapIndex={-1}
        snapPoints={[0, "50%"]}
        enabled={false}>
        <Sheet
          setSnap={setSnap}
          addresses={addresses}
          setChooseAddressShown={setChooseAddressShown}
          navigation={navigation}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingTop: Platform.OS === "ios" ? 50 : 80,
    backgroundColor: "#fff",
  },
});

const mapStateToProps = (state) => ({
  addresses: state.userReducer.addresses,
});

export default connect(mapStateToProps, null)(ChooseAddress);
