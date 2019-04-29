import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import Home from '../screens/Home';
import AddPokemon from '../screens/AddPokemon';
import PokeMap from '../screens/PokeMap';
import Login from '../screens/Auth/Login';

const MainTab = createMaterialTopTabNavigator({
  Home: {
    screen: Home,
  },
  PokeMap: {
    screen: PokeMap,
  },
});

const MainStack = createStackNavigator(
  {
    MainTab: {
      screen: MainTab,
    },
    AddPokemon: {
      screen: AddPokemon,
    },
  },
  {
    initialRouteName: 'AddPokemon',
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
    initialRouteName: 'MainStack',
  },
);

const RootNavigation = createAppContainer(MainSwitch);

export default RootNavigation;
