import { connect } from 'react-redux';

import PokeMap from './PokeMap.screen'
import { getPokemon } from '../../store/actions/pokemon'

const mapState = state => {
  return {
    pokemons: state.pokemon.pokemons
  };
};

export default connect(mapState, { getPokemon })(PokeMap);