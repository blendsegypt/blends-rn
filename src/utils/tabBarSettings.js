/*
 *
 *  Tab Bar Settings Function
 *
 */
import React from "react";
import {Image} from "react-native";
//Assets
import BlendsIcon from "../../assets/BlendsIcon.png";
import BlendsIconGray from "../../assets/BlendsIconGray.png";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBars, faUser, faQuestion} from "@fortawesome/free-solid-svg-icons";

export default ({route}) => ({
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
