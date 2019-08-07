import React from 'react'

import { Image, TouchableOpacity, StyleSheet, View, Text, Dimensions} from 'react-native'
import VerticalSlider from 'rn-vertical-slider'
import { Icon, Tooltip, Button } from 'react-native-elements'
import ToolTipRatios from './ToolTipRatios'

import { Switch } from 'react-native-switch';


import * as color from '../assets/colors'


var {height, width} = Dimensions.get('window');

class RatioBeer extends React.Component{
  static navigationOptions = ({ navigate, navigation }) => ({
    title: 'Recherche par ratio',
    headerLeft: () => {
      return (
        <TouchableOpacity
          style = {styles.icon}
          onPress={ ()=>{ navigation.navigate('Home') } }>
          <Icon
            name = "home"
            type = "octicon"
            color = {color.colorDivider}
            size = {30}
            iconStyle = {styles.icon}
          />
        </TouchableOpacity>
      )
    },
    headerRight: (
        <ToolTipRatios/>
    ),
    headerBackTitle: "Ratios"
  })




  constructor(props){
    super(props)
    this.state= {
      ibu: 0,
      price: 0,
      alcool: 0,
      
      enabledSlidersIBU: true,
      colorIbu: color.colorIbu,

      enabledSlidersPRICE: true,
      colorPrice: color.colorPrice,

      enabledSlidersABV: true,
      colorAbv: color.colorAlcool,

      beers :[],
      isLoading: false,
    }

  }


  _updateSliderIbu (value){
    const number = value.toFixed(1)
    this.setState({
      ibu : parseFloat(number)
    })
  }

  _updateSliderPrice (value){
    const number = value.toFixed(1)
    this.setState({
      price : parseFloat(number)
    })
  }

  _updateSliderAlcool (value){
    const number = value.toFixed(1)
    this.setState({
      alcool : parseFloat(number)

    })
  }


  _disableSliderIBU(val){
    const colorSlider = val === false ? color.colorDisabled : color.colorIbu
    this.setState(
      {
      enabledSlidersIBU : val,
      colorIbu: colorSlider,
      })
  }
  _disableSliderPrice(val){
    const colorSlider = val === false ? color.colorDisabled : color.colorPrice
    this.setState(
      {
      enabledSlidersPRICE : val,
      colorPrice: colorSlider,
      })
  }
  _disableSliderABV(val){
    const colorSlider = val === false ? color.colorDisabled : color.colorAlcool
    this.setState(
      {
      enabledSlidersABV : val,
      colorAbv: colorSlider,
      })
  }

  _displayRatioSearchBeer(){
    var ibu =0
    if( this.state.enabledSlidersIBU ){
      ibu = this.state.ibu
    }else if( !this.state.enabledSlidersIBU ){
      ibu = 150
    }
    var price =0
    if( this.state.enabledSlidersPRICE ){
      price = this.state.price
    }else if( !this.state.enabledSlidersPRICE ){
      price = 150
    }
    var abv =0
    if( this.state.enabledSlidersABV){
      abv = this.state.alcool
    }else if( !this.state.enabledSlidersABV ) {
      abv = 150
    }
    this.props.navigation.navigate('RatioSearchBeer', {ibu: ibu, price: price, abv: abv})
    
  }




  render() {
    const colorBackground = color.colorBackground
    return(
      <View style = {styles.main_container}>
        <View
          style = {styles.container_slider}
        >
          <View style = {styles.container}>
            <VerticalSlider
              value={this.state.ibu}
              disabled={! this.state.enabledSlidersIBU}
              min={0}
              max={120}
              onChange={(value) => {
                this._updateSliderIbu(value)
              }}
              onComplete={(value) => {

              }}
              width={45}
              height={300}
              step={20}
              borderRadius={150}
              minimumTrackTintColor={this.state.colorIbu}
              maximumTrackTintColor={color.colorBackItem}
              showBallIndicator = {true}
              ballIndicatorColor={this.state.colorIbu}
              ballIndicatorTextColor={'white'}
            />
          </View>

          <View style = {styles.container}>
            <VerticalSlider
              value={this.state.price}
              disabled={! this.state.enabledSlidersPRICE}
              min={0}
              max={5}
              onChange={(value) => {
                this._updateSliderPrice (value)
              }}
              onComplete={(value) => {
                //console.log("COMPLETE", value);
              }}
              width={45}
              height={300}
              step={1}
              borderRadius={150}
              minimumTrackTintColor={this.state.colorPrice}
              maximumTrackTintColor={color.colorBackItem}
              showBallIndicator
              ballIndicatorColor={this.state.colorPrice}
              ballIndicatorTextColor={color.colorBackItem}
            />
          </View>
          <View style = {styles.container}>
            <VerticalSlider
              value={this.state.alcool}
              disabled={! this.state.enabledSlidersABV}
              min={0}
              max={13}
              onChange={(value) => {
                this._updateSliderAlcool(value)
              }}
              onComplete={(value) => {

              }}
              width={45}
              height={300}
              step={1}
              borderRadius={150}
              minimumTrackTintColor={this.state.colorAbv}
              maximumTrackTintColor={color.colorBackItem}
              showBallIndicator
              ballIndicatorColor={this.state.colorAbv}
              ballIndicatorTextColor={color.colorBackItem}
            />
          </View>
        </View>
        <View style = {styles.description_slider}>
        <Switch
          value={ this.state.enabledSlidersIBU }
          onValueChange={(val) => this._disableSliderIBU(val)}
          circleSize={40}
          barHeight={10}
          circleBorderWidth={0}
          backgroundActive={color.colorIbu}
          backgroundInactive={'gray'}
          circleActiveColor={color.colorIbu}
          circleInActiveColor={color.colorDisabled}
          renderInsideCircle={() => 
            <Image 
              source = {require ('../Images/ic_hop.png')}
              style = {{ resizeMode: "contain", width: 30, height: 30 }}

            />
          }
          changeValueImmediately={true}

        />
        <Switch
          value={ this.state.enabledSlidersPRICE}
          onValueChange={(val) => this._disableSliderPrice(val)}
          circleSize={40}
          barHeight={10}
          circleBorderWidth={0}
          backgroundActive={color.colorPrice}
          backgroundInactive={'gray'}
          circleActiveColor={color.colorPrice}
          circleInActiveColor={color.colorDisabled}
          renderInsideCircle={() => 
            <Image 
              source = {require ('../Images/ic_euro.png')}
              style = {{ resizeMode: "contain", width: 30, height: 30 }}

            />
          }
          changeValueImmediately={true}

        />
        <Switch
          value={ this.state.enabledSlidersABV}
          onValueChange={(val) => this._disableSliderABV(val)}
          circleSize={40}
          barHeight={10}
          circleBorderWidth={0}
          backgroundActive={color.colorAlcool}
          backgroundInactive={'gray'}
          circleActiveColor={color.colorAlcool}
          circleInActiveColor={color.colorDisabled}
          renderInsideCircle={() => 
            <Image 
              source = {require ('../Images/ic_alcohol.png')}
              style = {{ resizeMode: "contain", width: 30, height: 30 }}

            />
          }
          changeValueImmediately={true}

        />

        </View>
        <View style = { styles.buttonBuyView }>
          <Button
            titleStyle = { styles.buttonBuyText }
            buttonStyle = { styles.buttonBuyStyle }
            onPress = {() => this._displayRatioSearchBeer()}
            iconRight = {true}
            title = "Rechercher"
            icon = {
              <Icon
                name = 'search'
                size = {30}
                color = {color.colorBackground}
              />
            }
            
          />
        </View>

      </View>

    )
  }
}




const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: color.colorBackground
  },
  container_slider: {
    justifyContent: "center",
    flexDirection: 'row',
    alignContent : 'space-around',
    marginLeft: 5,
    marginRight: 5,
  },
  container: {
    flex: 1,
    margin: 60,
  },
  description_slider: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 5,
    marginRight: 5,
  },
  buttonBuyView: {
    marginBottom: 10
  },  
  buttonBuyStyle: {
    borderRadius: 100,
    width: 250,
    alignSelf: "center",
    backgroundColor: color.colorDivider
  },
  buttonBuyText: {
    color: color.colorBackground,
    marginRight: 10,
  },
  buttonBuyIon: {

  }, 
  tooltipHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  imageTooltip: {
    width: 30,
    height: 30,
    marginTop: -5,
  },
  icon: {
    marginLeft: 8,
  },
  image: {
    width: 40,
    height: 40,
  },
})
export default RatioBeer
