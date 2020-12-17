import React, {useState, useEffect} from "react";
import {ScrollView, View, StyleSheet, SafeAreaView, Image} from "react-native";
//UI Components
import Text from "../../components/ui/Text";
//Assets
import Sun from "../../../assets/Sun.png";
//Redux
import {connect} from "react-redux";
//Toast Messages
import Toast from "react-native-toast-message";
//Screen Components
import Header from "./components/Header";
//Screen Helpers
import getTimeName from "./helpers/getTimeName";
import getBranchStatus from "./helpers/getBranchStatus";
import getBanners from "./helpers/getBanners";
//Screen Components
import Banners from "./components/Banners";
import RecentOrders from "./components/RecentOrders";
import Products from "./components/Products";

function Home({
  setChooseAddressShown,
  navigation,
  firstName,
  loggedIn,
  chooseAddressShown,
  supportedArea,
  addresses,
  branchID,
}) {
  const [branchOperating, setBranchOperating] = useState(true);
  const [branchClosedMessage, setBranchClosedMessage] = useState("");
  //Banners
  const [bannersLoaded, setBannersLoaded] = useState(false);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        // Check if branch is closed if user belongs to a branch
        if (supportedArea) {
          const [operating, closedMessage] = await getBranchStatus(branchID);
          if (!operating) {
            setBranchOperating(false);
            setBranchClosedMessage(closedMessage);
          }
        }
        // Load banners
        const fetchedBanners = await getBanners();
        setBannersLoaded(true);
        setBanners(fetchedBanners);
      } catch (error) {
        Toast.show({
          type: "error",
          topOffset: 70,
          visibilityTime: 2000,
          text1: "An Error Occured",
          text2:
            "Something wrong happened while loading banners, sorry about that!",
        });
      }
    })();
  }, []);

  return (
    <>
      <View style={{backgroundColor: "#fff"}}>
        <Header
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
                  Good {getTimeName()},
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
              <Banners
                supportedArea={supportedArea}
                navigation={navigation}
                bannersLoaded={bannersLoaded}
                banners={banners}
              />
            </View>
          </SafeAreaView>
        </View>
        <View style={{marginTop: 30, paddingBottom: 50}}>
          {/* Recent Orders */}
          {loggedIn && (
            <RecentOrders
              navigation={navigation}
              branchID={branchID}
              supportedArea={supportedArea}
            />
          )}
          {/* Products */}
          <View style={{marginTop: 20, paddingHorizontal: 25}}>
            <Products
              navigation={navigation}
              supportedArea={supportedArea || addresses.length > 1}
              branchID={branchID}
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
    HomeState.branchID = state.userReducer.location.Area.Branches[0].id;
  }

  // Check if user already has an address
  if (state.userReducer.addresses[0]) {
    HomeState.branchID = state.userReducer.addresses[0].Area.Branches[0].id;
    HomeState.supportedArea = true;
  }

  return HomeState;
};

export default connect(mapStateToProps, null)(Home);
