import React from 'react';
import { View, FlatList, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import {
  Button,
  Text,
  Image,
  Input,
  ThemeProvider
} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { NavigationEvents } from 'react-navigation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import styles from './EditPokemon.style';
import { POKEMON_IMG_PATH } from '../../config/url.config';
import typeColor from '../../components/misc/typeColor';
import ImagePickerModal from '../../components/modals/ImagePicker';
import TypePickerModal from '../../components/modals/TypePicker';
import theme from '../../themes/theme';

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const { width, height } = Dimensions.get('window');

export default class EditPokemon extends React.Component {
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
      modalVisible: {
        pokemonType: false,
        pickImage: false
      },
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
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
        titleStyle={{ color: '#eee' }}
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
        latitude: parseFloat(pokemon.latitude),
        longitude: parseFloat(pokemon.longitude)
      },
      region: {
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
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
        <ScrollView style={styles.container}>
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
            <View style={styles.formInputContainer}>
              <Input
                label="name"
                value={control.name}
                onChangeText={name =>
                  this.setState({ control: { ...this.state.control, name } })
                }
              />
              <Input
                label="category"
                value={control.category}
                onChangeText={category =>
                  this.setState({
                    control: { ...this.state.control, category }
                  })
                }
              />
            </View>
            <View
              style={{
                flexDirection: 'column'
              }}
            >
              <Button
                onPress={this._typeModalVisibilityHandler}
                title="select type"
                type="clear"
              />
            </View>
            <View style={styles.pickTypeContainer}>
              <FlatList
                data={control.type}
                horizontal={true}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.typeList}
                      onPress={this._removeTypehandler.bind(this, item.id)}
                    >
                      <Text style={{ color: '#eee' }}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => 'key ' + item.id}
              />
            </View>
            <View style={styles.pickLocationContainer}>
              <MapView
                provider={PROVIDER_GOOGLE}
                region={this.state.region}
                style={{
                  width: width,
                  height: height * 0.3
                }}
                onRegionChange={region => this.setState({ region })}
                onRegionChangeComplete={region =>
                  this.setState({
                    control: {
                      ...this.state.control,
                      latitude: region.latitude,
                      longitude: region.longitude
                    }
                  })
                }
              >
                <Marker coordinate={this.state.region} />
              </MapView>
            </View>
          </ThemeProvider>
        </ScrollView>
      </View>
    );
  }
}
