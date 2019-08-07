import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import Store from './Store/configureStore' à faire après avoir initialiser des reducers dans le Store
import { Provider } from 'react-redux'
import Navigation from './Navigation/Navigation'
import Store from './Store/configureStore'


export default class App extends React.Component {
  render() {
    return (
      <Provider store = {Store} >
        <Navigation/>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
