import React from 'react';
import {Provider} from 'react-redux';

import RootNavigation from './src/navigations/';
import store from './src/store/store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    );
  }
}

export default App;
