//Components/Home.js PAGE D'ACCEUIL

import React from 'react'
import { Dimensions, Image, TouchableOpacity, StyleSheet, Text, SafeAreaView, Platform,AsyncStorage,ActivityIndicator } from 'react-native'

import checkIfFirstLaunch from '../assets/checkIfFirstLaunch';


import {
  Card,
  Divider,
  Icon,
  Button
} from 'react-native-elements'

import * as color from '../assets/colors'

const HAS_LAUNCHED = 'hasLaunched';

const { height, width } = Dimensions.get("screen");

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.differentMenu = {
      menu: ["La bière de la semaine","Bars à proximités","Mon compte"]
    },
    this.sizeIcon = height/10
    this.iconColor = color.colorDivider
    this.state ={
      firstLaunch: null
    }
    this.state = {
      isFirstLaunch: false,
      hasCheckedAsyncStorage: false,
    };

  }

  async componentWillMount() {
    const isFirstLaunch = await checkIfFirstLaunch();
    this.setState({ isFirstLaunch :isFirstLaunch}, () => this._getKeyFromUntappd());
  }

  _getKeyFromUntappd(){
    const isFirstLaunch = this.state.isFirstLaunch
    console.log('====================================');
    console.log("First launch ? " + isFirstLaunch + " || Plateform : " +Platform.OS);
    console.log('====================================');
    if(isFirstLaunch){
      //get key on Untappd
      this.setState({
        hasCheckedAsyncStorage: true
      })
    }else {
      this.setState({
        hasCheckedAsyncStorage: true
      })
    }
  }

  _setFirstLaunch(){
    AsyncStorage.removeItem(HAS_LAUNCHED);
 
  }
  


  render() {
    const { hasCheckedAsyncStorage, isFirstLaunch } = this.state;
    if (!hasCheckedAsyncStorage) {
      return (
        <SafeAreaView style = {styles.loading_container}>
          <ActivityIndicator
            size = 'large'
          />
        </SafeAreaView>
      );
    }

    else {

      return(

        <SafeAreaView style = {styles.main_container}>

          <Image
            style = {styles.image_logo}
            source = {require('../Images/ic_logo_app.jpg')}
          />
          <Divider style = {styles.divider} />
          <TouchableOpacity
            style = {styles.item}
            onPress = {() => this.props.navigation.navigate('RatioBeer')}>
            <Icon
              name = "bar-chart-2"
              type = "feather"
              color = {this.iconColor}
              size = {this.sizeIcon}
              iconStyle = { styles.icon }
            />
            <Text style = {styles.description_item}>Ratio</Text>
          </TouchableOpacity>
          <Divider style = {styles.divider} />
          <TouchableOpacity
            style = {styles.item}
            onPress = {() => this.props.navigation.navigate('NameSearchBeer')}>
            <Icon
              name = "format-letter-case"
              type = "material-community"
              color = {this.iconColor}
              size = {this.sizeIcon}
              iconStyle = { styles.icon }
            />
            <Text style = {styles.description_item}>Prénom</Text>
          </TouchableOpacity>
          <Divider style = {styles.divider} />
          <TouchableOpacity
            style = {styles.item}
            onPress = {() => this.props.navigation.navigate('FavoriteBeer')}>
            <Icon
              name = "ios-heart"
              type = "ionicon"
              color = {this.iconColor}
              size = {this.sizeIcon}
              iconStyle = { styles.icon, {marginLeft: 25} }
            />
            <Text style = { styles.description_item }>Favoris</Text>
          </TouchableOpacity>
          <Button
            buttonStyle = {{  height: 50 }}
            title = "Remettre First launch"
            onPress = {() => this._setFirstLaunch()}
          />
        </SafeAreaView>
      )
    }
  }
}



const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: color.colorBackground
  },
  image_logo: {
    flex: 2,
    width: width,
  },
  description_item: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 20,
    flex: 1,
    color: color.colorDivider
  },
  icon: {
    marginLeft: 20,
  },
  item: {
    flex: 1,
    margin: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: color.colorDivider,
    height: 5,
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

})


export default Home
