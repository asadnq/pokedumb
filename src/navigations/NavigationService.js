import { NavigationActions } from 'react-navigation'

let _navigator;

const setTopLevelNavigator = (navigatorRef) => {
    _navigator = navigatorRef
}

const navigate = (routeName, params) => {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
}

const back = key => {
    _navigator.dispatch(
        NavigationActions.back({
            key
        })
    )
} 

const getCurrentRouteName = () => {
    return _navigator.state.routeName
}

export default {
    navigate,
    setTopLevelNavigator,
    back,
    getCurrentRouteName
}