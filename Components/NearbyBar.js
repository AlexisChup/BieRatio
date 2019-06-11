
import React from 'react'
import { Image, TouchableOpacity, StyleSheet, View, TextInput, Button, Text, FlatList, SafeAreaView } from 'react-native'

class NearbyBar extends React.Component{


  render(){

    return(
      <View style={styles.main_container}>
        <Text style={styles.waiting_text}>
          Mettre avec la géolocalisation
          les bars les plus proches
        </Text>
      </View>
    )
  }
}




const styles = StyleSheet.create({
  waiting_text: {
    fontSize: 50,
    color: 'red',
  },
  main_container: {
    flex: 1,
  },
})

export default NearbyBar
