//Navigation/Navigation.js

import React from 'react'
import { Text, StyleSheet, } from 'react-native'
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

import * as color from '../assets/colors'


const HomeStack = createStackNavigator(
  { //Permet d'assembler plusieurs vues
    Home: {
      screen: Home,   //Page d'accueil de l'application
      navigationOptions: {
        headerTitle: <Text style = {{ flex: 1,textAlign: 'center', fontFamily: "Pacifico-Regular", fontSize: 23,color: color.colorDivider }} >Accueil</Text>,
        
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: color.colorBottomTabBackground
      }
    },
  }
)
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
      screen : RatioBeer,
      navigationOptions: {
        headerTitle: <Text style = {{ flex: 1,textAlign: 'center', fontFamily: "Pacifico-Regular", fontSize: 23,color: color.colorDivider }} >Recherche par Ratio</Text>,
        headerBackTitle: <Text style = {{  }}>Ratios</Text>,
        
      },
    },
    RatioSearchBeer: {
      screen : RatioSearchBeer,
      navigationOptions: {
        headerTitle: <Text style = {{ flex: 1,textAlign: 'center', fontFamily: "Pacifico-Regular", fontSize: 23,color: color.colorDivider }} >Recherche par Ratio</Text>,
        headerBackTitle: "Liste",
      },
    },
    DescriptionBeer:{
      screen: DescriptionBeer,
      navigationOptions: {
        headerTitle: <Text style = {{ flex: 1,textAlign: 'center', fontFamily: "Pacifico-Regular", fontSize: 23,color: color.colorDivider }} >Description</Text>,
      },
    },
  },
  {
    initialRouteName: 'RatioBeer',
    transitionConfig: (nav) => handleCustomTransitionRatio(nav),
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: color.colorBottomTabBackground
      }
    },

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

const handleCustomTransitionFavorite = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (prevScene
    && prevScene.route.routeName === 'FavoriteBeer'
    && nextScene.route.routeName === 'DescriptionBeer') {
    return zoomIn(1000);
  } else if (prevScene
    && prevScene.route.routeName === 'DescriptionBeer'
    && nextScene.route.routeName === 'FavoriteBeer') {
    return zoomOut(1000);
  }
  return fromLeft(1000);
}

const NameSearchStack = createStackNavigator(
  {
    NameSearchBeer:{
      screen: NameSearchBeer,
      navigationOptions: {
        headerTitle: <Text style = {{ flex: 1,textAlign: 'center', fontFamily: "Pacifico-Regular", fontSize: 23,color: color.colorDivider }} >Recherche par Nom</Text>,
        headerBackTitle: "Liste",
      },
    },
    DescriptionBeer:{
      screen: DescriptionBeer,
      navigationOptions: {
        headerTitle: <Text style = {{ flex: 1,textAlign: 'center', fontFamily: "Pacifico-Regular", fontSize: 23,color: color.colorDivider }} >Description</Text>,
      },
    }
  },
  {
    initialRouteName: 'NameSearchBeer',
    transitionConfig: (nav) => handleCustomTransitionName(nav),
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: color.colorBottomTabBackground
      }
    },

    
    // transitionConfig: () => fromRight(500),
  }
)

const FavoriteStack = createStackNavigator(
  {
    FavoriteBeer: {
      screen : FavoriteBeer,
      navigationOptions: {
        headerTitle: <Text style = {{ flex: 1,textAlign: 'center', fontFamily: "Pacifico-Regular", fontSize: 23,color: color.colorDivider, alignSelf: 'center' }} >Bières Favorites</Text>,
      },
    },
    DescriptionBeer:{
      screen: DescriptionBeer,
      navigationOptions: {
        headerTitle: <Text style = {{ flex: 1,textAlign: 'center', fontFamily: "Pacifico-Regular", fontSize: 23,color: color.colorDivider }} >Description</Text>,
      },
    }

  },
  {
    initialRouteName: "FavoriteBeer",
    transitionConfig: (nav) => handleCustomTransitionFavorite(nav),
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: color.colorBottomTabBackground
      }
    },
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
      },

    },
  },
  {
    shifting: true,
    activeTintColor: color.colorDivider,
    barStyle: { backgroundColor : color.colorBottomTabBackground },
    initialRouteName: "Ratio",
    cardStyle   : {
      backgroundColor: color.colorBottomTabBackground
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
