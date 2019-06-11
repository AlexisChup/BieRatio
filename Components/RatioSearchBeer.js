import React from 'react'
import { Dimensions, Image, TouchableOpacity, StyleSheet, View, TextInput, Button, Text, FlatList, SafeAreaView } from 'react-native'

import Home from './Home'


class RatioSearchBeer extends React.Component {


  render(){
    return(

      <TouchableOpacity
        style = {{ flex : 1 }}
        onPress = {() => this.props.navigation.navigate('Home')}>
        <Text style = {{ flex: 1 }}>Faire la recherche en fonction des ratios</Text>
      </TouchableOpacity>
    )
  }

}


const styles = StyleSheet.create({

})





export default RatioSearchBeer
