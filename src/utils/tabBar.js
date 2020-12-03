/*
 *
 *  Tab Bar Settings & Styling
 *
 */
import React from "react";
import {Image, StyleSheet} from "react-native";
//Assets
import BlendsIcon from "../../assets/BlendsIcon.png";
import BlendsIconGray from "../../assets/BlendsIconGray.png";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBars, faUser, faQuestion} from "@fortawesome/free-solid-svg-icons";

export const tabBarSettings = ({route}) => ({
  tabBarIcon: ({focused}) => {
    if (route.name == "Home") {
      if (focused) {
        return <Image source={BlendsIcon} style={{width: 24, height: 19}} />;
      } else {
        return (
          <Image source={BlendsIconGray} style={{width: 24, height: 19}} />
        );
      }
    } else if (route.name == "Orders") {
      if (focused) {
        return <FontAwesomeIcon icon={faBars} size={21} color="#C84D49" />;
      } else {
        return <FontAwesomeIcon icon={faBars} size={21} color="#AFAFAF" />;
      }
    } else if (route.name == "Account") {
      if (focused) {
        return <FontAwesomeIcon icon={faUser} size={21} color="#C84D49" />;
      } else {
        return <FontAwesomeIcon icon={faUser} size={21} color="#AFAFAF" />;
      }
    } else if (route.name == "Support") {
      if (focused) {
        return <FontAwesomeIcon icon={faQuestion} size={21} color="#C84D49" />;
      } else {
        return <FontAwesomeIcon icon={faQuestion} size={21} color="#AFAFAF" />;
      }
    }
  },
});

export const tabBarStyle = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: "#fff",
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15.65,
    elevation: 8,
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: "#fff",
    paddingBottom: 0,
    borderTopWidth: 0,
    minHeight: 70,
  },
});
