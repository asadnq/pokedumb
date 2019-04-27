import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Text, Image, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { getPokemons, searchPokemon } from '../store/actions/pokemon';

import ListPokemon from '../components/ListPokemon';
import FAB from '../components/buttons/FAB';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      control: {
        search: ''
      },
      typingTimeout: 0
    };
  }

  _toPokemonDetail = id => {
    alert(id);
  };

  _toAddPokemon = () => {
    this.props.navigation.navigate('AddPokemon')
  }

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
        {this.props.isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={this.props.pokemons}
            keyExtractor={(item, index) => 'list ' + item.id}
            renderItem={({ item }) => (
              <ListPokemon
                {...item}
                onListPress={this._toPokemonDetail.bind(this, item.id)}
              />
            )}
          />
        )}
        <FAB iconName="add" iconSize={32} iconColor="#FFF" onPress={this._toAddPokemon}/>
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
  { getPokemons, searchPokemon }
)(Home);
