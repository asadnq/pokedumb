import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Button, Input, Text, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationEvents } from 'react-navigation';

import { updatePokemon } from '../store/actions/pokemon';
import { POKEMON_IMG_PATH } from '../config/url.config';
import typeColor from '../components/misc/typeColor';

class EditPokemon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      control: {
        name: '',
        category: '',
        image: {
          path:  ''
        },
        type: [],
        latitude: 0.0,
        longitude: 0
      },
      modalVisible: {
        pokemonType: false,
        pickImage: false
      },
      imageReplaced: false
    };
  }

  _updatePokemonHandler = () => {
    const { name, category, type, latitude, longitude } = this.state.control;

    let data = new FormData();

    if (this.state.imageReplaced) {
      let image = {
        uri: this.state.control.image.path,
        type: 'image/jpeg',
        name: this.state.control.name
      };
      data.append('image', image);
    }
    data.append('name', name);
    data.append('type', JSON.stringify(type));
    data.append('category', category);
    data.append('latitude', latitude)
    data.append('longitude', longitude)

    this.props.updatePokemon(this.props.pokemon.id, data);

    this.setState(state => ({
      ...state,
      control: {
        ...state.control,
        name: '',
        type: [],
        category: '',
        latitude: 0,
        longitude: 0
      }
    }));
  };

  _openLibraryHandler = () => {
    ImagePicker.openPicker({
      cropping: true
    })
      .then(image => {
        this.setState(state => ({
          ...state,
          control: {
            ...state.control,
            image: image
          },
          imageReplaced: true
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
            image: image,
            imageReplaced: true
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
      ...state,
      control: {
        ...state.control,
        type: state.control.type.concat(item)
      }
    }));
    this._typeModalVisibilityHandler();
  };

  _removeTypehandler = id => {
    this.setState(state => ({
      ...state,
      control: {
        ...state.control,
        type: state.control.type.filter(item => item.id !== id)
      }
    }));
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

  _setCoordinate = coords => {
    this.setState(state => ({
      ...state,
      control: {
        ...state.control,
      latitude: coords.latitude,
      longitude: coords.longitude
      }
    }));
  };

  _toPickLocation = () => {
    this.props.navigation.navigate('PickLocation', {
      setCoordinate: this._setCoordinate.bind(this)
    });
  };

  render() {
    const { control } = this.state;

    return (
      <View>
        <NavigationEvents
          onWillFocus={() => {
            const { pokemon } = this.props.navigation.state.params;

            this.setState(state => ({
              ...state,
              control: {
                ...pokemon,
                category: pokemon.category.name,
                image: {
                  path: pokemon.image_url
                },
                ...state.control
              }
            }));
          }}
        />
        <Modal
          isVisible={this.state.modalVisible.pickImage}
          animationIn="flash"
          animationOut="fadeOut"
          style={{ alignItems: 'center' }}
          onBackdropPress={this._pickImageModalVisibilityHandler}
        >
          <View style={styles.pickImageModal}>
            <View
              style={{
                borderBottomColor: '#ccc',
                borderBottomWidth: 0.87,
                width: '100%',
                padding: '3%',
                height: '15%',
                alignItems: 'center'
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: width * 0.05 }}>
                Choose...
              </Text>
            </View>
            <View style={{ flexDirection: 'column', height: '85%' }}>
              <Button
                type="clear"
                onPress={this._openCameraHandler}
                title="open camera"
                titleStyle={{ fontWeight: 'bold' }}
              />
              <Button
                type="clear"
                onPress={this._openLibraryHandler}
                title="open galery"
              />
              <Button
                type="clear"
                title="close"
                onPress={this._pickImageModalVisibilityHandler}
                containerStyle={{ borderTopColor: '#333' }}
              />
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.modalVisible.pokemonType}
          animationIn="flash"
          animationOut="fadeOut"
          style={{ alignItems: 'center' }}
          onBackdropPress={this._typeModalVisibilityHandler}
        >
          <View style={styles.pickTypeModal}>
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
              renderItem={({ item }) => {
                if (!control.type.includes(item)) {
                  return (
                    <TouchableOpacity
                      onPress={this._pickTypeHandler.bind(this, item)}
                      style={{
                        flexDirection: 'row',
                        paddingVertical: 10,
                        justifyContent: 'center'
                      }}
                      disabled={this.state.control.type.includes(item)}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                }
              }}
            />
            <Button
              title="close"
              type="outline"
              onPress={this._typeModalVisibilityHandler}
            />
          </View>
        </Modal>
        <View style={{ height: '100%', flexDirection: 'column' }}>
          <View>
            <Image
              source={{
                uri: this.state.imageReplaced
                  ? control.image.path
                  : POKEMON_IMG_PATH + control.image.path
              }}
              containerStyle={styles.imgWrapper}
              style={styles.img}
              resizeMode="contain"
            />
            <Button
              title="pick image"
              type="clear"
              onPress={this._pickImageModalVisibilityHandler}
            />
            <Input
              label="name : "
              value={control.name}
              onChangeText={this._inputNameHandler}
            />
            <Input
              label="category : "
              value={control.category}
              onChangeText={this._inputCategoryHandler}
            />
            <View style={{flexDirection: 'row'}}>
              <Input value={this.state.control.latitude.toString()} editable={false} containerStyle={{width: '50%'}} />
              <Input value={this.state.control.longitude.toString()} editable={false} containerStyle={{width: '50%'}}/>
            </View>
          <View style={{ flexDirection: 'row' }}>
            <Button
              title="pick location"
              onPress={this._toPickLocation}
            />
            <Button
              onPress={this._typeModalVisibilityHandler}
              title="select type"
              type="outline"
            />
          </View>
            <FlatList
              data={control.type}
              horizontal={true}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: width * 0.02,
                      borderRadius: 3,
                      backgroundColor: typeColor(item.name),
                      marginVertical: 5,
                      width: width * 0.22
                    }}
                    onPress={this._removeTypehandler.bind(this, item.id)}
                  >
                    <Text style={{ color: '#eee' }}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => 'key ' + item.id}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: width * 0.02,
              justifyContent: 'space-around',
              height: height * 0.1,
              position: 'absolute',
              bottom: 0,
              borderTopWidth: 0.78,
              borderColor: '#ccc',
              width: width
            }}
          >
            <Button
              title="save"
              containerStyle={styles.saveButtonContainer}
              buttonStyle={styles.saveButton}
              onPress={this._updatePokemonHandler.bind(
                this,
                this.props.pokemon
              )}
              icon={{ name: 'save', size: 24, color: '#DDD' }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapState = state => {
  return {
    pokemon: state.pokemon.pokemon,
    pokemon_types: state.pokemon_type.pokemon_types
  };
};

export default connect(
  mapState,
  { updatePokemon }
)(EditPokemon);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  pickImageModal: {
    backgroundColor: '#fff',
    height: height * 0.45,
    width: '70%',
    flexDirection: 'column',
    borderRadius: 10
  },
  pickTypeModal: {
    backgroundColor: '#fff',
    height: height * 0.45,
    width: '70%',
    flexDirection: 'column',
    borderRadius: 10
  },
  imgWrapper: {
    flexDirection: 'column',
    width: '100%',
    height: height * 0.4
  },
  img: {
    alignSelf: 'stretch',
    flex: 1,
    width: undefined,
    height: undefined
  },
  pokemonName: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#262322'
  },
  pokemonCategory: {},
  editButtonContainer: {
    width: '73%'
  },
  deleteButtonContainer: {
    width: '25%'
  },
  editButton: {
    backgroundColor: '#FFE031'
  },
  deleteButton: {
    backgroundColor: '#d7263d'
  }
});
