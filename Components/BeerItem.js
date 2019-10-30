import React from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text, } from 'react-native'

import {
  Icon,
} from 'react-native-elements'

import Flag from 'react-native-flags';

import FadeIn from './Animations/FadeIn'
import * as color from '../assets/colors'

class BeerItem extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isLoading: false
    }
  }




  _displayFlag(){
    const beer = this.props.beer
    const { getCode, getName } = require('country-list');
    var codeState = getCode( beer.brewery.country_name );
    if(codeState === undefined){
      if(beer.brewery.country_name === "Russia"){
        codeState = getCode("Russian Federation")
      }else if (beer.brewery.country_name === "England"){
        codeState = getCode("United Kingdom")
      }else if (beer.brewery.country_name == "South Korea"){
        codeState = getCode("Korea, Republic of")
      }else if (beer.brewery.country_name == "Scotland"){
        codeState = getCode("United Kingdom")
      }
    }
    if (codeState != undefined){
      return (
        <Flag
          code = {codeState}
          size = { 64 }
          type = 'shiny'
        />
      )
    }
    else{
      return(
        <Icon
          type = "material-community"
          name = "flag-remove"
          size = {64}        
        />
      )
    }
  }

    render(){
      if(!this.state.isLoading){

        const { beer, displayDetailForBeer } = this.props
        return(

          <FadeIn>
            <TouchableOpacity
              onPress ={() => displayDetailForBeer(beer.beer.bid)}
              style = {styles.mainContainer}
            >
              <View style = {styles.beer_item}>
                <Image
                  style ={styles.image_item}
                  source={{uri: beer.beer.beer_label}}
                />
                <View style = {styles.description_item}>
                  <Text style = {styles.title_item} numberOfLines={1}>
                    {beer.beer.beer_name}
                  </Text>
                  <View style = { styles.flag }>
                    <Image
                      style = { styles.image }
                      source = {require('../Images/ic_brewery.png')}
                    />
                    <Text style = { styles.brewery }> : </Text>
                    {this._displayFlag()}
                  </View>
                </View>
              </View>

            </TouchableOpacity>
          </FadeIn>




        )
      }
    
      else{
        return(
          null
        )
      }
      
    }



}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.colorBackground,
    borderColor: color.colorDivider,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, 
    elevation: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  beer_item: {
    flexDirection: 'row',
    padding: 3,
  },
  image_item: {
    height: 100,
    width: 100,
    margin: 5,
    resizeMode: "contain",
  },
  description_item: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  title_item:{
    fontFamily: 'MPLUSRounded1c-Bold',
    color: color.colorDivider,
    fontSize: 20,
  },
  flag:{
    justifyContent: 'center',
    flexDirection: 'row',
  },
  image: {
    marginTop: 10,
    height: 45,
    width: 45,
  },
  brewery: {
    fontSize: 25,
    marginTop: 15,
  },
})

export default BeerItem
