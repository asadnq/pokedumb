import React from 'react';
import { Provider } from 'react-redux';

import RootNavigation from './src/navigations/';
import store from './src/store/store';
import {  getPokemonTypes } from './src/store/actions/pokemon_type'

class App extends React.Component {

  componentDidMount() {
    store.dispatch(getPokemonTypes())
  }

  render() {
    return(
      <Provider store={store}>
        <RootNavigation /> 
      </Provider>
    )
  }
}

export default App;