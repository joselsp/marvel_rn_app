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
/************************************************/

export default class App extends Component {

  componentWillMount() {
    webservices.configureAxios()
  }
  
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene 
            key={ 'HeroesList' }
            component={ HeroesList }  
          />
        </Scene>
      </Router>
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
