//Components/Home.js PAGE D'ACCEUIL

import React from 'react'
import { Dimensions, Image, TouchableOpacity, StyleSheet, View, TextInput, Button, Text, FlatList, SafeAreaView } from 'react-native'

import RatioSearchBeer from './RatioSearchBeer'
import DiscoverBeer from './DiscoverBeer'
import FavoriteBeer from './FavoriteBeer'
import {
  Card,
  Divider,
} from 'react-native-elements'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.differentMenu = {
      menu: ["La bière de la semaine","Bars à proximités","Mon compte"]
    }

  }


  render() {



    return(

      <SafeAreaView style = {styles.main_container}>

        <Image
          style = {styles.image_logo}
          source = {require('../Images/ic_logo_app.png')}
        />
        <Divider style = {styles.divider} />
        <TouchableOpacity
          style = {styles.item}
          onPress = {() => this.props.navigation.navigate('RatioSearchBeer')}>
          <Image
            style = {styles.image}
            source = {require('../Images/ic_Ratio_Search_Beer.png')}
          />
          <Text style = {styles.description_item}>Ratio</Text>
        </TouchableOpacity>
        <Divider style = {styles.divider} />
        <TouchableOpacity
          style = {styles.item}
          onPress = {() => this.props.navigation.navigate('DiscoverBeer')}>
          <Image
            style = {styles.image}
            source = {require('../Images/ic_sort_alphabet.png')}
          />
          <Text style = {styles.description_item}>Prénom</Text>
        </TouchableOpacity>
        <Divider style = {styles.divider} />
        <TouchableOpacity
          style = {styles.item}
          onPress = {() => this.props.navigation.navigate('FavoriteBeer')}>
          <Image
            style = {styles.image}
            source = {require('../Images/ic_favorite_beer.png')}
          />
          <Text style = {styles.description_item}>Favoris</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}



const styles = StyleSheet.create({
  main_container: {
    flex: 1,


  },
  split:{
    borderColor: 'transparent',
    borderBottomColor: 'black',
    borderWidth: 4,
  },
  logo_app: {
    flex: 2,
  },
  image_logo: {
    flex: 2,
    width: Dimensions.get('window').width,
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
  },
  description_item: {
    fontSize: 30,
    flex: 5,
    paddingLeft: 10,
    fontWeight: '600',
    alignSelf: 'center',

  },
  item: {
    flex: 1,
    margin: 3,
    flexDirection: 'row',
  },
  divider: {
    backgroundColor: 'black',
    height: 5,
  },

})


export default Home
