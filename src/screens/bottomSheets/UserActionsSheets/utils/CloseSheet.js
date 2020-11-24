import React from 'react';
import {View, TouchableOpacity} from 'react-native';
//Icons font
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

export default function CloseSheet({closeSheet}) {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          closeSheet();
        }}
        style={{
          backgroundColor: '#d6d6d6',
          padding: 19,
          paddingHorizontal: 20,
          position: 'absolute',
          top: 40,
          zIndex: 9999,
          borderRadius: 100,
        }}>
        <FontAwesomeIcon icon={faTimes} size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
