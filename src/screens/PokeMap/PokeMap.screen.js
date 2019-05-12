import React from 'react';
import { View } from 'react-native';
import { Input, Image, Text, Button } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { POKEMON_IMG_PATH } from '../../config/url.config';

const initialRegion = {
  latitude: -6.301914,
  longitude: 106.734163,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class PokeMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: initialRegion,
      locationPick: false
    };
  }

  _setRegion = region => {
    this.setState(state => ({
      ...state,
      region: {
        ...state.region,
        ...region
      },
      locationPick: true
    }));
  };

  _getCurrentPosition = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        position => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
            // latitudeDelta: LATITUDE_DELTA,
            // longitudeDelta: LONGITUED_DELTA
          };
          this._setRegion(region);
          console.log(region);

          alert(position.coords.latitude);
        },
        error => {
          alert(error);
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 2000 }
      );
    } catch (err) {
      alert('error occured.');
    }
  };

  _onPressMap = event => {
    const coords = event.nativeEvent.coordinate;
    this.setState(state => ({
      ...state,
      region: {
        ...state.region,
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      locationPick: true
    }));
  };

  _renderMarkers = () => {
    let markers = [];
    this.props.pokemons.map(pokemon => {
      markers.push(
        <Marker
          key={pokemon.id}
          coordinate={{
            latitude: parseFloat(pokemon.latitude),
            longitude: parseFloat(pokemon.longitude )
          }}
          onPress={() => {
            this.props.navigation.push('PokemonDetail', { pokemon });
            this.props.getPokemon(pokemon.id);
          }}
        >
          <Image
            source={{ uri: POKEMON_IMG_PATH + pokemon.image_url }}
            containerStyle={{
              width: 30,
              height: 30,
              flexDirection: 'row',
              alignSelf: 'stretch'
            }}
            style={{
              width: undefined,
              height: undefined,
              alignSelf: 'stretch',
              flex: 1
            }}
            resizeMode="contain"
          />
        </Marker>
      );
    });
    return markers;
  };

  render() {
    return (
      <View>
        <MapView
          ref={map => (this.map = map)}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          style={{ width: '100%', height: '100%' }}
          initialRegion={initialRegion}
          region={this.state.region}
          onPress={this._onPressMap}
        >
        {this._renderMarkers()}
        </MapView>
      </View>
    );
  }
}