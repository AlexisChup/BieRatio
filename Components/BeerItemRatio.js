import React from 'react'
import { ActivityIndicator, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import {
  Divider,
} from 'react-native-elements'

import FadeIn from './Animations/FadeIn'
import { colorAlcool } from '../assets/colors';

import * as color from '../assets/colors'

class BeerItemRatio extends React.Component {

  _showAbuCriterion(){
    const  beer = this.props.beer
    if(this.props.showIBU){
      return(
        <View style = {{ flexDirection: "row" }}>
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
        <View style = {{ flexDirection: "row" }}>
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
        <View style = {{ flexDirection: "row" }}>
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

  

  render(){
    const { beer, displayDetailForBeer } = this.props
    return(
      <FadeIn>
        <TouchableOpacity
          onPress ={() => displayDetailForBeer(beer.bid, beer.description, beer.ibu, beer.price, beer.abv)}
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
                
                {this._showFirstDivider()}
                {this._showPriceCriterion()}

                {this._showSecondDivider()}

                {this._showAbvCriterion()}


              </View>

            </View>
          </View>
          <Divider style = { styles.divider }/>

        </TouchableOpacity>
      </FadeIn>




    )
  }


}

const styles = StyleSheet.create({
  beer_item: {
    flexDirection: 'row',
    padding: 3,
  },
  image_slider: {
    height: 30,
    width: 30,
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
    fontWeight: 'bold',
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
    backgroundColor: color.colorDivider,
  },
})

export default BeerItemRatio
