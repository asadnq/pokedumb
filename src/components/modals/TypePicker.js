import React from 'react';
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Modal from 'react-native-modal';

const TypePicker = props => (
  <Modal
    isVisible={props.isVisible}
    animationIn="flash"
    animationOut="fadeOut"
    style={{ alignItems: 'center' }}
    onBackdropPress={props.visibilityHandler}
  >
    <View style={styles.pickTypeModal}>
      <View style={styles.modalHeader}>
        <Text style={[{ fontSize: 18 }]}>Select pokemon type</Text>
      </View>
      <FlatList
        data={props.data}
        keyExtractor={item => 'key ' + item.id}
        renderItem={({ item }) => {
          if (!props.currentData.includes(item)) {
            return (
              <TouchableOpacity
                onPress={() => props.onTypePress(item)}
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  justifyContent: 'center'
                }}
                disabled={props.currentData.includes(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          }
        }}
      />
      <Button title="close" type="outline" onPress={props.visibilityHandler} />
    </View>
  </Modal>
);

const { width, height } = Dimensions.get('window');

export default TypePicker;

const styles = StyleSheet.create({
  modalHeader: {
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 0.8,
    borderColor: '#eee'
  },
  pickTypeModal: {
    backgroundColor: '#fff',
    height: height * 0.45,
    width: '70%',
    flexDirection: 'column',
    borderRadius: 10
  }
});
