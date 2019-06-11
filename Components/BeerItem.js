import React from 'react'
import { ActivityIndicator, Image, TouchableOpacity, StyleSheet, View, TextInput, Button, Text, FlatList, SafeAreaView } from 'react-native'
import DescriptionBeer from './DescriptionBeer'
import {
  Card,
  Divider,
} from 'react-native-elements'

class BeerItem extends React.Component {



    render(){
      const { beer, displayDetailForBeer } = this.props


      return(

        <TouchableOpacity
          style = {styles.main_container}
          onPress ={() => displayDetailForBeer(beer.beer.bid)}>
          <View style = {styles.beer_item}>
            <Image
              style ={styles.image_item}
              source={{uri: beer.beer.beer_label}}
            />
            <View style = {styles.description_item}>
              <Text style = {styles.title_item} numberOfLines={1}>{beer.beer.beer_name}</Text>

              <View style = {styles.texte_item}>
                <Text style = {styles.description_texte}>{beer.beer.bid}</Text>

                <View style = {styles.separate}></View>
                <Text style = {styles.description_texte}>{beer.beer.beer_abv}%</Text>
              </View>

            </View>
          </View>
          <Divider style = { styles.divider }/>

        </TouchableOpacity>




      )
    }



}

const styles = StyleSheet.create({
  main_container: {

  },
  beer_item: {
    flexDirection: 'row',
    // borderColor: 'transparent',
    // borderBottomColor: 'gray',
    // borderWidth: 4,
    padding: 3,
  },
  image_item: {
    height: 100,
    width: 100,
    margin: 5,
  },
  description_item: {
    flexDirection: 'column',
    margin: 3,
    flex: 1,
  },
  title_item:{
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',
    margin: 5,
    paddingRight: 5,
    flex: 1,
  },
  texte_item:{
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 5,
    flexDirection: 'row',
    flex: 3,
  },
  description_texte:{
    fontSize: 15,
  },
  separate: {
    height: 21,
    width: 1,
    borderWidth:2,
    backgroundColor: 'black',
  },
  divider: {
    height: 5,
    backgroundColor: 'black',
  },
})

export default BeerItem
