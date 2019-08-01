import React from 'react'

import { SafeAreaView ,ActivityIndicator, Image, StyleSheet, View, FlatList, Text, Dimensions } from 'react-native'
import { Slider, Button } from 'react-native-elements'

import BeerItemRatio from './BeerItemRatio'

import { getsBeersFromRatio, loadPages } from '../API/BieRatioApi'
import * as color from '../assets/colors'
var {height, width } = Dimensions.get('window')


import * as Font from 'expo-font'

class RatioSearchBeer extends React.Component{
  static navigationOptions = () => ({
    title: "Recherche par ratio",
    headerBackTitle: "Liste"
  })




  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      beers: [],
      nbBeers: 0,
      infoPage: "",
      currentPage: 1,
      totalPage: 1,
      fontLoaded: false,
    },
    this.colorSlider = color.colorDivider
    this.ibu = parseFloat(this.props.navigation.state.params.ibu),
    this.price = parseFloat(this.props.navigation.state.params.price),
    this.abv = parseFloat(this.props.navigation.state.params.abv); 
  }




  componentDidMount(){
    this._searchBeersFromRatio()

    Font.loadAsync({
      'Lobster-Regular' : require('../assets/fonts/Lobster-Regular.ttf')
    }, ()=>  this.setState({ fontLoaded: true }));


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
      infoPage: "",
      totalPage: 1,
      currentPage: 1,
      nbBeers: 0,
    },
    () => {
      this._loadBeersFromRatio()
    })
  }

  _loadBeersFromRatio(){
    getsBeersFromRatio(this.ibu, this.price, this.abv).then(data => {
      if(data["hydra:totalItems"] > 30){   
        this.setState({
          beers: data["hydra:member"],
          nbBeers: data["hydra:totalItems"],
          infoPage: data["hydra:view"],
          totalPage: parseInt(data["hydra:totalItems"]/30)+1,
          isLoading: false,
        })
      }else{
        this.setState({
          beers: data["hydra:member"],
          nbBeers: data["hydra:totalItems"],
          isLoading: false,
        })
      }
      
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
            minimumTrackTintColor = {color.colorIbu}
            maximumValue = {120}
            maximumTrackTintColor = {color.colorBackItem}
            disabled = {true}
            style = { styles.slider }
            thumbTintColor = {this.colorSlider}
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
            minimumTrackTintColor = {color.colorPrice}
            maximumValue = {5}
            maximumTrackTintColor = {color.colorBackItem}
            disabled = {true}
            style = { styles.slider }
            thumbTintColor = {this.colorSlider}
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
            minimumTrackTintColor = {color.colorAlcool}
            maximumValue = {13}
            maximumTrackTintColor = {color.colorBackItem}
            disabled = {true}
            style = { styles.slider }
            thumbTintColor = {this.colorSlider}
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
    const showIBU = this.ibu  === 150 ? false : true
    const showPRICE = this.price  === 150 ? false : true
    const showABV = this.abv  === 150 ? false : true
    return(
      <SafeAreaView style = {{ flex: 1 }} >
        <FlatList
          data = {this.state.beers}
          keyExtractor={(item) => item.bid.toString()}
          ListFooterComponent = {this._displayPagination()}
          renderItem = {({item}) => (
            <BeerItemRatio
              beer = { item }
              showIBU = {showIBU}
              showPRICE = {showPRICE}
              showABV = {showABV}
              displayDetailForBeer = {this._displayDetailForBeer}
            />
          )} 
        />    
      </SafeAreaView>
    )
  }

  _loadNewPages(number){
    var nextPage = ""
    switch (number){
      case 10 : 
        nextPage = "hydra:next";
        this.setState({
          isLoading: true,
          currentPage : this.state.currentPage +1,
          beers: [],
        })
        break;
      case -10 : 
        nextPage = "hydra:previous";
        this.setState({
          isLoading: true,
          currentPage : this.state.currentPage -1,
          beers: [],
        })
        break;
      case 1 :
        nextPage = "hydra:first";
        this.setState({
          isLoading: true,
          currentPage : 1,
          beers: [],
        })
        break;
      case this.state.totalPage :
        nextPage = "hydra:last";
        this.setState({
          isLoading: true,
          currentPage : this.state.totalPage,
          beers: [],
        })
        break;
      default :
        console.log("Erreur dans le switch"); 
    }
    loadPages(this.state.infoPage[nextPage]).then(data => {
      this.setState({
        beers: data["hydra:member"],
        infoPage: data["hydra:view"],
      }, ()=> this.setState({
        isLoading: false
      }))
    })
  }

  _displayButtonPlus(){
    if(this.state.currentPage < this.state.totalPage){
      return(
        <View>
          <Button
            title = "+1"
            titleStyle = { styles.descPagination }
            buttonStyle = {{ backgroundColor: color.colorBottomTabTintColor}}
            onPress = {() => this._loadNewPages(10) }
          />
        </View>
      )
    }else{
      return(
        <View>    
        </View>
      )
    }
  }
  _displayButtonMinus(){
    if(this.state.currentPage > 1){
      return(
        <View>
          <Button
            title = "-1"
            titleStyle = { styles.descPagination }
            buttonStyle = {{ backgroundColor: color.colorBottomTabTintColor}}
            onPress = {() => this._loadNewPages(-10) }
          />
        </View>
      )
    }else{
      return(
        <View>
        </View>
      )
    }
  }

  _displayButtonFirst(){
    if(this.state.currentPage !== 1){
      return(
        <View>
          <Button
            title = "Première"
            titleStyle = { styles.descPagination }
            buttonStyle = {{ backgroundColor: color.colorBottomTabTintColor}}
            onPress = {() => this._loadNewPages(1) }
          />
        </View>
      )
    }else{
      return(
        <View>
        </View>
      )
    }
  }
  _displayButtonLast(){
    if(this.state.currentPage !== this.state.totalPage){
      return(
        <View>
          <Button
            title = "Dernière"
            titleStyle = { styles.descPagination }
            buttonStyle = {{ backgroundColor: color.colorBottomTabTintColor}}
            onPress = {() => this._loadNewPages(this.state.totalPage) }
          />
        </View>
      )
    }else{
      return(
        <View>
        </View>
      )
    }
  }

  _displayPagination(){
    const page = this.state.totalPage > 1 ? "pages" : "page"
    const biere = this.state.nbBeers > 1 ? "bières" : "bière"
    return(
      <View style = {styles.viewPagination} >
        <View style = {styles.pagination} >
          {this._displayButtonFirst()}
          {this._displayButtonMinus()}
          <Text style = { styles.descPagination } >
            Page n°{this.state.currentPage}
          </Text>
          {this._displayButtonPlus()}
          {this._displayButtonLast()}
        </View>
        <View style = { styles.pagination }>
          <Text style = { styles.descPagination }>
            Nombre de {page} : {this.state.totalPage}
          </Text>
          <Text style = { styles.descPagination }>
            Nombre de {biere} : {this.state.nbBeers}
          </Text>
        </View>
      </View>
    )
  }


  render() {
    if( !this.state.isLoading){
      return(
        <View style = {{flex: 1, backgroundColor: color.colorBackground}}>
          {this._displayCriterion()}
          {this._emptySearch()}
          {this._displayFlatList()}
        </View>
      )
}
      else{
        return(
          <View style = {{ backgroundColor: color.colorBackground }}>
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
  viewPagination:{
    marginTop: 10,
    marginBottom: 10,
  },
  pagination:{
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  descPagination: {
    fontSize: 15,
    fontFamily: 'Lobster-Regular'
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
    justifyContent: 'center',
    backgroundColor: color.colorBackground
  },
  divider:{
    width: width,
    height: 5,
    backgroundColor: color.colorDivider,
    marginTop: 5,
  },
})
export default RatioSearchBeer
