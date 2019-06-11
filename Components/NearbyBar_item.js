
import React from 'react'
import { Image, TouchableOpacity, StyleSheet, View, TextInput, Button, Text, FlatList, SafeAreaView } from 'react-native'
import NearbyBar from './NearbyBar'


class NearbyBar_item extends React.Component {

  _displayNearbyBar() {
    this.props.navigation.navigate("NearbyBar")
  }


  render() {
    return(
      <TouchableOpacity style = {styles.nearbyBar_item}  //Bars à proximités
                        onPress = {() => this._displayNearbyBar()}>
        <Text style = {styles.header_item}>{this.props.differentMenu.menu[1]}</Text>
        <Image
          style = {styles.image_item}
          source = {require('../Images/ic_map.png')}/>
      </TouchableOpacity>


    )
  }
}


const styles = StyleSheet.create({
  nearbyBar_item: {
    flex: 1,
    backgroundColor: '#FFFD9E',
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



export default NearbyBar_item
