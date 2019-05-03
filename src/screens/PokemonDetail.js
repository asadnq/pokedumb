import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Button, Input, Text, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';


import { deletePokemon } from '../store/actions/pokemon';

import { POKEMON_IMG_PATH } from '../config/url.config';
import ListType from '../components/ListType';

class PokemonDetail extends React.Component {
  _deletePokemonHandler = pokemon => {
    this.props.deletePokemon(pokemon);
    this.props.navigation.navigate('Home');
  };

  _toEditPokemon = pokemon => {
    this.props.navigation.navigate('EditPokemon', { pokemon })
  }

  render() {
    const { pokemon } = this.props.navigation.state.params;

      
    return (
      <View style={{ height: '100%' }}>
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
              height: '35%'
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ fontSize: width * 0.04 }}>category:</Text>
              <Text style={{ fontSize: width * 0.045, color: '#333' }}>
                {pokemon.category.name}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ fontSize: width * 0.04 }}>type: </Text>
              <FlatList
                data={pokemon.type}
                keyExtractor={item => 'key ' + item.id}
                horizontal={true}
                inverted={true}
                renderItem={({ item }) => {
                  return <ListType type={item.name} text={item.name} />;
                }}
              />
            </View>
          </View>
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
            title="edit"
            containerStyle={styles.editButtonContainer}
            buttonStyle={styles.editButton}
            onPress={this._toEditPokemon.bind(this, pokemon)}
            icon={{ name: 'edit', size: 24, color: '#DDD' }}
          />
          <Button
            title="delete"
            containerStyle={styles.deleteButtonContainer}
            buttonStyle={styles.deleteButton}
            icon={{ name: 'delete', color: '#DDD' }}
            onPress={this._deletePokemonHandler.bind(this, pokemon)}
          />
        </View>
      </View>
    );
  }
}

const mapState = state => {
  return {
    pokemon: state.pokemon.pokemon
  };
};

export default connect(
  mapState,
  { deletePokemon }
)(PokemonDetail);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  imgWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: '50%'
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
