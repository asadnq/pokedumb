import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Input, Image, Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { addPokemon } from '../store/actions/pokemon';
import typeColor from '../components/misc/typeColor';

class AddPokemon extends React.Component {
  constructor() {
    super();
    this.state = {
      control: {
        name: '',
        type: [],
        category: '',
        image: null
      },
      modalVisible: {
        pokemonType: false,
        pickImage: false
      }
    };
  }

  _testFn = () => {
    alert('works');
  };

  componentDidMount() {
    this.props.navigation.setParams({
      test: this._addPokemonHandler.bind(this),
      dummy: 'test'
    });
  }

  static navigationOptions = ({ state, navigation }) => ({
    title: 'add pokemon',
    headerRight: (
      <Button
        title="add"
        onPress={navigation.getParam('test')}
        type="clear"
      />
    )
  });

  _addPokemonHandler = () => {
    alert('haha yes');
    const { name, category, type } = this.state.control;

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

    this.props.addPokemon(data);

    this.setState(state => ({
      ...state,
      control: {
        ...state.control,
        image: null
      }
    }));
  };

  _openLibraryHandler = () => {
    ImagePicker.openPicker({
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
    console.log(item);
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

  render() {
    const { width, height } = Dimensions.get('window');

    let imageComponent;

    if(this.state.control.image === null) {
      imageComponent = (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ccc',
          height: '50%'
        }}>
          <Icon name='add-a-photo' size={42} />
        </View>
      )
    } else {
      imageComponent = (
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
      )
    }

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
              renderItem={({ item }) => {
                if (!this.state.control.type.includes(item)) {
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
        <View style={{ padding: '2.5%' }}>
        {imageComponent}
          <Button
            onPress={this._pickImageModalVisibilityHandler}
            containerStyle={{ width: '50%', alignSelf: 'center' }}
            title="pick image"
            type="clear"
          />
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              height: '25%'
            }}
          >
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
          </View>
          <FlatList
            data={this.state.control.type}
            horizontal={true}
            keyExtractor={(item, index) => 'key ' + index}
            style={{ marginVertical: height * 0.005 }}
            contentContainerStyle={{
              justifyContent: 'center',
              flexDirection: 'row'
            }}
            renderItem={({ item }) => {
              if (this.state.control.type.includes(item)) {
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
              }
            }}
          />
          <Button
            onPress={this._typeModalVisibilityHandler}
            title="select type"
            type="outline"
            buttonStyle={{
              borderRadius: 30,
              width: '50%',
              alignSelf: 'center'
            }}
          />
          {/* <Button title="send" onPress={this._addPokemonHandler} /> */}
        </View>
      </View>
    );
  }
}

const mapState = state => ({
  pokemon_types: state.pokemon_type.pokemon_types
});

export default connect(
  mapState,
  { addPokemon }
)(AddPokemon);

const styles = StyleSheet.create({
  imgWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: '50%'
  },
  img: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }
});
