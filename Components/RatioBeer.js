import React from 'react'

import { Image, TouchableOpacity, StyleSheet, View, Text, Dimensions} from 'react-native'
import VerticalSlider from 'rn-vertical-slider'
import { Icon, Tooltip } from 'react-native-elements'


import { colorAlcool, colorBackItem, colorIbu, colorPrice} from '../assets/colors'

import Button from 'apsl-react-native-button'

var {height, width} = Dimensions.get('window');

class RatioBeer extends React.Component{
  static navigationOptions = ({ navigate, navigation }) => ({
    title: 'Recherche par ratio',
    headerLeft: () => {
            return (
              <TouchableOpacity
                style = {styles.icon}
                onPress={ ()=>{ navigation.navigate('Home') } }>
                <Image
                  source = { require('../Images/ic_home.png') }
                  style = { styles.icon }/>
              </TouchableOpacity>
            )
    },
    headerBackTitle: "Ratios"
  })




  constructor(props){
    super(props)
    this.state= {
      ibu: 0,
      price: 0,
      alcool: 0,
      disabledSliders: false,
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




  _displayRatioSearchBeer(){
    this.props.navigation.navigate('RatioSearchBeer', {ibu: this.state.ibu, price: this.state.price, abv: this.state.alcool})

  }




  render() {
    
    return(
      <View style = {styles.main_container}>
        <View
          style = {styles.container_slider}
        >
          <View style = {styles.container}>
            <VerticalSlider
              value={this.state.ibu}
              disabled={this.state.disabledSliders}
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
              minimumTrackTintColor={colorIbu}
              maximumTrackTintColor={colorBackItem}
              showBallIndicator = {true}
              ballIndicatorColor={colorIbu}
              ballIndicatorTextColor={'white'}
            />
          </View>

          <View style = {styles.container}>
            <VerticalSlider
              value={this.state.price}
              disabled={this.state.disabledSliders}
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
              minimumTrackTintColor={colorPrice}
              maximumTrackTintColor={colorBackItem}
              showBallIndicator
              ballIndicatorColor={colorPrice}
              ballIndicatorTextColor={colorBackItem}
            />
          </View>
          <View style = {styles.container}>
            <VerticalSlider
              value={this.state.alcool}
              disabled={this.state.disabledSliders}
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
              minimumTrackTintColor={colorAlcool}
              maximumTrackTintColor={colorBackItem}
              showBallIndicator
              ballIndicatorColor={colorAlcool}
              ballIndicatorTextColor={colorBackItem}
            />
          </View>
        </View>
        <View style = {styles.description_slider}>
          <Tooltip popover = {
            <View >
              <View style = { styles.tooltipHeader }>
                <Image
                  style = { styles.imageTooltip }
                  source = {require ('../Images/ic_hop.png')}
                />
                <Text style = {{ fontWeight: 'bold' }} > : IBU{'\n'}</Text>
              </View>
              <Text style = {{ width : width -25, marginLeft: 15 }}>International bitterness unit (symbole IBU) est une unité utilisée par les brasseurs pour mesurer l'amertume de leurs bières.{'\n'}Plus cette valeur est élevée plus la bière est amère. {'\n'}</Text>
              <Text style = {{ textAlign : 'right', marginRight: 25, }} >source : Wikipédia</Text>
            </View>
          }
          width = {width - 20}
          height = {160}>
            <Image
              style = { styles.image }
              source = {require ('../Images/ic_hop.png')}
            />
          </Tooltip>
          <Tooltip popover = {
            <View >
              <View style = { styles.tooltipHeader }>
                <Image
                  style = { styles.imageTooltip }
                  source = {require ('../Images/ic_euro.png')}
                />
                <Text style = {{ fontWeight: 'bold' }} > : Argent{'\n'}</Text>
              </View>
              <Text style = {{ width : width -25, marginLeft: 15 }}>Unité arbitraire sur 5.{'\n'}Même si le prix de la bière peut varier d'un bar à l'autre.{'\n'}Plus cette valeur est élevée plus la bière est chère.</Text>
            </View>
          }
          width = {width - 20}
          height = {130}>
            <Image
              style = { styles.image }
              source = {require ('../Images/ic_euro.png')}
            />
          </Tooltip>
          <Tooltip popover = {
            <View >
              <View style = { styles.tooltipHeader }>
                <Image
                  style = { styles.imageTooltip }
                  source = {require ('../Images/ic_alcohol.png')}
                />
                <Text style = {{ fontWeight: 'bold' }} > : TAV{'\n'}</Text>
              </View>
              <Text style = {{ width : width -25, marginLeft: 15 }}>Le titre alcoométrique volumique (TAV), aussi appelé degré alcoolique, est la proportion d'alcool dans une boisson.{'\n'}Plus cette valeur est élevée plus la bière contient de l'alcool{'\n'}</Text>
              <Text style = {{ textAlign : 'right', marginRight: 25, }} >source : Wikipédia</Text>
            </View>
          }
          width = {width - 20}
          height = {180}>
            <Image
              style = { styles.image }
              source = {require ('../Images/ic_alcohol.png')}
            />
          </Tooltip>

        </View>
        <View style = {styles.button}>
          <Button
            style = { styles.buttonSearch }
            textStyle = { styles.buttonSearchText }
            type = 'outline'
            buttonStyle = { styles.buttonSearch }
            onPress = {() => this._displayRatioSearchBeer()}
            
          >
            Rechercher<Icon
              name = 'search'
              size = {30}
              color = 'navy'
              iconStyle = {{ marginLeft : -25 , marginRight: 20,}}
            />
          </Button>
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
    marginTop : 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonSearch: {
    borderColor: 'navy',
    borderWidth: 3,
    borderRadius: 20,
    width: width/2,
    justifyContent: 'center',
  },
  buttonSearchText: {
    color : 'navy',
    fontSize: 20,
    fontWeight: 'bold'
  },
  tooltipHeader: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  imageTooltip: {
    width: 30,
    height: 30,
    marginTop: -5,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 8,
  },
  image: {
    width: 40,
    height: 40,
  },
})
export default RatioBeer
