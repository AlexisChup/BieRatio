
import React from 'react'

import { Alert, StyleSheet, View, FlatList, SafeAreaView, Text, ScrollView } from 'react-native'
import VerticalSlider from 'rn-vertical-slider'

const colorBackItem = "#E4E4E4"
const colorTaste = "#FFE73C"
const colorPrice = "#FF762D"
const colorAlcool = "#F32E2E"


class FavoriteBeer extends React.Component{




  constructor(props){
    super(props)
    this.state= {
      taste: 0,
      price: 0,
      alcool: 0
    }

  }


  updateSliderTaste (value){
    const number = value.toFixed(2)
    this.setState({
      taste : number
    })
    console.log(" state de taste : " + this.state.taste);
  }

  updateSliderPrice (value){
    const number = value.toFixed(2)
    this.setState({
      price : number
    })
    console.log(" state de price : " + this.state.price);
  }

  updateSliderAlcool (value){
    const number = value.toFixed(2)
    this.setState({
      alcool : number
    })
    console.log(" state de alcool : " + this.state.alcool);
  }



  render() {
    return(
      <View style = {styles.main_container}>
        <View
          style = {styles.container_slider}
        >
          <View style = {styles.container}>
            <VerticalSlider
              value={1}
              disabled={false}
              min={1}
              max={5}
              onChange={(value: number) => {
                this.updateSliderTaste(value)
              }}
              onComplete={(value: number) => {

              }}
              width={50}
              height={300}
              step={0.2}
              borderRadius={150}
              minimumTrackTintColor={colorTaste}
              maximumTrackTintColor={colorBackItem}
              showBallIndicator = {true}
              ballIndicatorColor={colorTaste}
              ballIndicatorTextColor={'white'}
            />
          </View>

          <View style = {styles.container}>
            <VerticalSlider
              value={1}
              disabled={false}
              min={1}
              max={5}
              onChange={(value: number) => {
                this.updateSliderPrice (value)
              }}
              onComplete={(value: number) => {
                //console.log("COMPLETE", value);
              }}
              width={50}
              height={300}
              step={0.2}
              borderRadius={150}
              minimumTrackTintColor={colorPrice}
              maximumTrackTintColor={colorBackItem}
              showBallIndicator
              ballIndicatorColor={colorPrice}
              ballIndicatorTextColor={colorBackItem}
            />
          </View>
          <View style = {styles.container}>
            <VerticalSlider
              value={1}
              disabled={false}
              min={1}
              max={5}
              onChange={(value: number) => {
                this.updateSliderAlcool(value)
              }}
              onComplete={(value: number) => {

              }}
              width={50}
              height={300}
              step={0.2}
              borderRadius={150}
              minimumTrackTintColor={colorAlcool}
              maximumTrackTintColor={colorBackItem}
              showBallIndicator
              ballIndicatorColor={colorAlcool}
              ballIndicatorTextColor={colorBackItem}
            />
          </View>
        </View>
        <View style = {styles.description_slider}>
          <Text style = {[styles.description_slider_text,{color : colorTaste} ]}>Goût</Text>
          <Text style = {[styles.description_slider_text,{color : colorPrice} ]}>Prix</Text>
          <Text style = {[styles.description_slider_text,{color : colorAlcool} ]}>Alcool</Text>
        </View>
      </View>

    )
  }
}




const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  container_slider: {
    flex:3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    alignContent : 'space-around',
    borderColor: 'red',
    borderWidth: 2,

  },
  container: {
    flex: 1,
    margin: 60,
  },
  description_slider: {
    marginTop : 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  description_slider_text: {
    fontSize: 25,

  },

})
export default FavoriteBeer
