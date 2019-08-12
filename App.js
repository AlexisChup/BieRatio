import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
//import Store from './Store/configureStore' à faire après avoir initialiser des reducers dans le Store
import { Provider } from 'react-redux'
import Navigation from './Navigation/Navigation'
import Store from './Store/configureStore'
import * as Font from 'expo-font'

export default class App extends React.Component {

  constructor(props){
    super (props)
    this.state= {
      fontLoaded: false
    }
  }

  async componentDidMount(){
    await Font.loadAsync({
      'Lobster-Regular' : require('./assets/fonts/Lobster-Regular.ttf'),
      'Pacifico-Regular' : require('./assets/fonts/Pacifico-Regular.ttf'),
      'MPLUSRounded1c-Regular' : require('./assets/fonts/MPLUSRounded1c-Regular.ttf'),
      'MPLUSRounded1c-Thin' : require('./assets/fonts/MPLUSRounded1c-Thin.ttf'),
      'MPLUSRounded1c-Bold' : require('./assets/fonts/MPLUSRounded1c-Bold.ttf')
    });
    this.setState({fontLoaded: true})
  }


  render() {
    if (this.state.fontLoaded){
      return (
        <Provider store = {Store} >
          <Navigation/>
        </Provider> 

      )
    }else{
      return <ActivityIndicator
              size = "large"
            />
    }
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
