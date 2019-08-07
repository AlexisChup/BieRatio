import React from 'react'
import { TouchableOpacity,Image ,StyleSheet, View,  Text, Animated, Easing, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import BeerItemRatio from './BeerItemRatio'

import * as color from '../assets/colors'
class FavoriteBeer extends React.Component {

  static navigationOptions = ({ navigate, navigation }) => ({
    title: 'Bières favorites',
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
    headerBackTitle: "Favoris"
  })


  constructor(props){
    super(props)
    this.state = {
      topPosition: new Animated.Value(0),
      leftPosition: new Animated.Value(0),
    }
  }

  componentDidMount(){
    // Animated.spring(
    //   this.state.topPosition, {
    //     toValue: 100,
    //     speed: 4,
    //     bounciness: 15
    //   }
    // ).start()
    // Animated.decay(
    //   this.state.topPosition,
    //   {
    //     velocity: 0.8,
    //     deceleration: 0.997,
    //   }
    // ).start()
    // Animated.sequence([
    //   Animated.spring(
    //     this.state.topPosition,
    //     {
    //       toValue: 100,
    //       tension: 8,
    //       friction: 3
    //     }
    //   ),
    //   Animated.timing(
    //     this.state.topPosition,
    //     {
    //       toValue: 0,
    //       duration: 1000,
    //       easing: Easing.elastic(2)
    //     }
    //   )
    // ]).start()
    Animated.parallel([
      Animated.spring(
        this.state.topPosition,
        {
          toValue: 100,
          tension: 8,
          friction: 3
        }
      ),
      Animated.timing(
        this.state.leftPosition,
        {
          toValue: 100,
          duration: 1000,
          easing: Easing.elastic(2)
        }
      )
    ]).start()
  }

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

  render() {
    return (
      <View style={styles.main_container}>
        {/* <Animated.View style={[styles.animation_view, { top : this.state.topPosition, left: this.state.leftPosition }]}>
        </Animated.View> */}
        <Text>Yo la squale</Text>
        <FlatList
          data = {this.props.favoritesBeers}
          keyExtractor={(item) => item.bid.toString()}
          ListFooterComponent = {<View><Text>Fin de la liste</Text></View>}
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
      </View>
    )

  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: color.colorBackground,
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100
  },
  icon: {
    marginLeft: 8,
  }
})

const mapStateToProps = (state) => {
  return { 
    favoritesBeers : state.favoritesBeers
  }
}




export default connect(mapStateToProps)(FavoriteBeer)
