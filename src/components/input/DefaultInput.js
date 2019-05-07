import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const DefaultInput = props => (
  <Input
    label={[props.label, {...props.labelStyle}]}
    value={props.value}
    containerStyle={[styles.container, {...props.containerStyle}]}
    inputStyle={styles.input}
    inputContainerStyle={[styles.inputContainer, {...props.inputContainerStyle}]}
    labelStyle={styles.label}
    onChangeText={props.onChangeText}
    { ...props}
  />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 100
  },
  input: {
    borderWidth: 0,
    borderRadius: 5,
    color: '#8FCCBE'
  },
  inputContainer: {
    borderBottomColor: 'transparent',
    backgroundColor: '#EEE',
    borderRadius: 4,
    paddingHorizontal: 10
  },
  label: {
    color: '#58B09C',
    marginBottom: 10,
    marginLeft: '1%'
  }
});

export default DefaultInput