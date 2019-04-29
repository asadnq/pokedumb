import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';

const ListType = props => (
  <View style={styles.container}>
    <Text style={styles.text}>{props.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    borderColor: '#ddd',
    borderWidth: 0.78,
    backgroundColor: 'hsla(0, 0%, 06%, .2)',
    borderRadius: 30,
  },
  text: {
    color: '#fff',
  },
});

export default ListType;
