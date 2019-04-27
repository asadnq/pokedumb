import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';


const FAB = props => (
  <Button
    onPress={props.onPress}
    containerStyle={styles.FABContainer}
    buttonStyle={styles.FAB}
    type='solid'
    icon={
      <Icon
        name={props.iconName}
        size={props.iconSize}
        color={props.iconColor}
      />
    }
  />
);

export default FAB;

const styles = StyleSheet.create({
    FABContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    FAB: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
})