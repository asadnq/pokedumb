import React from 'react';
import { View, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Image, Input, Button } from 'react-native-elements';

import FAB from '../../components/buttons/FAB';
import PokemonCard from '../../components/cards/PokemonCard';
import HeaderSearch from '../../components/headers/HeaderSearch';

export default class PokemonList extends React.Component {
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
      },
      isFiltered: false
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
      () =>
        this.props.getMorePokemons(
          this.state.pagination.page,
          this.state.pagination.limit
        )
    );
  };

  _toPokemonDetail = pokemon => {
    this.props.navigation.push('PokemonDetail', { pokemon });
    this.props.getPokemon(pokemon.id);
  };

  _toAddPokemon = () => {
    if (this.props.isAuthenticated) {
      this.props.navigation.navigate('AddPokemon');
    } else {
      this.props.navigation.navigate('Login');
    }
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

  _filterPokemons = () => {
    this.setState({ isFiltered: true });
  };

  _toFilterPokemon = () => {
    this.props.navigation.navigate('FilterPokemon', {
      filter: this._filterPokemons.bind(this)
    });
  };

  componentDidMount() {
    if (!this.state.isFiltered) {
      this.props.getPokemons();
    }

    this.props.getPokemonTypes();
  }

  _renderPokemonList = () => {
    if (this.props.pokemons.length <= 0) {
      return (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>No result was found...</Text>
        </View>
      );
    } else {
      return (
        <React.Fragment>
          <ScrollView
            style={{ width: '100%' }}
            showsVerticalScrollIndicator={false}
          >
            <FlatList
              numColumns={2}
              data={this.props.pokemons}
              keyExtractor={(item, index) => 'list ' + item.id}
              renderItem={({ item }) => (
                <PokemonCard
                  {...item}
                  onCardPress={this._toPokemonDetail.bind(this, item)}
                />
              )}
              onEndReached={this._getMorePokemons}
              onEndReachedThreshold={0.5}
              showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            />
          </ScrollView>
          <FAB
            iconName="add"
            iconSize={32}
            iconColor="#FFF"
            onPress={this._toAddPokemon}
          />
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <View style={{ height: '100%' }}>
        <HeaderSearch
          searchProps={{
            onChangeText: this._searchHandler,
            placeholder: 'search pokemon...',
            value: this.state.control.search
          }}
          onFilterButtonPress={this._toFilterPokemon}
        />
        {this.props.isLoading ? (
          <ActivityIndicator />
        ) : (
          this._renderPokemonList()
        )}
      </View>
    );
  }
}
