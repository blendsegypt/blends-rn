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

import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
//Icons Fonts
import { FontAwesome } from "@expo/vector-icons";

export default function Stars({ onChange, initialStars }) {
  const [stars, setStars] = useState(initialStars);
  return [...Array(5)].map((star, index) => {
    let color = "#ECECEC";
    if (index < stars) color = "#F4E385";
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setStars(index + 1);
          if (onChange) onChange(index + 1);
        }}
      >
        <FontAwesome
          name="star"
          size={24}
          color={color}
          style={{ paddingRight: 5 }}
        />
      </TouchableOpacity>
    );
  });
}
