import React from 'react'
import { Dimensions, AppRegistry, ScrollView, ActivityIndicator, Image, TouchableOpacity, StyleSheet, View, TextInput, Button, Text, FlatList, SafeAreaView } from 'react-native'

import { colorAlcool, colorBackItem, colorIbu, colorPrice} from '../assets/colors'


import VerticalSlider from 'rn-vertical-slider'

class Sliders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
        <View>
            <View
                style = {this.styleContainerSlider}
            >
            <View style = {this.styleSlider}>
              <VerticalSlider
                value={this.abu}
                disabled={true}
                min={1}
                max={120}
                width={this.sliderWidth}
                height={this.sliderHeight}
                step={6}
                borderRadius={150}
                minimumTrackTintColor={colorIbu}
                maximumTrackTintColor={colorBackItem}
                showBallIndicator = {true}
                ballIndicatorColor={colorIbu}
                ballIndicatorTextColor={'white'}
                ballIndicatorWidth = {this.sliderBallIndicatorWidth}
                ballIndicatorPosition = {this.sliderBallIndicatorPosition}
              />

            </View>

            <View style = {this.styleSlider}>
              <VerticalSlider
                value={this.price}
                disabled={true}
                min={1}
                max={5}
                width={this.sliderWidth}
                height={this.sliderHeight}
                step={0.2}
                borderRadius={150}
                minimumTrackTintColor={colorPrice}
                maximumTrackTintColor={colorBackItem}
                showBallIndicator
                ballIndicatorColor={colorPrice}
                ballIndicatorTextColor={colorBackItem}
                ballIndicatorWidth = {this.sliderBallIndicatorWidth}
                ballIndicatorPosition = {this.sliderBallIndicatorPosition}
              />
            </View>
            <View style = {this.styleSlider}>
              <VerticalSlider
                value={this.abv}
                disabled={true}
                min={1}
                max={13}
                width={this.sliderWidth}
                height={this.sliderHeight}
                step={0.6}
                borderRadius={150}
                minimumTrackTintColor={colorAlcool}
                maximumTrackTintColor={colorBackItem}
                showBallIndicator
                ballIndicatorColor={colorAlcool}
                ballIndicatorTextColor={colorBackItem}
                ballIndicatorWidth = {this.sliderBallIndicatorWidth}
                ballIndicatorPosition = {this.sliderBallIndicatorPosition}
              />
            </View>
          </View>
          <View style = { this.styleLegend }>
            <Image
              style = { this.styleLegendIcon }
              source = {require ('../Images/ic_hop.png')}
            />
            <Image
              style = { this.styleLegendIcon }
              source = {require ('../Images/ic_euro.png')}
            />
            <Image
              style = { this.styleLegendIcon }
              source = {require ('../Images/ic_alcohol.png')}
            />
          </View>
        </View>
        )
    }
}

export default Sliders;

<Sliders
abu = {beer.response.beer.beer_ibu}
price = {(Math.random() * (5 - 1) + 1).toFixed(1)}
abv = {beer.response.beer.beer_abv.toFixed(1)}
width = {this.sliderWidth}
height = {this.sliderHeight}
ballIndicatorWidth = {this.sliderBallIndicatorWidth}
ballIndicatorPosition = {this.sliderBallIndicatorPosition}
styleContainerSlider = {styles.container_slider}
styleSlider = {styles.container}
styleLegend = {styles.view_slider_icon }
styleLegendIcon = {styles.image_slider}

/>