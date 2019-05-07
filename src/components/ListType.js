import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Badge } from 'react-native-elements';
import typeColor from '../components/misc/typeColor';

const { width, height } = Dimensions.get('window');

const ListType = props => {
  let bgColor = typeColor(props.type);

  return (
    <Badge
      value={props.text}
      badgeStyle={StyleSheet.flatten([
        {
          backgroundColor: bgColor,
          paddingHorizontal: width * 0.005,
          paddingVertical: width * 0.00085
        }
      ])}
    {...props}
    />
  );
};

export default ListType;