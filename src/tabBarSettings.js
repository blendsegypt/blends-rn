/*
 *
 *  Tab Bar Settings Function
 *
 */
import React from "react";
import { Image } from "react-native";
//Assets
import BlendsIcon from "../assets/BlendsIcon.png";
import BlendsIconGray from "../assets/BlendsIconGray.png";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";

export default ({ route }) => ({
  tabBarIcon: ({ focused }) => {
    if (route.name == "Home") {
      if (focused) {
        return <Image source={BlendsIcon} style={{ width: 22, height: 17 }} />;
      } else {
        return (
          <Image source={BlendsIconGray} style={{ width: 22, height: 17 }} />
        );
      }
    } else if (route.name == "Orders") {
      if (focused) {
        return <FontAwesome name="bars" size={21} color="#C84D49" />;
      } else {
        return <FontAwesome name="bars" size={21} color="#AFAFAF" />;
      }
    } else if (route.name == "Account") {
      if (focused) {
        return <FontAwesome name="user" size={21} color="#C84D49" />;
      } else {
        return <FontAwesome name="user" size={21} color="#AFAFAF" />;
      }
    } else if (route.name == "Support") {
      if (focused) {
        return <FontAwesome name="question" size={21} color="#C84D49" />;
      } else {
        return <FontAwesome name="question" size={21} color="#AFAFAF" />;
      }
    }
  },
});
