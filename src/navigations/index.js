import React from 'react'
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import PokemonList from '../screens/PokemonList/PokemonList.container';
import AddPokemon from '../screens/AddPokemon/AddPokemon.container';
import PokemonDetail from '../screens/PokemonDetail/PokemonDetail.container';
import PokeMap from '../screens/PokeMap/PokeMap.container';
import Login from '../screens/Auth/Login';
import EditPokemon from '../screens/EditPokemon/EditPokemon.container';
import PickLocation from '../screens/PickLocation';
import FilterPokemon from '../screens/FilterPokemon';
import Register from '../screens/Auth/Register';

import { MapIcon, PokeBall } from '../assets/icons'

const MainTab = createBottomTabNavigator(
  {
    Home: {
      screen: PokemonList,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          return <PokeBall size={25} />;
        },
        title: 'Pokemon List'
      }),
      
    },
    PokeMap: {
      screen: PokeMap,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          return <MapIcon size={25} />;
        }
      })
    }
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'top',
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        color: '#1B2623'
      },
      style: {
        backgroundColor: '#CED9D6'
      }
    }
  }
);

const MainStack = createStackNavigator(
  {
    MainTab: {
      screen: MainTab,
      navigationOptions: ({navigation}) => {
        return {
          header: null
        }
      }
    },
    AddPokemon: {
      screen: AddPokemon
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
    initialRouteName: 'MainTab'
  }
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    }
  },
  {
    InitialRouteName: 'Login'
  }
);

const MainSwitch = createSwitchNavigator(
  {
    MainStack: {
      screen: MainStack
    },
    AuthStack: {
      screen: AuthStack
    }
  },
  {
    initialRouteName: 'AuthStack'
  }
);

const RootNavigation = createAppContainer(MainSwitch);

export default RootNavigation;
