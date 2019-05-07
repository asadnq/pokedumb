import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  Button,
  Text,
  Image,
  Input,
  ThemeProvider
} from 'react-native-elements';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { NavigationEvents } from 'react-navigation';
import MapView, { GOOGLE_PROVIDER } from 'react-native-maps';

import { updatePokemon } from '../store/actions/pokemon';
import { POKEMON_IMG_PATH } from '../config/url.config';
import typeColor from '../components/misc/typeColor';
import ImagePickerModal from '../components/modals/ImagePicker';
import TypePickerModal from '../components/modals/TypePicker';
import theme from '../themes/theme';

const LATITUDE_DELTA = 0.01;
const LONGITUED_DELTA = 0.01;

class EditPokemon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      control: {
        name: '',
        category: '',
        image: {
          path: ''
        },
        type: [],
        latitude: 0.0,
        longitude: 0
      },
      locationPicked: true,
      modalVisible: {
        pokemonType: false,
        pickImage: false
      },
      imageReplaced: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'edit pokemon',
    headerRight: (
      <Button
        title="save"
        onPress={navigation.getParam('updatePokemon')}
        type="clear"
      />
    ),
    headerStyle: {
      backgroundColor: '#58B09C'
    }
  });

  componentDidMount() {}

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
    data.append('latitude', latitude);
    data.append('longitude', longitude);

    this.props.updatePokemon(this.props.pokemon.id, data);
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

  _pickCoordinate = coords => {
    this.setState(state => ({
      ...state,
      control: {
        ...state.control,
        latitude: coords.latitude,
        longitude: coords.longitude
      }
    }));
  };

  _onPressMap = event => {
    const coords = event.nativeEvent.coordinate;
    this.setState(state => ({
      ...state,
      control: {
        ...state.control,
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      locationPicked: true
    }));
  };

  componentDidMount() {
    const { pokemon } = this.props;

    this.setState(state => ({
      ...state,
      control: {
        name: pokemon.name,
        category: pokemon.category.name,
        type: pokemon.type,
        image: {
          path: pokemon.image_url
        },
        latitude: pokemon.latitude,
        longitude: pokemon.longitude
      }
    }));
  }

  render() {
    const { control } = this.state;

    return (
      <View>
        <NavigationEvents
          onWillFocus={() =>
            this.props.navigation.setParams({
              updatePokemon: this._updatePokemonHandler
            })
          }
        />
        <ImagePickerModal
          isVisible={this.state.modalVisible.pickImage}
          visibilityHandler={this._pickImageModalVisibilityHandler}
          cameraButtonOnPress={this._openCameraHandler}
          libraryButtonOnPress={this._openLibraryHandler}
        />
        <TypePickerModal
          isVisible={this.state.modalVisible.pokemonType}
          visibilityHandler={this._typeModalVisibilityHandler}
          onTypePress={this._pickTypeHandler.bind(this)}
          data={this.props.pokemon_types}
          currentData={this.state.control.type}
        />
        <ScrollView
          style={{
            paddingHorizontal: width * 0.02,
            backgroundColor: '#E6EAFF'
          }}
        >
          <ThemeProvider theme={theme.form}>
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
            <View
              style={{
                justifyContent: 'space-evenly',
                flexDirection: 'column',
                height: height * 0.25
              }}
            >
              <Input
                label="name"
                value={control.name}
                onChangeText={this._inputNameHandler}
              />
              <Input
                label="category"
                value={control.category}
                onChangeText={this._inputCategoryHandler}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                height: height * 0.15,
                justifyContent: 'space-around'
              }}
            >
              <Button
                onPress={this._typeModalVisibilityHandler}
                title="select type"
                type="clear"
              />
            </View>
            <View
              style={{ height: height * 0.08, marginVertical: height * 0.01 }}
            >
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
                height: height * 0.4,
                justifyContent: 'space-evenly',
                flexDirection: 'column',
                marginBottom: height * 0.05
              }}
            >
              <MapView
                provider={GOOGLE_PROVIDER}
                region={{
                  latitude: this.state.control.latitude,
                  longitude: this.state.control.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUED_DELTA
                }}
                style={{ width: width, height: height * 0.3 }}
                showsUserLocation={true}
                ref={map => (this.map = map)}
                onPress={this._onPressMap}
              />
              <Button
                type="clear"
                title="pick location"
                onPress={this._pickCoordinate}
              />
            </View>
          </ThemeProvider>
        </ScrollView>
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
  }
});
