import React from 'react'
import { ActivityIndicator, Image, TouchableOpacity, StyleSheet, View, Text, FlatList, SafeAreaView, Dimensions } from 'react-native'
import { getsBeersFromApiWithSearchedText } from '../API/UntappdApi'
import BeerItem from './BeerItem'
import { Madoka } from 'react-native-textinput-effects';

import { Icon } from 'react-native-elements'
import * as color from '../assets/colors'

var {width, height} = Dimensions.get('window');

class NameSearchBeer extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recherche par nom',
    headerLeft: () => {
            return (
              <TouchableOpacity
                style = {styles.icon}
                onPress={ ()=>{ navigation.navigate('Home') } }>
                <Icon
                  name = "home"
                  type = "octicon"
                  color = {color.colorDivider}
                  size = {30}
                  iconStyle = {styles.icon}
                />
              </TouchableOpacity>
            )
    },
    headerBackTitle: "Liste"
  })





  constructor(props){
    super(props)
    this.state = {
      beers: [],
      isLoading: false,
      nbBeers: 1,
    }
    this._displayDetailForBeer = this._displayDetailForBeer.bind(this)
    this.inputColor = color.colorDivider
    this.searchedText =  ""

  }


  _searchTextInputChanged(text){
    this.searchedText = text
  }

  _searchBeers(){             //call when user look for an other beer
    this.setState(        //Re set var
      {
      isLoading: true,
      beers: [],
      nbBeers: 1,
      },
      () => {
        this._loadBeers()   //load beer in the array beers
    })

  }

  _loadBeers(){
    if(this.searchedText.length > 0){
      getsBeersFromApiWithSearchedText(this.searchedText).then(data => {
          this.setState({
            beers: [...this.state.beers, ...data.response.beers.items],
            nbBeers: data.response.found,
            isLoading: false,
          })
      }), () => this._emptySearch()

    }else {
      this.setState({
        isLoading: false
      }, this._emptySearch())
    }
  }

  _test(){
      console.log("Ce que on a récuperer : " +this.state.beers[0].beer.beer_name)
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

  _displayDetailForBeer = (bid) => {
    let name = "name"
    this.props.navigation.navigate('DescriptionBeer', {bid: bid, from : name})
  }

  _displayHome() {
    this.props.navigation.navigate('Home')
  }

  _waitingSearch(){
    if( this.searchedText.length === 0) {
      return(
        <View style = { styles.iconView } >
          <Text style = { styles.iconText } >
            Saisissez le nom d'une bière
          </Text>
          <Icon
            type = "ionicon"
            name = "ios-search"
            size = {200}
            color = {color.colorDivider}

          />
        </View>
      )
    }
  }

  _emptySearch(){
    const nbBeers = this.state.nbBeers
    if(nbBeers ===0 ){
      return(
        <View style = {styles.iconView} >
          <Text style = {styles.iconText} >
            Aucunes bières ne correspond à votre recherche
          </Text>
          <Image
            style = {styles.iconImage}
            source = {require('../Images/emoji_man_shrugging.png')}
          />
        </View>
      )
    }
  }

  render() {
    return (
      <SafeAreaView style = {styles.main_container}>
        <Madoka
          label={'Nom de la bière'}
          // this is used as active and passive border color
          borderColor={this.inputColor}
          inputPadding={16}
          labelHeight={24}
          labelStyle={{ color: this.inputColor }}
          inputStyle={{ color: this.inputColor }}
          style = {styles.textInput}
          clearButtonMode="always"
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing= {() => this._searchBeers()}
          autoCorrect = {false}
        />
        <View style = {styles.divider} ></View>

        {this._waitingSearch()}
        {this._emptySearch()}


        <FlatList
          style = {styles.list}
          data = {this.state.beers}
          keyExtractor={(item) => item.beer.bid.toString()}
          renderItem = {({item}) => (
            <BeerItem
              beer = { item }
              displayDetailForBeer = {this._displayDetailForBeer}
            />
          )}
        />
        
        {this._displayLoading()}
      </SafeAreaView>
    )
  }
}






const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: color.colorBackground
  },
  list: {
    flex: 1,
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
  icon: {
    marginLeft: 8,
  },
  textInput: {
    margin: 5,
  },
  divider: {
    height: 5,
    backgroundColor: color.colorDivider,
    width : width,
  },
  iconImage: {
    height: 200,
    width: 200,
    marginTop: 25,
    resizeMode: 'contain',
    
  },
  iconView: {
    margin: 15,
    alignItems: 'center'
  },
  iconText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: color.colorDivider
  }

})




export default NameSearchBeer
