


import React from 'react'
import { Image, TouchableOpacity, StyleSheet, View, TextInput, Button, Text, FlatList, SafeAreaView } from 'react-native'
import BeerOfTheWeek from './BeerOfTheWeek'



class BOTW_item extends React.Component {


  constructor(props) {
    super(props)

  }
  _displayBeerOfTheWeek() {
    this.props.navigation.navigate("BeerOfTheWeek")
  }


  render(){


    return(


      <TouchableOpacity style = {styles.beerOTW_item}
                        onPress = {() => this._displayBeerOfTheWeek()}>
        <Text style = {styles.header_item}>{this.props.differentMenu.menu[0]}</Text>
        <Image
          style = {styles.image_item}
          source = {require('../Images/ic_BOTW.png')}/>
      </TouchableOpacity>
    )
  }
}



const styles = StyleSheet.create({
  beerOTW_item: {
    flex: 1,
    backgroundColor: '#698D37',
    borderRadius: 50,
  },
  header_item: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image_item: {
    height: 70,
    width: 70,
  },

})


export default BOTW_item
