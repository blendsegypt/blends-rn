import React, {useState, useEffect} from "react";
import {ScrollView, View, StyleSheet, SafeAreaView, Image} from "react-native";
//UI Components
import Text from "../components/ui/Text";
//Assets
import Sun from "../../assets/Sun.png";
//Components
import Banners from "../components/Banners";
import RecentOrders from "../components/RecentOrders";
import Products from "../components/Products";
//Headers
import HomeHeader from "./HomeHeader";
//Redux
import {connect} from "react-redux";
//Axios instance
import API from "../utils/axios";

function Home({
  setChooseAddressShown,
  navigation,
  firstName,
  loggedIn,
  chooseAddressShown,
  supportedArea,
  addresses,
  branch_id,
}) {
  const [branchOperating, setBranchOperating] = useState(true);
  const [branchClosedMessage, setBranchClosedMessage] = useState("");

  // Check if branch is closed
  useEffect(() => {
    const getBranchStatus = async () => {
      try {
        const response = await API.get(`app/branch/${branch_id}`);
        const branch = response.data.data;
        if (branch.status === "open") {
          // Check for working hours
          const currentDate = new Date();
          const opensAt = branch.working_hours[0].opens_at
            .split(":")
            .map((hour) => Number(hour));
          const closesAt = branch.working_hours[0].closes_at
            .split(":")
            .map((hour) => Number(hour));
          const currentHour = currentDate.getHours();
          const currentMinute = currentDate.getMinutes();
          if (
            currentHour < opensAt[0] ||
            currentHour > closesAt[0] ||
            (currentHour === opensAt[0] && currentMinute < opensAt[1]) ||
            (currentHour === closesAt[0] && currentMinute > closesAt[1])
          ) {
            setBranchOperating(false);
            const {opens_at, closes_at} = branch.working_hours[0];
            setBranchClosedMessage(
              `We're currently closed, Blends operates from ${opens_at} to ${closes_at}`,
            );
          }
          // Check for working days
          const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const holidayDays = days.filter(
            (day) =>
              !branch.working_hours[0].days.find(
                (working_day) => working_day === day,
              ),
          );
          // Check if today is a holiday
          if (holidayDays.includes(days[currentDate.getDay()])) {
            setBranchOperating(false);
            const {opens_at, closes_at} = branch.working_hours[0];
            setBranchClosedMessage(
              `We're currently closed, Blends operates from ${opens_at} to ${closes_at} every day except ${holidayDays.join(
                ",",
              )}`,
            );
          }
        } else if (branch.status === "closed") {
          setBranchOperating(false);
          setBranchClosedMessage(
            "We're not receiving orders temporarly, please check back after 10 minutes!",
          );
        } else if (branch.status === "under_maintenance") {
          setBranchOperating(false);
          setBranchClosedMessage("We're currently under maintenance.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBranchStatus();
  }, []);

  const currentTimePeriod = () => {
    const timeNow = new Date();
    const hours = timeNow.getHours();
    if (hours < 12) {
      return "Morning";
    } else if (hours < 18) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  };
  return (
    <>
      <View style={{backgroundColor: "#fff"}}>
        <HomeHeader
          branchOperating={branchOperating}
          navigation={navigation}
          setChooseAddressShown={setChooseAddressShown}
          chooseAddressShown={chooseAddressShown}
        />
      </View>
      <ScrollView
        style={styles.background}
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.whiteContainer}>
          <SafeAreaView>
            <View>
              {/* Good Morning Message */}
              <View style={styles.goodMorning}>
                <Image source={Sun} />
                <Text style={styles.goodMorningText} regular>
                  Good {currentTimePeriod()},
                </Text>
                <Text
                  style={[styles.goodMorningText, {paddingLeft: 3}]}
                  semiBold>
                  {firstName}!
                </Text>
              </View>
              {/* It's Coffee Time */}
              <View style={styles.coffeeTime}>
                <Text style={styles.coffeeTimeText} semiBold>
                  {branchOperating ? "It's Coffee time!" : "We're closed :("}
                </Text>
                <Text regular style={styles.coffeTimeSlogan}>
                  {branchOperating
                    ? "your fresh coffee is few clicks away from you!"
                    : branchClosedMessage}
                </Text>
              </View>
            </View>
            {/* Banners Section */}
            <View style={{marginTop: 15}}>
              <Banners navigation={navigation} />
            </View>
          </SafeAreaView>
        </View>
        <View style={{marginTop: 30, paddingBottom: 50}}>
          {/* Recent Orders */}
          {loggedIn && <RecentOrders navigation={navigation} />}
          {/* Products */}
          <View style={{marginTop: 20, paddingHorizontal: 25}}>
            <Products
              navigation={navigation}
              supportedArea={supportedArea || addresses.length > 1}
              branch_id={branch_id}
            />
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
  let HomeState = {
    supportedArea: state.userReducer.location.supported,
    addresses: state.userReducer.addresses,
  };

  // Check if user is logged in
  if (state.userReducer.loggedIn) {
    HomeState.firstName = state.userReducer.firstName;
    HomeState.loggedIn = true;
  } else {
    HomeState.firstName = "Guest";
    HomeState.loggedIn = false;
  }

  // Check if user is in a supported area
  if (state.userReducer.location.supported) {
    HomeState.branch_id = state.userReducer.location.area.branch_id;
  }

  return HomeState;
};

export default connect(mapStateToProps, null)(Home);
