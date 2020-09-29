import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
//UI Components
import Text from "../components/ui/Text";
//Redux
import { connect } from "react-redux";
//Screens
import PinDrop from "../screens/PinDrop";
//Icon fonts
import { FontAwesome } from "@expo/vector-icons";
//Assets
import Sun from "../../assets/Sun.png";
//Components
import Banners from "../components/Banners";
import RecentOrders from "../components/RecentOrders";

function Home({ user }) {
  // If no address is selected show the pin location screen
  if (!user.location) return <PinDrop />;

  return (
    <>
      <View style={styles.whiteContainer}>
        <SafeAreaView>
          <View style={{ paddingHorizontal: 25 }}>
            {/* Good Morning Message */}
            <View style={styles.goodMorning}>
              <Image source={Sun} />
              <Text style={styles.goodMorningText} regular>
                Good Morning,
              </Text>
              <Text
                style={[styles.goodMorningText, { paddingLeft: 3 }]}
                semiBold
              >
                guest!
              </Text>
            </View>
            {/* It's Coffee Time */}
            <View style={styles.coffeeTime}>
              <Text style={styles.coffeeTimeText} semiBold>
                It's Coffee time!
              </Text>
              <Text regular style={styles.coffeTimeSlogan}>
                your fresh coffee is few clicks away from you!
              </Text>
            </View>
          </View>
          {/* Banners Section */}
          <View style={{ marginTop: 15 }}>
            <Banners />
          </View>
        </SafeAreaView>
      </View>
      <View style={{ paddingHorizontal: 25, marginTop: 40 }}>
        {/* Recent Orders */}
        <RecentOrders />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  whiteContainer: {
    backgroundColor: "white",
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
    paddingBottom: 20,
  },
  goodMorning: {
    flexDirection: "row",
    backgroundColor: "#FFF2E0",
    marginTop: 10,
    borderRadius: 25,
    padding: 20,
  },
  goodMorningText: {
    color: "#8E6B39",
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 10,
  },
  coffeeTime: {
    marginTop: 15,
  },
  coffeeTimeText: {
    fontSize: 33,
    color: "#C84D49",
  },
  coffeTimeSlogan: {
    fontSize: 16,
    color: "#999",
    paddingTop: 2,
  },
});

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, null)(Home);
