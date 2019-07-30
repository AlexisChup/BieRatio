import React from 'react'

import { ActivityIndicator, Image, StyleSheet, View, FlatList, Text, Dimensions } from 'react-native'
import { Slider } from 'react-native-elements'

import BeerItemRatio from './BeerItemRatio'

import { getsBeersFromRatio } from '../API/BieRatioApi'
import { colorAlcool, colorBackItem, colorIbu, colorPrice} from '../assets/colors'
var {height, width } = Dimensions.get('window')

import { colorDivider } from '../assets/colors'

class RatioSearchBeer extends React.Component{
  static navigationOptions = () => ({
    title: "Recherche par ratio",
    headerBackTitle: "Liste"
  })




  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      beers: []
    },
    this.ibu = parseFloat(this.props.navigation.state.params.ibu),
    this.price = parseFloat(this.props.navigation.state.params.price),
    this.abv = parseFloat(this.props.navigation.state.params.abv); 
  }




  componentDidMount(){
    this._searchBeersFromRatio()
  }

  _displayLoading() {
    if(this.state.isLoading){
      return(
        <View style = {styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }


  _searchBeersFromRatio(){
    this.setState({
      beers: [],
    },
    () => {
      this._loadBeersFromRatio()
    })
  }

  _loadBeersFromRatio(){
    getsBeersFromRatio(this.ibu, this.price, this.abv).then(data => {
      this.setState({
        beers: data["hydra:member"],
        isLoading: false
      })
      
    })
  }
  
  _displayDetailForBeer = (bid, description, ibu, price, abv) => {
    let ratio = "ratio"
    this.props.navigation.navigate('DescriptionBeer', {bid: bid, from: ratio, description: description, ibu: ibu, price: price, abv: abv})
  }


  _emptySearch(){
    if ( this.state.beers.length === 0 && this.state.isLoading === false){
      return(
        <View style = { styles.error } >
          <Text style = { styles.error_text }>Aucune bières ne correspond à vos ratios</Text>
          <Image
            style = { styles.image }
            source = {require('../Images/emoji_man_shrugging.png')}
          />
        </View>
      )
    }
  }

  _sliderIbu(){
    if(this.ibu !== 150){
      return(
        <View style = { styles.slider_container }>
          <Image
            style = { styles.image_slider }
            source = {require ('../Images/ic_hop.png')}
          />
          <Text style = { styles.slider_text }>
            : {this.ibu}
          </Text>
          <Slider
            value = {this.ibu}
            minimumValue = {1}
            minimumTrackTintColor = {colorIbu}
            maximumValue = {120}
            maximumTrackTintColor = {colorBackItem}
            disabled = {true}
            style = { styles.slider }
            thumbTintColor = {"#000000"}
          />
        </View>

      )
    }else{
      return(<View></View>)
    }
  }
  _sliderPrice(){
    if(this.price !== 150){
      return(
        <View style = { styles.slider_container }>
          <Image
            style = { styles.image_slider }
            source = {require ('../Images/ic_euro.png')}
          />
          <Text style = { styles.slider_text }>
            : {this.price}
          </Text>
          <Slider
            value = {this.price}
            minimumValue = {1}
            minimumTrackTintColor = {colorPrice}
            maximumValue = {5}
            maximumTrackTintColor = {colorBackItem}
            disabled = {true}
            style = { styles.slider }
            thumbTintColor = {"#000000"}
          />
        </View>
      )
    }else{
      return(<View></View>)
    }
  }
  _sliderAbv(){
    if(this.abv !== 150){
      return(
        <View style = { styles.slider_container }>
          <Image
              style = { styles.image_slider }
              source = {require ('../Images/ic_alcohol.png')}
          />
          <Text style = { styles.slider_text }>
            : {this.abv}
          </Text>
          <Slider
            value = {this.abv}
            minimumValue = {1}
            minimumTrackTintColor = {colorAlcool}
            maximumValue = {13}
            maximumTrackTintColor = {colorBackItem}
            disabled = {true}
            style = { styles.slider }
            thumbTintColor = {"#000000"}
          />
        </View>
      )
    }else{
      return(<View></View>)
    }
  }

  _displayCriterion(){
    return(
      <View>
        {this._sliderIbu()}

        {this._sliderPrice()}

        {this._sliderAbv()}
        <View style = {styles.divider} ></View>
      </View>
    )
  }

  _displayFlatList(){
    return(
      <View>
        <FlatList
          data = {this.state.beers}
          keyExtractor={(item) => item.bid.toString()}
          renderItem = {({item}) => (
            <BeerItemRatio
              beer = { item }
              displayDetailForBeer = {this._displayDetailForBeer}
            />
          )} 
        />    
      </View>
    )
  }


  render() {
    if( !this.state.isLoading){
      return(
        <View>
          {this._displayCriterion()}
          {this._emptySearch()}
          {this._displayFlatList()}
        </View>
      )
}
      else{
        return(
          <View>
            { this._displayLoading() }
          </View>
        )
      }
  }
}




const styles = StyleSheet.create({
  slider_container: {
    flexDirection: 'row',
    marginTop: 5,
  },
  slider: {
    flex :1,
    paddingRight: 30,
  },
  slider_text: {
    paddingRight: 15,
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
  },
  image_slider: {
    width: 40,
    height: 40,
    marginLeft: 15,
    marginRight: 5,
  },
  error: {
    margin: 15,
    alignItems: 'center',
  },
  error_text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider:{
    width: width,
    height: 5,
    backgroundColor: colorDivider,
    marginTop: 5,
  },
})
export default RatioSearchBeer
