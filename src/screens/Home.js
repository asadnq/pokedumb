import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { Text, Image, Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  getPokemons,
  searchPokemon,
  getMorePokemons,
  getPokemon
} from '../store/actions/pokemon';
import { getPokemonTypes } from '../store/actions/pokemon_type';

import ListPokemon from '../components/ListPokemon';
import FAB from '../components/buttons/FAB';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      control: {
        search: ''
      },
      typingTimeout: 0,
      pagination: {
        page: 1,
        limit: 10
      }
    };
  }

  _getMorePokemons = () => {
    this.setState(
      state => ({
        ...state,
        pagination: {
          ...state.pagination,
          page: state.pagination.page + 1
        }
      }),
      () => this.props.getMorePokemons(this.state.pagination.page, this.state.pagination.limit)
    );
  };

  _toPokemonDetail = pokemon => {
    this.props.navigation.push('PokemonDetail', { pokemon });
    this.props.getPokemon(pokemon.id)
  };

  _toAddPokemon = () => {
    this.props.navigation.navigate('AddPokemon');
  };

  _searchHandler = val => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState(prevState => {
      return {
        ...prevState,
        control: {
          search: val
        },
        typingTimeout: setTimeout(() => {
          if (val === '') {
            this.props.getPokemons();
          } else {
            this.props.searchPokemon(val);
          }
        }, 500)
      };
    });
  };

  componentDidMount() {
    this.props.getPokemons();
    this.props.getPokemonTypes();
  }

  render() {
    return (
      <View style={{ height: '100%' }}>
        <View>
          <Input
            placeholder="search pokemon..."
            inputContainerStyle={{ borderBottomColor: 'rgba(0,0,0,0)' }}
            onChangeText={this._searchHandler}
            value={this.state.control.search}
          />
        </View>
        <ScrollView>
          {this.props.isLoading ? (
            <ActivityIndicator />
          ) : (
            <React.Fragment>
            <FlatList
              data={this.props.pokemons}
              keyExtractor={(item, index) => 'list ' + item.id}
              renderItem={({ item }) => (
                <ListPokemon
                  {...item}
                  onListPress={this._toPokemonDetail.bind(this, item)}
                />
              )}
            />
          <Button
            title="load more"
            onPress={this._getMorePokemons}
            buttonStyle={{ width: '50%', alignSelf: 'center', backgroundColor: '#396BBA'}}
          />
          </React.Fragment>
          )}
        </ScrollView>
        <Text>{this.state.pagination.page}</Text>
        <FAB
          iconName="add"
          iconSize={32}
          iconColor="#FFF"
          onPress={this._toAddPokemon}
        />
      </View>
    );
  }
}

const mapState = state => {
  return {
    pokemons: state.pokemon.pokemons,
    isLoading: state.pokemon.isLoading
  };
};

export default connect(
  mapState,
  { getPokemons, searchPokemon, getPokemonTypes, getMorePokemons, getPokemon }
)(Home);
