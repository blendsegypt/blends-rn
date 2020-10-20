import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
//UI Components
import TextInput from "./ui/TextInput";
import Text from "./ui/Text";
//Icons Font
import { FontAwesome } from "@expo/vector-icons";
//Axios
import Axios from "../utils/axios";
//Lodash debounce
import debounce from "lodash.debounce";

function SearchResult({ name, placeID, setSelectedPlaceID }) {
  return (
    <TouchableOpacity
      style={styles.searchResult}
      onPress={() => setSelectedPlaceID(placeID)}
    >
      <Text style={{ color: "#11203E" }}>{name}</Text>
    </TouchableOpacity>
  );
}

export default function SearchLocation({ navigateToPlaceID }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlaceID, setSelectedPlaceID] = useState("");
  const searchArea = (text) => {
    if (text == "") {
      setSearchResults([]);
      return;
    }
    Axios.get(
      `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${text}&inputtype=textquery&fields=name,geometry&key=AIzaSyAZOGnKWfosXqB9d_jkOS-T55K_b8PPOYY&location=30.82350274,29.58522371&radius=30000`
    ).then((response) => {
      const results = response.data.predictions;
      setSearchResults(results);
    });
  };
  // Debounce Search Area to minimize API requests
  const debouncedSearch = useCallback(debounce(searchArea, 1000), [searchText]);

  // Listen to placeID to navigate in MapView
  useEffect(() => {
    if (selectedPlaceID != "") {
      navigateToPlaceID(selectedPlaceID);
      setSearchResults([]);
      Keyboard.dismiss();
    }
  }, [selectedPlaceID]);

  return (
    <View style={styles.searchContainer}>
      <FontAwesome
        name="search"
        size={16}
        color="#d4d4d4"
        style={styles.searchIcon}
      />
      <TextInput
        onChangeText={(text) => {
          debouncedSearch(text);
        }}
        style={{ paddingLeft: 40 }}
      >
        Search...
      </TextInput>
      <View style={styles.resultsContainer}>
        {searchResults.map((result, index) => {
          return (
            <SearchResult
              setSelectedPlaceID={setSelectedPlaceID}
              placeID={result.place_id}
              name={result.description}
              key={index}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  searchIcon: {
    position: "absolute",
    left: 43,
    zIndex: 99,
    top: 31,
  },
  resultsContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  searchResult: {
    paddingVertical: 20,
    paddingLeft: 15,
    borderBottomColor: "#f6f6f6",
    borderBottomWidth: 1,
  },
});
