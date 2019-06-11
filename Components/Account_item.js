

import React from 'react'
import { Image, TouchableOpacity, StyleSheet, View, TextInput, Button, Text, FlatList, SafeAreaView } from 'react-native'
import Account from './Account'

class Account_item extends React.Component {


  _displayNearbyBar() {
    this.props.navigation.navigate("Account")
  }



  render() {




    return (
      <TouchableOpacity style = {styles.account_item}
                        onPress = {() => this._displayNearbyBar()}>
        <Text style = {styles.header_item}>{this.props.differentMenu.menu[2]}</Text>
        <Image
          style = {styles.image_item}
          source = {require('../Images/ic_account.png')}/>
      </TouchableOpacity>


    )
  }
}


const styles = StyleSheet.create ({
  account_item: {
    flex: 2,
    backgroundColor: '#B0250E',
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

export default Account_item
