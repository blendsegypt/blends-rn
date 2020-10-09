import React, { useEffect } from "react";
import { View, StyleSheet, Image, SafeAreaView } from "react-native";
//UI Components
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";
//Assets
import OrderConfirmedIllustration from "../../assets/OrderConfirmedIllustration.png";
//Redux
import { connect } from "react-redux";
import { resetCart } from "../redux/actions/cart.action";

function OrderConfirmed({ navigation, resetCart }) {
  //Reset the cart
  useEffect(() => {
    resetCart();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <SafeAreaView>
          <View style={{ alignItems: "center", marginTop: 100 }}>
            <Image
              source={OrderConfirmedIllustration}
              style={{ width: 305, height: 264 }}
            />
            <Text semiBold style={styles.title}>
              Order Confirmed!
            </Text>
            <Text regular style={styles.message}>
              You can expect your coffee to arrive in less than{" "}
              <Text bold>30 minutes</Text>
            </Text>
          </View>
        </SafeAreaView>
      </View>
      <View
        style={{
          paddingHorizontal: 25,
          backgroundColor: "#fff",
          paddingBottom: 25,
        }}
      >
        <Button secondary style={{ marginBottom: 10 }}>
          Track your Order
        </Button>
        <Button
          blends
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          Return to Store
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 27,
    color: "#11203E",
    paddingTop: 20,
    paddingHorizontal: 25,
    textAlign: "center",
  },
  message: {
    paddingHorizontal: 25,
    textAlign: "center",
    color: "#A1A1A1",
    fontSize: 17,
    lineHeight: 22,
  },
});

const mapDispatchToProps = (dispatch) => ({
  resetCart: () => {
    dispatch(resetCart());
  },
});

export default connect(null, mapDispatchToProps)(OrderConfirmed);
