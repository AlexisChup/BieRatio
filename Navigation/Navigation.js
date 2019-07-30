//Navigation/Navigation.js

import React from 'react'
import { TouchableOpacity, StyleSheet, Image } from 'react-native'
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { fromLeft, fromRight, zoomIn, zoomOut } from 'react-navigation-transitions'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

// import { Transition } from 'expo'
import { Transition } from 'react-native-reanimated';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Icon } from 'react-native-elements'

import Home from '../Components/Home'

import FavoriteBeer from '../Components/FavoriteBeer'

import NameSearchBeer from '../Components/NameSearchBeer'


import RatioBeer from '../Components/RatioBeer'
import RatioSearchBeer from '../Components/RatioSearchBeer'

import DescriptionBeer from '../Components/DescriptionBeer'

import { colorBottomTabBackground, colorDivider, colorBottomTabTintColor } from '../assets/colors'


const HomeStack = createStackNavigator({ //Permet d'assembler plusieurs vues
  Home: {
    screen: Home,   //Page d'accueil de l'application
    navigationOptions: {
      title: 'ACCEUIL'
    }
  },
})
const handleCustomTransitionRatio = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (prevScene
    && prevScene.route.routeName === 'RatioBeer'
    && nextScene.route.routeName === 'RatioSearchBeer') {
    return fromRight(1000);
  } else if (prevScene
    && prevScene.route.routeName === 'RatioSearchBeer'
    && nextScene.route.routeName === 'DescriptionBeer') {
    return zoomIn(1000);
  }else if (prevScene
    && prevScene.route.routeName === 'DescriptionBeer'
    && nextScene.route.routeName === 'RatioSearchBeer') {
    return zoomOut(1000);
  }
  return fromLeft(1000);
}

const RatioSearchStack  = createStackNavigator (
  {
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
    },
  },
  {
    initialRouteName: 'RatioBeer',
    transitionConfig: (nav) => handleCustomTransitionRatio(nav),
    // transitionConfig: () => fromRight(500),
  }
)

const handleCustomTransitionName = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (prevScene
    && prevScene.route.routeName === 'NameSearchBeer'
    && nextScene.route.routeName === 'DescriptionBeer') {
    return zoomIn(1000);
  } else if (prevScene
    && prevScene.route.routeName === 'DescriptionBeer'
    && nextScene.route.routeName === 'NameSearchBeer') {
    return zoomOut(1000);
  }
  return fromLeft(1000);
}

const NameSearchStack = createStackNavigator(
  {
    NameSearchBeer:{
      screen: NameSearchBeer,
    },
    DescriptionBeer:{
      screen: DescriptionBeer,
      navigationOptions: {
        title: 'Description',
      },
    }
  },
  {
    initialRouteName: 'NameSearchBeer',
    transitionConfig: (nav) => handleCustomTransitionName(nav),
    // transitionConfig: () => fromRight(500),
  }
)

const FavoriteStack = createStackNavigator(
  {
    FavoriteBeer: {
      screen : FavoriteBeer
    }

  },
  {
    initialRouteName: "FavoriteBeer"
  }
)

const AppMenuNavigator = createMaterialBottomTabNavigator(
  {
    Ratio: {      //Le nom en bas
      screen: RatioSearchStack,   // On lui fournit la bonne vue
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <Icon
                    name = "bar-chart-2"
                    type = "feather"
                    color = { tintColor }
                  />
        }
      }
    },
    Nom: {
      screen: NameSearchStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <Icon
                    name = "format-letter-case"
                    type = "material-community"
                  color = { tintColor }
                />
        },
      }
    },
    Favoris: {
      screen: FavoriteStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => {
          return <Icon
                  name = "ios-heart"
                  type = "ionicon"
                  color = { tintColor }
                />
        }
      }
    },
  },
  {
    shifting: true,
    activeTintColor: colorBottomTabTintColor,
    barStyle: { backgroundColor : colorBottomTabBackground },
    initialRouteName: "Ratio"

  }
)




const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})


export default createAppContainer(
  createAnimatedSwitchNavigator (
    {
      HomeStack: HomeStack,
      AppMenuNavigator: AppMenuNavigator
      ,
    },
    {
      transition: (
        <Transition.Together>
          <Transition.Out
            type="fade"
            durationMs={100}
            // propagation = 'right'
            // interpolation="easeIn"
          />
          {/* <Transition.In 
            type="fade" 
            durationMs={500} 
          /> */}
        </Transition.Together>
      ),

    }
  )
);
