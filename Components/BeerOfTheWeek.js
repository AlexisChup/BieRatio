//Components/BeerOfTheWeek.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'




class BeerOfTheWeek extends React.Component {




  render(){


    return(
      <SafeAreaView style = {styles.main_container}>
        <View style ={styles.test_View}>
          <Text>Page des bière de la semaine</Text>
        </View>
      </SafeAreaView>
    )
  }
}



const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'purple',
  },
  test_View: {
    flex: 1,
    backgroundColor: 'yellow',
    width: 150,
    height: 50,
  },

})

export default BeerOfTheWeek
