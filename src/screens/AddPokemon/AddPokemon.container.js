import { connect } from 'react-redux';
import { addPokemon } from '../../store/actions/pokemon';
import AddPokemon from './AddPokemon.screen'

const mapState = state => ({
  pokemon_types: state.pokemon_type.pokemon_types
});

export default connect(
  mapState,
  { addPokemon }
)(AddPokemon);