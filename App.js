import React from 'react';
import {Provider} from 'react-redux';

import RootNavigation from './src/navigations/';
import store from './src/store/store';
import NavigationService from './src/navigations/NavigationService';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigation
          ref={navigationRef => {
            NavigationService.setTopLevelNavigator(navigationRef)
          }}/>
      </Provider>
    );
  }
}

export default App;
