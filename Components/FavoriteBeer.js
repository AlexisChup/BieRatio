import React from 'react'
import { SafeAreaView,TouchableOpacity,Image ,StyleSheet, View,  Text, Animated, FlatList, Dimensions} from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import BeerItemRatio from './BeerItemRatio'

var { width } = Dimensions.get('window');
import * as color from '../assets/colors'
class FavoriteBeer extends React.Component {

  static navigationOptions = ({ navigate, navigation }) => ({
    headerLeft: () => {
            return (
              <TouchableOpacity
                style = {styles.icon}
                onPress={ ()=>{ navigation.navigate('Home') } }>
                <Icon
                  name = "home"
                  type = "octicon"
                  color = "black"
                  size = {30}
                  iconStyle = {styles.icon}
                />
              </TouchableOpacity>
            )
    },
    headerBackTitle: "Favoris",
    headerRight: <View></View>
    
  })


  constructor(props){
    super(props)
    this.state = {
      topPosition: new Animated.Value(0),
      leftPosition: new Animated.Value(0),
      nbFavoriteBeers: this.props.favoritesBeers.length,
    }
    this.test = 1
  }


  _displayDetailForBeer = (bid, description, ibu, price, abv) => {
    let ratio = "ratio"
    this.props.navigation.navigate('DescriptionBeer', {bid: bid, from: ratio, description: description, ibu: ibu, price: price, abv: abv})
  }

  _anyFavorite(){
    return(
      <View style = {{ flex: 1 }}>
        <Text style = { styles.textHeaderAny } > Aucunes bières favorites</Text>
        <Image
          style = { styles.imgAnyFavorite }
          source = {require("../Images/emoji_man_shrugging.png")}
        />
        <View style = {styles.divider} ></View>
        <Text style = {[ styles.textHeader, {fontSize: 20, marginHorizontal: 15,}]} >Allez en découvrir ci-dessous</Text>
        <View style = {styles.divider} ></View>

        <Text style = {styles.presentation} >TYPE DE RECHERCHE</Text>        
        <View  style = { styles.dspSearch } >
          <TouchableOpacity
           style = { [styles.dspSearchCard, {marginLeft: 30, marginRight: 15,}] }
           onPress = {() => this.props.navigation.navigate('RatioBeer')} >
            <Text style = { styles.textCard } > Ratio </Text>
            <Icon
              name = "bar-chart-2"
              type = "feather"
              color = {color.colorIbu}
              size = {60}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style = { [styles.dspSearchCard, {marginRight: 30, marginLeft: 15}] }
            onPress = {() => this.props.navigation.navigate('NameSearchBeer')} >
            <Text style = { styles.textCard }>  Nom </Text>
            <Icon
              name = "format-letter-case"
              type = "material-community"
              color = {color.colorIbu}
              size = {60}
            />
          </TouchableOpacity>
        </View>
      </View>
    )

  }

  render() {

  var nbFavoriteText = this.props.favoritesBeers.length > 1 ? "favorites" : "favorite"    
  var nbBiereText = this.props.favoritesBeers.length > 1 ? "bières" : "bière"
    return (
      <SafeAreaView style={styles.main_container}>
        {this.props.favoritesBeers.length ===0 ? this._anyFavorite() : 
        <View style = {{ flex: 1 }}>
          <View style = { styles.viewHeader }>
            <Text style = { styles.textHeader } > {this.props.favoritesBeers.length} {nbBiereText} {nbFavoriteText}</Text>
          </View>
          <View style = {{ backgroundColor: color.colorDivider, height: 5, width: width }} ></View>
          <FlatList
            data = {this.props.favoritesBeers}
            keyExtractor={(item) => item.bid.toString()}
            ListFooterComponent = {<View style= {{ marginBottom: 10 }} ></View>}
            renderItem = {({item}) => (
              <BeerItemRatio
                beer = { item }
                showIBU = {true}
                showPRICE = {true}
                showABV = {true}
                displayDetailForBeer = {this._displayDetailForBeer}
              />
            )} 
          /> 
        </View>}
      </SafeAreaView>
    )


  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: color.colorBottomTabBackground,
  },
  icon: {
    marginLeft: 8,
  }, 
  textHeader: {
    color: color.colorDivider,
    fontSize: 25,
    textAlign: "center",
    fontFamily: "MPLUSRounded1c-Bold",
  },
  viewHeader: {
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
  textHeaderAny: {
    color: color.colorDivider,
    fontSize: 25,
    textAlign: "center",
    fontFamily: "MPLUSRounded1c-Bold",
  },
  imgAnyFavorite: {
    alignSelf: 'center',
    width: width/2,
    height: width /2,
  },
  dspSearch: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  dspSearchCard: {
    flexDirection: "column",
    borderWidth: 2,
    borderRadius: width/8,
    borderColor : color.colorDivider,
    flex: 1,
    justifyContent: "space-evenly",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, 
    backgroundColor: color.colorBackground,
    alignItems: 'center',
    elevation: 20,
  },
  textCard: {
    fontSize: 30,
    color: color.colorAlcool,
    fontFamily: 'MPLUSRounded1c-Bold',

  },
  divider: {
    backgroundColor: color.colorDivider,
    height: 3,
    marginVertical: 10,
    borderRadius: 50,
    width: width -60,
    alignSelf: "center"

  },  
  presentation: {
    textAlign: "center",
    fontFamily: "MPLUSRounded1c-Bold",
    marginVertical: 10,
    fontSize: 20,
    color: color.colorDivider
  },
})

const mapStateToProps = (state) => {
  return { 
    favoritesBeers : state.favoritesBeers
  }
}




export default connect(mapStateToProps)(FavoriteBeer)
