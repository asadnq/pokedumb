import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import {
  Image,
  Text,
  Button,
  ThemeProvider,
  Input
} from 'react-native-elements';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { addPokemon } from '../store/actions/pokemon';
import typeColor from '../components/misc/typeColor';
import ImagePickerModal from '../components/modals/ImagePicker';
import TypePickerModal from '../components/modals/TypePicker';
import theme from '../themes/theme';

const initialRegion = {
  latitude: -6.301914,
  longitude: 106.734163,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

class AddPokemon extends React.Component {
  constructor() {
    super();
    this.state = {
      control: {
        name: '',
        type: [],
        category: '',
        image: null,
        latitude: 0,
        longitude: 0
      },
      modalVisible: {
        pokemonType: false,
        pickImage: false
      },
      region: initialRegion
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'add pokemon',
    headerRight: (
      <Button
        title="add"
        onPress={navigation.getParam('addPokemon')}
        type="clear"
        titleStyle={{ color: '#eee' }}
      />
    ),
    headerStyle: {
      backgroundColor: '#58B09C'
    }
  });

  _addPokemonHandler = () => {
    const { name, category, type, latitude, longitude } = this.state.control;

    let image = {
      uri: this.state.control.image.path,
      type: 'image/jpeg',
      name: this.state.control.name
    };

    let data = new FormData();

    data.append('image', image);
    data.append('name', name);
    data.append('type', JSON.stringify(type));
    data.append('category', category);
    data.append('latitude', latitude);
    data.append('longitude', longitude);

    this.props.addPokemon(data);
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

  componentDidMount() {
    this.props.navigation.setParams({
      addPokemon: this._addPokemonHandler.bind(this)
    });
  }

  render() {
    const { width, height } = Dimensions.get('window');

    let imageComponent;

    if (this.state.control.image === null) {
      imageComponent = (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#eee',
            height: height * 0.4
          }}
        >
          <Icon name="add-a-photo" size={42} />
        </View>
      );
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
          resizeMode="contain"
        />
      );
    }

    return (
      <View>
        <ThemeProvider theme={theme.form}>
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
            {imageComponent}
            <Button
              onPress={this._pickImageModalVisibilityHandler}
              title="pick image"
            />
            <View
              style={{
                justifyContent: 'space-evenly',
                flexDirection: 'column',
                height: height * 0.25
              }}
            >
              <Input
                onChangeText={this._inputNameHandler}
                value={this.state.control.name}
                label="name"
              />
              <Input
                onChangeText={this._inputCategoryHandler}
                value={this.state.control.category}
                label="category"
              />
            </View>
            <View style={{ flexDirection: 'column' }}>
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
                data={this.state.control.type}
                horizontal={true}
                keyExtractor={(item, index) => 'key ' + index}
                style={{ marginVertical: height * 0.005 }}
                contentContainerStyle={{
                  justifyContent: 'center',
                  flexDirection: 'row'
                }}
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
          </ScrollView>
        </ThemeProvider>
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

const { height, width } = Dimensions.get('window');

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
    flexDirection: 'row',
    width: '100%',
    height: height * 0.4
  },
  img: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }
});
