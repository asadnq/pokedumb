import React from 'react';
import { View, FlatList, Dimensions, ScrollView } from 'react-native';
import { Button, Input, Text, Image } from 'react-native-elements';

import { POKEMON_IMG_PATH } from '../../config/url.config';
import ListType from '../../components/ListType';
import styles from './PokemonDetail.style';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

export default class PokemonDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'pokemon',
    headerRight: (
      <React.Fragment>
        <Button
          containerStyle={styles.editButtonContainer}
          buttonStyle={styles.editButton}
          icon={{ name: 'edit', size: 24, color: '#58B063' }}
          onPress={navigation.getParam('toEditPokemon')}
        />
        <Button
          containerStyle={styles.deleteButtonContainer}
          buttonStyle={styles.deleteButton}
          icon={{ name: 'delete', color: '#B0585B' }}
          onPress={navigation.getParam('deletePokemon')}
        />
      </React.Fragment>
    ),
    headerStyle: {
      backgroundColor: '#58B09C'
    }
  });

  _deletePokemonHandler = pokemon => {
    if (this.props.isAuthenticated) {
      this.props.deletePokemon(pokemon);
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  _toEditPokemon = () => {
    if (
      this.props.user.id === this.props.pokemon.user_id &&
      this.props.isAuthenticated
    ) {
      this.props.navigation.navigate('EditPokemon');
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  componentDidMount() {
    this.setState(
      state => ({
        pokemon: this.props.navigation.getParam('pokemon')
      }),
      () =>
        this.props.navigation.setParams({
          toEditPokemon: this._toEditPokemon.bind(this),
          deletePokemon: this._deletePokemonHandler.bind(
            this,
            this.state.pokemon
          )
        })
    );
  }

  render() {
    const { pokemon } = this.props.navigation.state.params;

    return (
      <View>
        <ScrollView style={{ height: '100%' }}>
          <Image
            containerStyle={styles.imgWrapper}
            source={{ uri: POKEMON_IMG_PATH + pokemon.image_url }}
            style={styles.img}
            resizeMode="contain"
          />
          <View
            style={{ flexDirection: 'column', marginTop: '5%', padding: '2%' }}
          >
            <Text style={styles.pokemonName}>{pokemon.name}</Text>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                height: height * 0.2
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ fontSize: width * 0.04 }}>category:</Text>
                <Text style={{ fontSize: width * 0.045, color: '#333' }}>
                  {pokemon.category.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ fontSize: width * 0.04 }}>type: </Text>
                <FlatList
                  data={pokemon.types}
                  keyExtractor={item => 'key ' + item.id}
                  horizontal={true}
                  inverted={true}
                  renderItem={({ item }) => {
                    return <ListType type={item.name} text={item.name} />;
                  }}
                />
              </View>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                provider={PROVIDER_GOOGLE}
                region={{
                  latitude: parseFloat(pokemon.latitude),
                  longitude: parseFloat(pokemon.longitude),
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1
                }}
                style={styles.map}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: parseFloat(pokemon.latitude),
                    longitude: parseFloat(pokemon.longitude)
                  }}
                />
              </MapView>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
