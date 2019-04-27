import React from 'react';
import {
  View,
  Picker,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Input, Image, Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

import { addPokemon } from '../store/actions/pokemon';

class AddPokemon extends React.Component {
  constructor() {
    super();
    this.state = {
      control: {
        name: '',
        type: '',
        category: '',
        image: null
      },
      modalVisible: {
        pokemonType: false,
        pickImage: false
      }
    };
  }

  static navigationOptions = {
    headerRight: (<Button title='add' type='clear' onPress={this._addPokemonHandler}/>)
  }

  _addPokemonHandler = () => {

    const { name, category, type } = this.state;

    let image = {
      uri: this.state.control.image.path,
      type: 'image/jpeg',
      name: this.state.control.name
    };

    let data = new FormData();

    data.append('image', image);
    data.append('name', name);
    data.append('category', category);
    data.append('type', type);

    this.props.createPost(data);

    this.setState(state => ({
      ...state,
      control: {
        ...state.control,
        image: null
      }
    }))
  }

  _openLibraryHandler = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    })
      .then(image => {
        this.setState(state => ({
          ...state,
          conrol: {
            ...state.control,
            image
          }
        }));
        this._pickImageModalVisibilityHandler();
      })
      .catch(err => alert('canceled'));
  };

  _openCameraHandler = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    })
      .then(image => {
        this.setState(state => ({
          ...state,
          control: {
            ...state.control,
            image: image
          }
        }));
      })
      .catch(() => alert('open camera canceled'));
  };

  _inputNameHandler = val => {
    this.setState(state => ({
      ...state,
      control: {
        ...state.control,
        name: val
      }
    }));
  };

  _inputCategoryHandler = val => {
    this.setState(state => ({
      ...state,
      control: {
        ...state.control,
        category: val
      }
    }));
  };

  _pickTypeHandler = item => {
    this.setState(state => ({
      control: {
        ...state.control,
        type: item
      }
    }));
    this._typeModalVisibilityHandler();
  };

  _typeModalVisibilityHandler = () => {
    this.setState(state => ({
      ...state,
      modalVisible: {
        ...state.modalVisible,
        pokemonType: !state.modalVisible.pokemonType
      }
    }));
  };

  _pickImageModalVisibilityHandler = () => {
    this.setState(state => ({
      ...state,
      modalVisible: {
        ...state.modalVisible,
        pickImage: !state.modalVisible.pickImage
      }
    }));
  };

  render() {
    return (
      <View>
        <Modal
          isVisible={this.state.modalVisible.pickImage}
          animationIn="flash"
          animationOut="fadeOut"
          style={{ alignItems: 'center' }}
          onBackdropPress={this._pickImageModalVisibilityHandler}
        >
          <View
            style={{
              backgroundColor: '#fff',
              height: '50%',
              width: '70%',
              flexDirection: 'column'
            }}
          >
            <Text>Choose</Text>
            <Button
              type="clear"
              onPress={this._openCameraHandler}
              title="open camera"
            />
            <Button
              type="clear"
              onPress={this._openLibraryHandler}
              title="open galery"
            />
          </View>
        </Modal>
        <Modal
          isVisible={this.state.modalVisible.pokemonType}
          animationIn="flash"
          animationOut="fadeOut"
          style={{ alignItems: 'center' }}
          onBackdropPress={this._typeModalVisibilityHandler}
        >
          <View
            style={{
              backgroundColor: '#fff',
              height: '50%',
              width: '70%',
              flexDirection: 'column'
            }}
          >
            <View
              style={{
                alignItems: 'center',
                padding: 5,
                borderBottomWidth: 0.8,
                borderColor: '#eee'
              }}
            >
              <Text style={{ fontSize: 18 }}>Select pokemon type</Text>
            </View>
            <FlatList
              data={this.props.pokemon_types}
              keyExtractor={item => 'key ' + item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={this._pickTypeHandler.bind(this, item)}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    justifyContent: 'center'
                  }}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Button
              title="close"
              type="outline"
              onPress={this._pickImageModalVisibilityHandler}
            />
          </View>
        </Modal>
        <View>
          <Image placeholder="image" />
        </View>
        <View>
          <Input
            onChangeText={this._inputNameHandler}
            value={this.state.control.name}
            placeholder="Insert pokemon name..."
          />
          <Input
            onChangeText={this._inputCategoryHandler}
            value={this.state.control.category}
            placeholder="Insert pokemon category..."
          />
          <Text>{this.state.control.type.name}</Text>
          <Button
            onPress={this._typeModalVisibilityHandler}
            title="select type"
          />
          <Image
            source={
              this.state.control.image === null
                ? null
                : { uri: this.state.control.image.path }
            }
            containerStyle={styles.imgWrapper}
            style={styles.img}
            placeholder="image"
          />
          <Button
            onPress={this._pickImageModalVisibilityHandler}
            title="pick image"
          />
        </View>
      </View>
    );
  }
}

const mapState = state => ({
  pokemon_types: state.pokemon_type.pokemon_types
});

export default connect(mapState, { addPokemon })(AddPokemon);

const styles = StyleSheet.create({
  imgWrapper: {
      flexDirection: 'row',
      width: '30%',
      height: '100%'
    },
    img: {
      flex: 1,
      alignSelf: 'stretch',
      width: undefined,
      height: undefined
    }
  })