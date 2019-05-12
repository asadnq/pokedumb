import { connect } from 'react-redux';
import { deletePokemon } from '../../store/actions/pokemon';
import PokemonDetail from './PokemonDetail.screen'

const mapState = state => {
  return {
    pokemon: state.pokemon.pokemon,
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated
  };
};

export default connect(
  mapState,
  { deletePokemon }
)(PokemonDetail);