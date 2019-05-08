import React from 'react'
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
import FilterPokemon from '../screens/FilterPokemon'
import Register from '../screens/Auth/Register';

const MainTab = createMaterialTopTabNavigator({
  Home: {
    screen: Home,
  },
  PokeMap: {
    screen: PokeMap,
  },
},
{
  initialRouteName: 'Home',
  tabBarPosition: 'top',
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#58B09C',
    },
  }
}
);

const MainStack = createStackNavigator(
  {
    MainTab: {
      screen: MainTab,
      navigationOptions: {
        header: null
      }
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
    },
    FilterPokemon: {
      screen: FilterPokemon
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
    Register: {
      screen: Register
    }
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
