import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
import Link from "../../components/ui/Link";
//Bottom Sheet
import BottomSheet from "reanimated-bottom-sheet";
//Components
import Address from "../../components/Address";
//Redux
import { connect } from "react-redux";
//Close Sheet Component
import CloseSheet from "./UserActionsSheets/utils/CloseSheet";

function Sheet({ savedAddresses, setChooseAddressShown, navigation }) {
  const closeSheet = () => {
    setChooseAddressShown(false);
  };
  return (
    <>
      {Platform.OS === "android" && <CloseSheet closeSheet={closeSheet} />}
      <ScrollView
        style={styles.bottomSheetContainer}
        contentContainerStyle={{ paddingBottom: 400 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#11203E", fontSize: 17, paddingLeft: 25 }}>
            Choose Delivery Address
          </Text>
          <Link
            onPress={() => {
              navigation.navigate("PinDrop", { existingUser: true });
            }}
            style={{ marginRight: 25 }}
          >
            Add new Address
          </Link>
        </View>
        {savedAddresses.map((address, index) => {
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
  savedAddresses,
  setChooseAddressShown,
  navigation,
}) {
  if (!savedAddresses) return <View></View>;
  // Sheet ref
  const sheetRef = useRef(null);
  // Snap bottom sheet based on props
  useEffect(() => {
    if (chooseAddressShown) {
      sheetRef.current.snapTo(0);
    } else {
      if (Platform.OS === "ios") sheetRef.current.snapTo(2);
    }
  }, [chooseAddressShown]);
  return (
    <>
      {Platform.OS === "android" ? (
        chooseAddressShown && (
          <BottomSheet
            ref={sheetRef}
            enabledContentTapInteraction={false}
            initialSnap={2}
            snapPoints={Platform.OS == "ios" ? [450, 300, 0] : [1000, 300, 0]}
            borderRadius={10}
            renderContent={() => {
              return (
                <Sheet
                  savedAddresses={savedAddresses}
                  setChooseAddressShown={setChooseAddressShown}
                  navigation={navigation}
                />
              );
            }}
          />
        )
      ) : (
        <BottomSheet
          ref={sheetRef}
          initialSnap={2}
          snapPoints={Platform.OS == "ios" ? [450, 300, 0] : [1000, 300, 0]}
          borderRadius={10}
          renderContent={() => {
            return (
              <Sheet
                savedAddresses={savedAddresses}
                setChooseAddressShown={setChooseAddressShown}
                navigation={navigation}
              />
            );
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    marginTop: 25,
    height: Platform.OS === "ios" ? 750 : Dimensions.get("window").height,
    paddingTop: Platform.OS === "ios" ? 50 : 80,
    backgroundColor: "#fff",
  },
});

const mapStateToProps = (state) => ({
  savedAddresses: state.userReducer.savedAddresses,
});

export default connect(mapStateToProps, null)(ChooseAddress);
