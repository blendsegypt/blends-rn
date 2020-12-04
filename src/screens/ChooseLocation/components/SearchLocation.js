import React, {useEffect, useState, useCallback} from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
//UI Components
import TextInput from "../../../components/ui/TextInput";
import Text from "../../../components/ui/Text";
//Icons Font
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
//Axios
import Axios from "../../../utils/axios";
//Lodash debounce
import debounce from "lodash.debounce";

function SearchResult({name, placeID, setSelectedPlaceID}) {
  return (
    <TouchableOpacity
      style={styles.searchResult}
      onPress={() => setSelectedPlaceID(placeID)}>
      <Text style={{color: "#11203E"}}>{name}</Text>
    </TouchableOpacity>
  );
}

export default function SearchLocation({navigateToPlaceID, coordinates}) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlaceID, setSelectedPlaceID] = useState("");
  const searchArea = async (text) => {
    // Empty search query
    if (text === "") {
      setSearchResults([]);
      return;
    }
    // Destruct coordinates to apply location bias
    const [lat, lng] = coordinates;
    const response = await Axios.get(
      `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${text}&inputtype=textquery&fields=name,geometry&key=AIzaSyAZOGnKWfosXqB9d_jkOS-T55K_b8PPOYY&location=${lat},${lng}&radius=100000`,
    );
    const results = [...response.data.predictions];
    // Filter for only inside-Egypt results
    const egyptResults = results.filter((result) => {
      return result.terms[result.terms.length - 1].value === "Egypt";
    });
    setSearchResults(egyptResults);
  };
  // Debounce Search Area to minimize API requests
  const debouncedSearch = useCallback(debounce(searchArea, 1000), [searchText]);

  //Listen to placeID to navigate in MapView
  useEffect(() => {
    if (selectedPlaceID !== "") {
      navigateToPlaceID(selectedPlaceID);
      setSearchResults([]);
      Keyboard.dismiss();
    }
  }, [selectedPlaceID]);

  return (
    <View style={styles.searchContainer}>
      <FontAwesomeIcon
        icon={faSearch}
        size={16}
        color="#d4d4d4"
        style={styles.searchIcon}
      />
      <TextInput
        onChangeText={(text) => {
          debouncedSearch(text);
        }}
        style={{paddingLeft: 40}}>
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
