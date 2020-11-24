import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//UI Components
import Text from '../components/ui/Text';
//Icons Font
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
//Redux
import {connect} from 'react-redux';
//Components
import CartIcon from '../components/CartIcon';

function HomeHeader({
  user,
  navigation,
  setChooseAddressShown,
  chooseAddressShown,
}) {
  let location;
  if (user.addresses.length > 0) {
    location = user.addresses[0].nickname;
  } else if (user.location) {
    if (user.location.supported) {
      location = user.location.area.area_name;
    } else {
      location = 'Unsupported';
    }
  } else {
    location = 'Not Selected';
  }
  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.iconicButton, styles.locationButton]}
            onPress={() => {
              if (user.addressConfirmed) {
                setChooseAddressShown(!chooseAddressShown);
              } else {
                navigation.navigate('PinDrop');
                //removeLocation();
              }
            }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size={24} color="white" />
          </TouchableOpacity>
          <View
            style={[
              styles.tag,
              styles.locationTag,
              location === 'Unsupported' && styles.warningTag,
            ]}>
            <Text style={[styles.tagText]}>{location}</Text>
          </View>
        </View>
        <CartIcon navigation={navigation} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 25,
    marginTop: 50,
    paddingBottom: 10,
  },
  buttonContainer: {
    flex: 0.5,
  },
  iconicButton: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 50,
    width: 62,
    height: 62,
    marginTop: 10,
  },
  locationButton: {
    backgroundColor: '#11203E',
  },
  cartButton: {
    backgroundColor: '#C84D49',
    paddingVertical: 19,
    paddingHorizontal: 20,
    marginLeft: 'auto',
    marginRight: 5,
  },
  tag: {
    backgroundColor: 'red',
    position: 'absolute',
    padding: 7,
    borderRadius: 50,
  },
  warningTag: {
    backgroundColor: '#d48787',
  },
  tagText: {
    color: 'white',
    fontSize: 13,
  },
  locationTag: {
    backgroundColor: '#C84D49',
    marginLeft: 40,
  },
  cartTag: {
    backgroundColor: '#11203E',
    paddingHorizontal: 10,
    paddingVertical: 6,
    top: 0,
    right: 0,
  },
});

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, null)(HomeHeader);
