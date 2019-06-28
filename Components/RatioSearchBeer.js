import React from 'react'

import { Image, TouchableOpacity, Alert, StyleSheet, View, FlatList, SafeAreaView, Text, ScrollView } from 'react-native'
import VerticalSlider from 'rn-vertical-slider'
import { Button } from 'react-native-elements'

const colorBackItem = "#E4E4E4"
const colorTaste = "#FFE73C"
const colorPrice = "#FF762D"
const colorAlcool = "#F32E2E"


class RatioSearchBeer extends React.Component{
  static navigationOptions = ({ navigate, navigation }) => ({
    title: 'Recherche par ratio',
  })




  constructor(props){
    super(props)
    this.taste= this.props.navigation.state.params.taste
    this.price= this.props.navigation.state.params.price
    this.alcool= this.props.navigation.state.params.alcool
  }


  render() {
    return(
      <View>
        <Text> Goût : {this.taste} </Text>
        <Text> Prix : {this.price} </Text>
        <Text> Alcool : {this.alcool} </Text>
      </View>

    )
  }
}




const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },

})
export default RatioSearchBeer
