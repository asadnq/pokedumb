import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Text, Image, Input, Button, SearchBar } from 'react-native-elements';

const HeaderSearch = props => {
  return (
    <View style={styles.header}>
      <SearchBar
        searchIcon={{
          name: 'search',
          type: 'material',
          color: '#A0B3AE'
        }}
        clearIcon={{
          name: 'close',
          type: 'material',
          color: '#A0B3AE'
        }}
        onChangeText={props.searchProps.onChangeText}
        placeholder={props.searchProps.placeholder}
        value={props.searchProps.value}
        inputContainerStyle={styles.inputContainer}
        containerStyle={styles.searchContainer}
        inputStyle={styles.input}
        placeholderTextColor="#CFE6E1"
      />
      <Button
        title="filter"
        titleStyle={styles.filterButtonTitle}
        containerStyle={styles.filterButtonContainer}
        buttonStyle={styles.filterButton}
        onPress={props.onFilterButtonPress}
      />
    </View>
  );
};

export default HeaderSearch;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    width: width,
    backgroundColor: '#58B09C',
    height: height * 0.075,
    paddingHorizontal: width * 0.025,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 18
  },
  searchContainer: {
    width: '70%',
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  inputContainer: {
    backgroundColor: '#4D9987'
  },
  input: {
    color: '#DAF2ED'
  },
  filterButtonContainer: {
    width: '30%'
  },
  filterButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 1,
    borderColor: '#DAF2ED'
  },
  filterButtonTitle: {
    color: '#DAF2ED'
  }
});
