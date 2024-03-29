/*
 *
 *  Stars.js
 *  Custom component rating Stars
 *
 *  @Usage:
 *  <Stars
 *    onChange={() => fn() }
 *    initialStars={Number}
 *  />
 *
 */

import React, {useState} from "react";
import {TouchableOpacity} from "react-native";
//Icons Fonts
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

export default function Stars({onChange, initialStars, alreadyRated}) {
  const [stars, setStars] = useState(initialStars);
  const [rated, setRated] = useState(alreadyRated);
  return [...Array(5)].map((star, index) => {
    let color = "#ECECEC";
    if (index < stars) color = "#F4E385";
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          if (rated) return;
          setStars(index + 1);
          if (onChange) onChange(index + 1);
          setRated(true);
        }}>
        <FontAwesomeIcon
          icon={faStar}
          size={24}
          color={color}
          style={{paddingRight: 5}}
        />
      </TouchableOpacity>
    );
  });
}
