import React, {useState} from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
//UI Components
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";
import Link from "../components/ui/Link";
import TextInput from "../components/ui/TextInput";
//Components
import CheckoutProgress from "../components/CheckoutProgress";
import OrderReceipt from "../components/OrderReceipt";
//Bottom Sheets
import ChooseAddress from "../screens/bottomSheets/ChooseAddress";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
  faMapMarkerAlt,
  faChevronLeft,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
//import {FontAwesome5} from '@expo/vector-icons';
//Redux
import {connect} from "react-redux";
import {getCartItems} from "../redux/selectors/cartItems";
//Keyboard Aware ScrollView
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

function ReviewOrder({
  route,
  navigation,
  activeAddress,
  cartItems,
  cartTotal,
  addresses,
}) {
  const {threeStepsCheckout} = route.params;
  const [chooseAddressShown, setChooseAddressShown] = useState(false);
  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      {/* Bottom Sheet Overlay */}
      {chooseAddressShown && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => {
            setChooseAddressShown(false);
          }}></TouchableOpacity>
      )}
      <View style={{flex: 1}}>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Cart");
              }}
              style={{flex: 0.5, paddingTop: 25}}>
              <FontAwesomeIcon icon={faChevronLeft} size={22} color="#11203E" />
            </TouchableOpacity>
            <Text bold style={styles.screenTitle}>
              Review Order
            </Text>
          </View>
        </SafeAreaView>
        {/* Checkout Progress Bar */}
        {threeStepsCheckout ? (
          <CheckoutProgress
            steps={[
              {
                label: "Cart",
                active: true,
              },
              {
                label: "Address Details",
                active: true,
              },
              {
                label: "Review",
                active: true,
              },
            ]}
          />
        ) : (
          <CheckoutProgress
            steps={[
              {
                label: "Cart",
                active: true,
              },
              {
                label: "Review",
                active: true,
              },
            ]}
          />
        )}
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingBottom: 50}}>
          <Text style={styles.containerTitle}>Delivery Details</Text>
          {/* Address / Payment Method */}
          <View style={styles.deliveryDetails}>
            <View
              style={[
                styles.deliveryOption,
                {borderBottomWidth: 1, borderBottomColor: "#EFEFEF"},
              ]}>
              <FontAwesomeIcon
                style={{flex: 0.1, marginRight: 8}}
                icon={faMapMarkerAlt}
                size={20}
                color="#11203E"
              />
              <Text bold style={{flex: 0.7, fontSize: 15, color: "#11203E"}}>
                {activeAddress.nickname}
              </Text>
              <View
                style={{
                  flex: 0.3,
                  alignItems: "flex-end",
                }}>
                {addresses.length > 1 ? (
                  <Link
                    onPress={() => {
                      setChooseAddressShown(true);
                    }}>
                    Change
                  </Link>
                ) : (
                  <Link disabled>Change</Link>
                )}
              </View>
            </View>
            <View style={[styles.deliveryOption, {paddingBottom: 10}]}>
              <FontAwesomeIcon
                style={{flex: 0.5, marginRight: 5}}
                icon={faDollarSign}
                size={20}
                color="#11203E"
              />
              <Text bold style={{flex: 0.7, fontSize: 15, color: "#11203E"}}>
                Cash on Delivery
              </Text>
              <View style={{flex: 0.3, alignItems: "flex-end"}}>
                <Link disabled style={{flex: 0.04}}>
                  Change
                </Link>
              </View>
            </View>
          </View>
          {/* Order Receipt */}
          <Text style={[styles.containerTitle, {marginTop: 20}]}>
            Order Receipt
          </Text>
          <View style={{marginHorizontal: 25}}>
            <OrderReceipt
              cartItems={cartItems}
              cartTotal={cartTotal}
              showPromotionInput
            />
          </View>
        </ScrollView>
        {/* Confirm Button */}
        <View
          style={{
            paddingHorizontal: 25,
            backgroundColor: "#fff",
            paddingVertical: 25,
          }}>
          <Button
            onPress={() => {
              navigation.navigate("OrderConfirmed");
            }}>
            Confirm Order
          </Button>
        </View>
      </View>
      <ChooseAddress
        chooseAddressShown={chooseAddressShown}
        setChooseAddressShown={setChooseAddressShown}
        navigation={navigation}
      />
    </KeyboardAwareScrollView>
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
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15.65,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
    flex: 1,
  },
  containerTitle: {
    color: "#C84D49",
    fontSize: 16,
    paddingHorizontal: 25,
  },
  deliveryDetails: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15.65,
    elevation: 8,
    borderRadius: 25,
    marginTop: 15,
    marginHorizontal: 25,
  },
  deliveryOption: {
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.8,
    zIndex: 99,
  },
});

const mapStateToProps = (state) => {
  const {cartItems, cartTotal} = getCartItems(state);
  return {
    activeAddress: state.userReducer.addresses[0],
    addresses: state.userReducer.addresses,
    cartItems,
    cartTotal,
  };
};

export default connect(mapStateToProps, null)(ReviewOrder);
