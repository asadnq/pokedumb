import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import Home from '../screens/Home';
import AddPokemon from '../screens/AddPokemon';
import PokemonDetail from '../screens/PokemonDetail';
import PokeMap from '../screens/PokeMap';
import Login from '../screens/Auth/Login';
import EditPokemon from '../screens/EditPokemon'
import PickLocation from '../screens/PickLocation'

const MainTab = createMaterialTopTabNavigator({
  Home: {
    screen: Home,
  },
  PokeMap: {
    screen: PokeMap,
  },
},
{
  initialRouteName: 'PokeMap'
}
);

const MainStack = createStackNavigator(
  {
    MainTab: {
      screen: MainTab,
    },
    AddPokemon: {
      screen: AddPokemon,
    },
    PokemonDetail: {
      screen: PokemonDetail
    },
    EditPokemon: {
      screen: EditPokemon
    },
    PickLocation: {
      screen: PickLocation
    }
  },
  {
    initialRouteName: 'MainTab',
  },
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
  },
  {
    InitialRouteName: 'Login',
  },
);

const MainSwitch = createSwitchNavigator(
  {
    MainStack: {
      screen: MainStack,
    },
    AuthStack: {
      screen: AuthStack,
    },
  },
  {
    initialRouteName: 'AuthStack',
  },
);

const RootNavigation = createAppContainer(MainSwitch);

export default RootNavigation;
