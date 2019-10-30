import React from 'react'
import { ActivityIndicator, Image, TouchableOpacity, StyleSheet, View, Text, FlatList, SafeAreaView, Dimensions} from 'react-native'
import { getsBeersFromApiWithSearchedText } from '../API/UntappdApi'
import BeerItem from './BeerItem'
import { Madoka } from 'react-native-textinput-effects';

import { Icon } from 'react-native-elements'
import * as color from '../assets/colors'

var {width, height} = Dimensions.get('window');

class NameSearchBeer extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recherche par nom',
    headerRight: <View></View>,
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

  _searchBeers(){           
    this.setState(        
      {
      isLoading: true,
      beers: [],
      nbBeers: 1,
      },
      () => {
        this._loadBeers()   
    })

  }

  _loadBeers(){
    if(this.searchedText.length > 0){
      getsBeersFromApiWithSearchedText(this.searchedText).then(data => {
          if(data.meta.code !== 429){
            this.setState({
              beers: [...this.state.beers, ...data.response.beers.items],
              nbBeers: data.response.found,
              isLoading: false,
            })
          }else{
            this.setState({
              nbBeers: -1,
              isLoading: false,
            })
          }
      }), () => this._emptySearch()

    }else {
      this.setState({
        isLoading: false
      }, this._emptySearch())
    }
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
        <View style = {styles.iconView} >
          <Image
            source = {require('../Images/BieRatio_Logo.png')}
            style = {styles.logoWaiting}
          />
        </View>
      )
    }
  }

  _emptySearch(){
    const nbBeers = this.state.nbBeers
    if(nbBeers ===0 ){
      return(
        <View style = {{ marginHorizontal: 10, }} >
          <Text style = {styles.iconText} >
            Aucunes bières ne correspond à votre recherche
          </Text>
          <Image
            style = {styles.iconImage}
            source = {require('../Images/emoji_man_shrugging.png')}
          />
        </View>
      )
    }else if (nbBeers === -1){
        return(
          <View style = {{ marginHorizontal: 10, }} >
            <Text style = {styles.iconText} >
              Limite de recherches atteintes pour cette heure. Veuillez attendre la prochaine heure pour en rechercher de nouvelles.
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
        <View style = { styles.dspInput } >
          <Madoka
            label={'Saisir le nom de la bière'}
            borderColor={this.inputColor}
            inputPadding={16}
            labelHeight={24}
            labelStyle={{ color: this.inputColor,fontFamily: "MPLUSRounded1c-Regular",fontWeight: "400", }}
            inputStyle={{ color: this.inputColor,  fontSize: 20, fontFamily: "MPLUSRounded1c-Regular", fontWeight: "100"}}
            style = {styles.textInput}
            clearButtonMode="always"
            onChangeText={(text) => this._searchTextInputChanged(text)}
            onSubmitEditing= {() => this._searchBeers()}
            autoCorrect = {false}
          />
          
        </View>
        <View style = {styles.divider} ></View>

        {this._waitingSearch()}
        {this._emptySearch()}

        {this.searchedText.length === 0 ? null : 
        <FlatList
          style = {styles.list}
          data = {this.state.beers}
          keyExtractor={(item) => item.beer.bid.toString()}
          ListFooterComponent = {<View style= {{ marginBottom: 10 }} ></View>}
          renderItem = {({item}) => (
            <BeerItem
              beer = { item }
              displayDetailForBeer = {this._displayDetailForBeer}
            />
          )}
        />}
        
        {this._displayLoading()}
      </SafeAreaView>
    )
  }
}






const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: color.colorBottomTabBackground
  },
  list: {
    flex: 1,
  },
  dspInput: {
    backgroundColor: color.colorBackground,
    borderColor: color.colorDivider,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, 
    elevation: 20,
    margin: 10,
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
    margin: 10,
    borderRadius: 10,
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
    alignSelf: "center"
    
  },
  iconView: {
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: color.colorDivider
  },
  logoWaiting: {
    height: null,
    width: width,
    resizeMode: 'contain',
    flex: 1,
  }
})




export default NameSearchBeer
