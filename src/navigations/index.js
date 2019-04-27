import { createAppContainer, createStackNavigator, createMaterialTopTabNavigator, createSwitchNavigator } from 'react-navigation';

import Home from '../screens/Home';
import AddPokemon from '../screens/AddPokemon';
import PokeMap from '../screens/PokeMap';

const MainTab = createMaterialTopTabNavigator(
    {
        Home: {
            screen: Home
        },
        PokeMap: {
            screen: PokeMap
        }
    }
)


const MainStack = createStackNavigator(
    {
        MainTab: {
            screen: MainTab
        },
        AddPokemon: {
            screen: AddPokemon
        }
    },
    {
        initialRouteName: 'MainTab'
    }
)

const MainSwitch = createSwitchNavigator(
    {
        MainStack: {
            screen: MainStack
        }
    }
)

const RootNavigation = createAppContainer(MainSwitch);

export default RootNavigation;