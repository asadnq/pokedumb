import { connect } from 'react-redux';

import EditPokemon from './EditPokemon.screen'
import { updatePokemon } from '../../store/actions/pokemon';

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