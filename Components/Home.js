//Components/Home.js PAGE D'ACCEUIL

import React from 'react'
import { Dimensions, Image, TouchableOpacity, StyleSheet, Text, SafeAreaView, Platform,AsyncStorage,ActivityIndicator, View } from 'react-native'

import checkIfFirstLaunch from '../assets/checkIfFirstLaunch';
import * as Font from 'expo-font'

import {
  Card,
  Divider,
  Icon,
  Button
} from 'react-native-elements'

import * as color from '../assets/colors'
import { contains } from 'react-native-redash';

const HAS_LAUNCHED = 'hasLaunched';

const { height, width } = Dimensions.get("screen");

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.differentMenu = {
      menu: ["La bière de la semaine","Bars à proximités","Mon compte"]
    },
    this.sizeIcon = height/10
    this.iconColor = color.colorIbu
    this.state = {
      isFirstLaunch: false,
      hasCheckedAsyncStorage: false,
      firstLaunch: null
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

  _dspLogo(){
    return(
      <View  style= {styles.logo} >

        {/* <Text style = {styles.textLogo} >
          BieRatio
        </Text>
        <Icon
          type = 'ionicon'
          name = 'md-beer'
          color = {color.colorDivider}
          size = {50}
          iconStyle = {styles.iconLogo}
        /> */}

        <Image
          source = {require('../Images/BieRatio_Logo.png')}
          style = {styles.BieRatio_logo}
        />

        <Image
          source = {require('../Images/pbu_320_black.png')}
          style = {styles.untappdLogo}
        />  
      </View>
    )
  }


  


  render() {
    const { hasCheckedAsyncStorage, isFirstLaunch } = this.state;
    if(hasCheckedAsyncStorage ) {

      return(

        <SafeAreaView style = {styles.main_container}>

          {/* <Image
            style = {styles.image_logo}
            source = {require('../Images/ic_logo_app.jpg')}
          /> */}
          {this._dspLogo()}

          <Divider style = {{ backgroundColor: color.colorDivider, height:5 }} />
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          <Text style = {styles.presentation} >
            TYPE DE RECHERCHE 
          </Text>
          <View  style = { styles.dspSearch } >
            <TouchableOpacity
            style = { [styles.dspSearchCard, {marginLeft: 30, marginRight: 15,}] }
            onPress = {() => this.props.navigation.navigate('RatioBeer')} >
              <Text style = { styles.textCard } > Ratio </Text>
              <Icon
                name = "bar-chart-2"
                type = "feather"
                color = {this.iconColor}
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
                color = {this.iconColor}
                size = {60}
              />
            </TouchableOpacity>
            
          </View>
          <View style = {styles.divider} ></View>
          <TouchableOpacity 
            style = { styles.dspSearchCardFavorite }
            onPress = {() => this.props.navigation.navigate('FavoriteBeer')} >
            <Text style = { styles.textCard }>Bières Favorites </Text>
            <Icon
              name = "ios-heart"
              type = "ionicon"
              color = {this.iconColor}
              size = {50}
            />
          </TouchableOpacity>
            
          {/* <Button
            buttonStyle = {{  height: 50 }}
            title = "Remettre First launch"
            onPress = {() => this._setFirstLaunch()}
          /> */}
        </SafeAreaView>
      )
  
    }
    else {
      return (
        <SafeAreaView style = {styles.loading_container}>
          <ActivityIndicator
            size = 'large'
          />
        </SafeAreaView>
      );
    }

  }

}



const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: color.colorBottomTabBackground,
  },
  image_logo: {
    flex: 2,
    width: width,
  },
  logo: {
    flex: 3,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',

  },
  textLogo: {
    fontFamily: 'Pacifico-Regular',
    textAlign: 'center',
    fontSize: 50,
    color : color.colorDivider
  },
  iconLogo: {
    marginLeft: 20,

  }, 
  untappdLogo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    position: "absolute",
    alignSelf: "flex-end",
    right: 10,
    bottom: -20,
  },
  BieRatio_logo: {
    resizeMode: "contain",
    width: 150,
    height: 150,
  } , 
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
    height: 3,
    marginVertical: 30,
    borderRadius: 50,
    width: width -60,
    alignSelf: "center"

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
  dspSearch: {
    flexDirection: "row",
    flex: 4,
    justifyContent: "space-evenly",
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
  dspSearchCardFavorite: {
    borderWidth: 2,
    borderRadius: width/8,
    borderColor : color.colorDivider,
    flex: 2,
    justifyContent: "space-evenly",
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, 
    elevation: 20,
    backgroundColor: color.colorBackground,
    marginBottom: 30,
    alignItems: 'center', 
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
  dividerCardFavorite: {
    backgroundColor: color.colorPrice,
    height: 5,
    borderRadius: width/16,
    marginHorizontal: width/20,
  },
  presentation: {
    textAlign: "center",
    fontFamily: "MPLUSRounded1c-Bold",
    marginVertical: 15,
    fontSize: 25,
    color: color.colorDivider
  },

})


export default Home
