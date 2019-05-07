import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Modal from 'react-native-modal';

const ImagePicker = props => (
  <Modal
    isVisible={props.isVisible}
    animationIn="flash"
    animationOut="fadeOut"
    style={{ alignItems: 'center' }}
    onBackdropPress={props.onBackdropPress}
  >
    <View style={styles.pickImageModal}>
      <View style={styles.modalHeader}>
        <Text style={{ fontWeight: 'bold', fontSize: width * 0.05 }}>
          Choose...
        </Text>
      </View>
      <View style={{ flexDirection: 'column', height: '85%' }}>
        <Button
          type="clear"
          onPress={props.cameraButtonOnPress}
          title="open camera"
          titleStyle={{ fontWeight: 'bold' }}
        />
        <Button
          type="clear"
          onPress={props.libraryButtonOnPress}
          title="open galery"
        />
        <Button
          type="clear"
          title="close"
          onPress={props.visibilityHandler}
          containerStyle={styles.cancelButtonContainer}
        />
      </View>
    </View>
  </Modal>
);

export default ImagePicker;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  pickImageModal: {
    backgroundColor: '#fff',
    height: height * 0.45,
    width: '70%',
    flexDirection: 'column',
    borderRadius: 10
  },
  modalHeader: {
    borderBottomColor: '#eee',
    borderBottomWidth: 0.87,
    width: '100%',
    padding: '3%',
    height: '15%',
    alignItems: 'center'
  },
  cancelButtonContainer: {
    borderTopColor: '#333'
  }
});
