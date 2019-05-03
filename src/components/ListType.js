import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import typeColor from '../components/misc/typeColor'

const ListType = props => {

let bgColor = typeColor(props.type)

  return(

  <View style={[{...styles.container, backgroundColor: bgColor}]} key={props.key}>
    <Text style={styles.text}>{props.text}</Text>
  </View>
  )
}

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