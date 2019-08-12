import React from 'react'
import { TouchableOpacity,Image ,StyleSheet, View,  Text, Animated, Easing, FlatList, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import BeerItemRatio from './BeerItemRatio'

var { width } = Dimensions.get('window');
import * as Font from 'expo-font'
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
  // async componentDidMount(){
  //   await Font.loadAsync({
  //     'Pacifico-Regular' : require('../assets/fonts/Pacifico-Regular.ttf'),
  //     'MPLUSRounded1c-Regular' : require('../assets/fonts/MPLUSRounded1c-Regular.ttf'),
  //     'MPLUSRounded1c-Bold' : require('../assets/fonts/MPLUSRounded1c-Bold.ttf'),

  //   });
  //   this.setState({fontLoaded: true})
  // }

  // componentDidMount(){
  //   console.log(this.state.nbFavoriteBeers);
    
  //   // Animated.spring(
  //   //   this.state.topPosition, {
  //   //     toValue: 100,
  //   //     speed: 4,
  //   //     bounciness: 15
  //   //   }
  //   // ).start()
  //   // Animated.decay(
  //   //   this.state.topPosition,
  //   //   {
  //   //     velocity: 0.8,
  //   //     deceleration: 0.997,
  //   //   }
  //   // ).start()
  //   // Animated.sequence([
  //   //   Animated.spring(
  //   //     this.state.topPosition,
  //   //     {
  //   //       toValue: 100,
  //   //       tension: 8,
  //   //       friction: 3
  //   //     }
  //   //   ),
  //   //   Animated.timing(
  //   //     this.state.topPosition,
  //   //     {
  //   //       toValue: 0,
  //   //       duration: 1000,
  //   //       easing: Easing.elastic(2)
  //   //     }
  //   //   )
  //   // ]).start()
  //   Animated.parallel([
  //     Animated.spring(
  //       this.state.topPosition,
  //       {
  //         toValue: 100,
  //         tension: 8,
  //         friction: 3
  //       }
  //     ),
  //     Animated.timing(
  //       this.state.leftPosition,
  //       {
  //         toValue: 100,
  //         duration: 1000,
  //         easing: Easing.elastic(2)
  //       }
  //     )
  //   ]).start()
  // }

  componentWillUnmount(){
    // console.log('====================================');
    // console.log("Je demonte le component");
    // console.log('====================================');
    // this.setState({
    //   topPosition: 0,
    // })
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
      <View style={styles.main_container}>
        {/* <Animated.View style={[styles.animation_view, { top : this.state.topPosition, left: this.state.leftPosition }]}>
        </Animated.View> */}
        {this.props.favoritesBeers.length ===0 ? this._anyFavorite() : 
        <View>
          <Text style = { styles.textHeader } > {this.props.favoritesBeers.length} {nbBiereText} {nbFavoriteText}</Text>
          <View style = {{ backgroundColor: color.colorDivider, height: 5, width: width }} ></View>
          <FlatList
            data = {this.props.favoritesBeers}
            keyExtractor={(item) => item.bid.toString()}
            ListFooterComponent = {<View></View>}
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
      </View>
    )


  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: color.colorBackground,
    marginVertical: 20,
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100
  },
  icon: {
    marginLeft: 8,
  }, 
  textHeader: {
    color: color.colorDivider,
    fontSize: 25,
    textAlign: "center",
    fontFamily: "MPLUSRounded1c-Regular",
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
    justifyContent: "space-evenly"
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
    backgroundColor: color.colorBottomTabBackground,
    alignItems: 'center',
    elevation: 20,
  },
  textCard: {
    fontSize: 30,
    color: color.colorAlcool,
    fontFamily: 'MPLUSRounded1c-Bold',

  },
  dividerCard: {
    backgroundColor: color.colorPrice,
    height: 5,
    borderRadius: width/16,
    marginHorizontal: width/20,
    marginBottom: 20,
  },
  iconAnyFavorite: {

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
