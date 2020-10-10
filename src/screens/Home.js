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
//Assets
import Sun from "../../assets/Sun.png";
//Components
import Banners from "../components/Banners";
import RecentOrders from "../components/RecentOrders";
import Products from "../components/Products";
//Headers
import HomeHeader from "./headers/HomeHeader";
//Redux
import { connect } from "react-redux";

function Home({ navigation, firstName }) {
  return (
    <>
      <View style={{ backgroundColor: "#fff" }}>
        <HomeHeader navigation={navigation} />
      </View>
      <ScrollView
        style={styles.background}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.whiteContainer}>
          <SafeAreaView>
            <View>
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
                  {firstName}!
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
        <View style={{ marginTop: 30, paddingBottom: 50 }}>
          {/* Recent Orders */}
          <RecentOrders navigation={navigation} />
          {/* Products */}
          <View style={{ marginTop: 20, paddingHorizontal: 25 }}>
            <Products navigation={navigation} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.tabBarOverlay}></View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
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
    marginHorizontal: 25,
  },
  goodMorningText: {
    color: "#8E6B39",
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 10,
  },
  coffeeTime: {
    marginTop: 15,
    marginHorizontal: 25,
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
  tabBarOverlay: {
    width: 100,
    height: 30,
  },
});

const mapStateToProps = (state) => {
  if (state.userReducer.phoneNumberConfirmed) {
    const firstName = state.userReducer.fullName.split(" ")[0];
    return {
      firstName,
    };
  }
  return {
    firstName: "guest",
  };
};

export default connect(mapStateToProps, null)(Home);
