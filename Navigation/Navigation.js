//Navigation/Navigation.js

import React from 'react'
import { TouchableOpacity, StyleSheet, Image } from 'react-native'
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'


import Home from '../Components/Home'

import FavoriteBeer from '../Components/FavoriteBeer'

import DiscoverBeer from '../Components/DiscoverBeer'
import DescriptionBeer from '../Components/DescriptionBeer'
import RatioSearchBeer from '../Components/RatioSearchBeer'




const HomeStack = createStackNavigator({ //Permet d'assembler plusieurs vues
  Home: {
    screen: Home,   //Page d'accueil de l'application
    navigationOptions: {
      title: 'ACCEUIL'
    }
  },
})

const RatioStack  = createStackNavigator ({ RatioSearchBeer: RatioSearchBeer })

const DiscoverBeerStack = createStackNavigator({
  DiscoverBeer:{
    screen: DiscoverBeer,
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
    screen: RatioStack,   // On lui fournit la bonne vue
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source = { require('../Images/ic_Ratio_Search_Beer.png') }
          style = { styles.icon }/>
      }
    }
  },
  NameStack: {
    screen: DiscoverBeerStack,
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
