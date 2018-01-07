/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux'

import * as webservices from 'marvel_rn_app/src/webservices/webservices'

/****************** COMPONENTS *******************/
import HeroesList from 'marvel_rn_app/src/sections/HeroesList';
import HeroeDetail from 'marvel_rn_app/src/sections/HeroeDetail'
/************************************************/

/******************* REDUX **********************/
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from './redux/reducers' // Nuestros reducers
const reducer = combineReducers(reducers) // Combinamos nuestros reducers
const store = createStore( // Creamos el store con:
    reducer, // Nuestros reducer
    applyMiddleware(thunk) // Nuestro middleware redux-thunk
)
/************************************************/

export default class App extends Component {

  componentWillMount() {
    webservices.configureAxios()
  }
  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene 
              key={ 'HeroesList' }
              component={ HeroesList }  
              hideNavBar
            />

            <Scene key={ 'HeroeDetail' }
              component= { HeroeDetail }
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
