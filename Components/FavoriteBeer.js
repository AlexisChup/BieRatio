
import React from 'react'
import { Dimensions, Image, TouchableOpacity, StyleSheet, View, TextInput, Button, Text, FlatList, SafeAreaView } from 'react-native'

import Home from './Home'


class FavoriteBeer extends React.Component {


  render(){
    return(



        <View

        style = {{ flex: 1, backgroundColor: 'tomato'}}


        onMoveShouldSetResponder={
          (evt) => true
        }
        onResponderMove={
          (evt) => {
            console.log('onResponderMove', (evt.nativeEvent.locationY/ 50).toFixed(1) );
          }
        }

      >
        <Text>Yo</Text>
      </View>




    )
  }

}


const styles = StyleSheet.create({

})





export default FavoriteBeer
