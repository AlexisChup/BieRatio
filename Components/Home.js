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

  async componentDidMount(){
    await Font.loadAsync({
      'Pacifico-Regular' : require('../assets/fonts/Pacifico-Regular.ttf'),
      'MPLUSRounded1c-Bold' : require('../assets/fonts/MPLUSRounded1c-Bold.ttf')
    });
    this.setState({fontLoaded: true})
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

        <Text style = {styles.textLogo} >
          BieRatio
        </Text>
        <Icon
          type = 'ionicon'
          name = 'md-beer'
          color = {color.colorDivider}
          size = {50}
          iconStyle = {styles.iconLogo}
        />
      </View>
    )
  }


  


  render() {
    const { hasCheckedAsyncStorage, isFirstLaunch } = this.state;
    if(hasCheckedAsyncStorage & this.state.fontLoaded) {

      return(

        <SafeAreaView style = {styles.main_container}>

          {/* <Image
            style = {styles.image_logo}
            source = {require('../Images/ic_logo_app.jpg')}
          /> */}
          {this._dspLogo()}

          <Divider style = {styles.divider} />
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
          <View  style = { styles.dspSearch } >
            <TouchableOpacity
            style = { [styles.dspSearchCard, {marginLeft: 20, marginRight: 10,}] }
            onPress = {() => this.props.navigation.navigate('RatioBeer')} >
              <Text style = { styles.textCard } > Ratio </Text>
              <View style = { styles.dividerCard } ></View>
              <Icon
                name = "bar-chart-2"
                type = "feather"
                color = {color.colorIbu}
                size = {60}
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style = { [styles.dspSearchCard, {marginRight: 20, marginLeft: 10}] }
              onPress = {() => this.props.navigation.navigate('NameSearchBeer')} >
              <Text style = { styles.textCard }>  Nom </Text>
              <View style = { styles.dividerCard } ></View>
              <Icon
                name = "format-letter-case"
                type = "material-community"
                color = {color.colorIbu}
                size = {60}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style = { styles.dspSearchCardFavorite }
            onPress = {() => this.props.navigation.navigate('FavoriteBeer')} >
            <Text style = { styles.textCard }>  Favoris </Text>
            <View style = { styles.dividerCardFavorite } ></View>
            <Icon
              name = "ios-heart"
              type = "ionicon"
              color = {color.colorIbu}
              size = {60}
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
    backgroundColor: color.colorBackground,
    marginBottom: 20,
  },
  image_logo: {
    flex: 2,
    width: width,
  },
  logo: {
    flex: 3,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row'
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
  dspSearch: {
    flexDirection: "row",
    flex: 4,
    justifyContent: "space-evenly"
  },
  dspSearchCard: {
    flexDirection: "column",
    borderWidth: 2,
    borderRadius: width/8,
    borderColor : color.colorDivider,
    flex: 1,
    justifyContent: "space-evenly",
    marginTop: 20, 
  },
  dspSearchCardFavorite: {
    borderWidth: 2,
    borderRadius: width/8,
    borderColor : color.colorDivider,
    flex: 2,
    justifyContent: "space-evenly",
    marginHorizontal: 20,
    marginTop: 20, 
  },
  textCard: {
    fontSize: 30,
    textAlign: 'center',
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

})


export default Home
