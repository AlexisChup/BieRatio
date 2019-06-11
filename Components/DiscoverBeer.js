import React from 'react'
import { ActivityIndicator, Image, TouchableOpacity, StyleSheet, View, TextInput, Button, Text, FlatList, SafeAreaView } from 'react-native'
import { getsBeersFromApiWithSearchedText } from '../API/UntappdApi'
import DescriptionBeer from './DescriptionBeer'
import BeerItem from './BeerItem'
import Home from './Home'


class DiscoverBeer extends React.Component {
  static navigationOptions = ({ navigate, navigation }) => ({
    title: 'Recherche par nom',
    headerLeft: () => {
            return (
              <TouchableOpacity
                style = {styles.icon}
                onPress={ ()=>{ navigation.navigate('Home') } }>
                <Image
                  source = { require('../Images/ic_home.png') }
                  style = { styles.icon }/>
              </TouchableOpacity>
            )
    }
  })





  constructor(props){
    super(props)
    this.state = {
      beers: [],
      isLoading: false
    }
    this.searchedText = ""
    this._displayDetailForBeer = this._displayDetailForBeer.bind(this)

  }


  _searchTextInputChanged(text){    //On change la variable du text
    this.searchedText = text     //Des que l'on écrit car c'est dans le state
  }

  _searchBeers(){             //call when user look for an other beer
    this.setState(        //Re set var
      {
      beers: [],
      },
      () => {
        this._loadBeers()   //load beer in the array beers
    })

  }

  _loadBeers(){
    if(this.searchedText.length > 0){
      this.setState({ isLoading: true })
      getsBeersFromApiWithSearchedText(this.searchedText).then(data => {
          this.setState({
            beers: [...this.state.beers, ...data.response.beers.items],
            isLoading: false
          })
      })

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
    this.props.navigation.navigate('DescriptionBeer', {bid: bid})
  }

  _displayHome() {
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <SafeAreaView style = {styles.main_container}>
        <TextInput
          style ={styles.textinput}
          placeholder='Saisissez le nom de la bière'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing= {() => this._searchBeers()}
          clearButtonMode="always"
        />
        <Button title='Rechercher' onPress={() => this._searchBeers()}/>
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
  },
  textinput: {
    margin: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
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
    width: 30,
    height: 30,
    marginLeft: 8,
  }

})




export default DiscoverBeer
