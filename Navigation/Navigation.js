//Navigation/Navigation.js

import React from 'react'
import { TouchableOpacity, StyleSheet, Image } from 'react-native'
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'


import Home from '../Components/Home'

import FavoriteBeer from '../Components/FavoriteBeer'

import NameSearchBeer from '../Components/NameSearchBeer'


import RatioBeer from '../Components/RatioBeer'
import RatioSearchBeer from '../Components/RatioSearchBeer'

import DescriptionBeer from '../Components/DescriptionBeer'



const HomeStack = createStackNavigator({ //Permet d'assembler plusieurs vues
  Home: {
    screen: Home,   //Page d'accueil de l'application
    navigationOptions: {
      title: 'ACCEUIL'
    }
  },
})

const RatioSearchStack  = createStackNavigator ({
  RatioBeer: {
    screen : RatioBeer
  },
  RatioSearchBeer: {
    screen : RatioSearchBeer
  },
  DescriptionBeer:{
    screen: DescriptionBeer,
    navigationOptions: {
      title: 'Description',
    },
  }
})

const NameSearchStack = createStackNavigator({
  NameSearchBeer:{
    screen: NameSearchBeer,
  },
  DescriptionBeer:{
    screen: DescriptionBeer,
    navigationOptions: {
      title: 'Description',
    },
  }
})



const AppMenuNavigator = createBottomTabNavigator(
  {
  SearchRatio: {      //Le nom en bas
    screen: RatioSearchStack,   // On lui fournit la bonne vue
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source = { require('../Images/ic_Ratio_Search_Beer.png') }
          style = { styles.icon }/>
      }
    }
  },
  NameStack: {
    screen: NameSearchStack,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source = { require('../Images/ic_find_beer.png') }
          style = { styles.icon }/>
      },
    }
  },
  FavoriteBeer: {
    screen: FavoriteBeer,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source = { require('../Images/ic_favorite_beer.png') }
          style = { styles.icon }/>
      }
    }
  },

  },
  {
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#FFFFFF',
  }
  }
)




const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})


export default createAppContainer(
  createSwitchNavigator (
    {
    HomeStack: HomeStack,
    AppMenuNavigator: AppMenuNavigator
    },

  )
);
