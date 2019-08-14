import React from 'react'
import { ActivityIndicator, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import {
  Divider,
} from 'react-native-elements'

import FadeIn from './Animations/FadeIn'

import Flag from 'react-native-flags';

import * as color from '../assets/colors'

class BeerItemRatio extends React.Component {

  _showAbuCriterion(){
    const  beer = this.props.beer
    if(this.props.showIBU){
      return(
        <View style = { [styles.showRatio,{backgroundColor: color.colorIbu, borderColor: color.colorIbu} ] }>
          <Image
            style = { styles.image_slider }
            source = {require ('../Images/ic_hop.png')}
          />
          <Text style = { styles.description_texte }>: {beer.ibu}</Text>
        </View>
      )
    }
  }
  _showPriceCriterion(){
    const  beer = this.props.beer
    if(this.props.showPRICE){
      return(
        <View style = { [styles.showRatio ,{backgroundColor: color.colorPrice, borderColor: color.colorPrice, marginHorizontal: 6,} ] }>
          <Image
            style = { styles.image_slider }
            source = {require ('../Images/ic_euro.png')}
          />
          <Text style = { styles.description_texte }> : {beer.price.toFixed(1)}</Text>
        </View>
      )
    }
  }
  _showAbvCriterion(){
    const  beer = this.props.beer
    if(this.props.showABV){
      return(
        <View style = { [styles.showRatio,{backgroundColor: color.colorAlcool, borderColor: color.colorAlcool} ] }>
          <Image
            style = { styles.image_slider }
            source = {require ('../Images/ic_alcohol.png')}
          />
          <Text style = { styles.description_texte }> : {beer.abv.toFixed(1)}</Text>
        </View>
      )
    }
  }

  _showFirstDivider(){
    if((this.props.showIBU & this.props.showPRICE) || (this.props.showIBU & this.props.showABV & !this.props.showPRICE) ){
      return(
        <View style = {styles.separate}></View>
      )
    }
  }
  _showSecondDivider(){
    if(this.props.showPRICE & this.props.showABV){
      return(
        <View style = {styles.separate}></View>
      )
    }
  }
  _displayFlag(){
    const beer = this.props.beer
    const { getCode, getName } = require('country-list');
    var codeState = getCode( beer.countryName );
    if(codeState === undefined){
      if(beer.countryName === "Russia"){
        codeState = getCode("Russian Federation")
      }else if (beer.countryName === "England"){
        codeState = getCode("United Kingdom")
      }else if (beer.countryName == "South Korea"){
        codeState = getCode("Korea, Republic of")
      }else if (beer.countryName == "Scotland"){
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

  _showAnyCriterion(){
    
    if((!this.props.showIBU) && (!this.props.showPRICE) && (!this.props.showABV)){
      return(
        <View style = { styles.flag }>
          <Image
            style = { styles.image }
            source = {require('../Images/ic_brewery.png')}
          />
          <Text style = { styles.brewery }> : </Text>
          {this._displayFlag()}
        </View>
      )
    }
    
  }

  

  render(){
    const { beer, displayDetailForBeer } = this.props
    return(
      <FadeIn>
        <TouchableOpacity
          onPress ={() => displayDetailForBeer(beer.bid, beer.description, beer.ibu, beer.price, beer.abv)}
          style = {styles.mainContainer}
        >
          <View style = {styles.beer_item}>
            <Image
              style ={styles.image_item}
              source={{uri: beer.label}}
            />
            <View style = {styles.description_item}>
              <Text style = {styles.title_item} numberOfLines={1}>{beer.name}</Text>

              <View style = {styles.texte_item}>
                {this._showAbuCriterion()}
                
                {/* {this._showFirstDivider()} */}
                {this._showPriceCriterion()}

                {/* {this._showSecondDivider()} */}

                {this._showAbvCriterion()}

                {this._showAnyCriterion()}


              </View>

            </View>
          </View>

        </TouchableOpacity>
      </FadeIn>




    )
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
  image_slider: {
    height: 25,
    width: 25,

  },
  image_item: {
    height: 100,
    width: 100,
    margin: 5,
    resizeMode: 'contain',
  },
  description_item: {
    flexDirection: 'column',
    margin: 3,
    flex: 1,
  },
  title_item:{
    fontFamily: 'MPLUSRounded1c-Bold',
    color: color.colorDivider,
    fontSize: 20,
    flexWrap: 'wrap',
    margin: 5,
    paddingRight: 5,
    flex: 1,
  },
  texte_item:{
    justifyContent: "space-evenly",
    alignItems: 'center',
    marginLeft: 5,
    flexDirection: 'row',
    flex: 3,
  },
  description_texte:{
    fontSize: 13,
    color: color.colorBackground,
    fontFamily: 'MPLUSRounded1c-Bold',
    paddingTop: 2,
  },
  separate: {
    height: 21,
    width: 1,
    borderWidth:1,
    backgroundColor: color.colorDivider,
  },
  divider: {
    height: 5,
    backgroundColor: color.colorDivider,
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
  flag:{
    justifyContent: 'center',
    flexDirection: 'row',
  },
  showRatio: {
    flexDirection: "row",
    borderRadius: 10, 
    borderWidth: 5,
  }
})

export default BeerItemRatio
