import React from 'react'
import { Dimensions, AppRegistry, ScrollView, ActivityIndicator, Image, TouchableOpacity, StyleSheet, View, TextInput, Button, Text, FlatList, SafeAreaView } from 'react-native'
import { getBeerDetailFromApi } from '../API/UntappdApi'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
import Flag from 'react-native-flags';

import ViewMoreText from 'react-native-view-more-text';

import {
  Card,
  Divider,
} from 'react-native-elements'


class DescriptionBeer extends React.Component{


  constructor(props){
    super(props)
    this.state = {
      beer: undefined,
      isLoading: false,
      progress: 0,
      codeState: undefined,
    }
  }


  componentDidMount() {
    this.setState({ isLoading : true })
    getBeerDetailFromApi(this.props.navigation.state.params.bid).then(data => {
      this.setState({
        beer: data,
        isLoading: false
      }, () => { this._updateNavigationParams() })
    })
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      beer: this.state.beer,
    })
  }

  _displayLoading() {
    if(this.state.isLoading){
      return(
        <View style = {styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _displayImageHd(){
    const beer = this.state.beer
    var imageQuality;
    if( beer != undefined){
      console.log("bid : " + beer.response.beer.bid);
      imageQuality = beer.response.beer.beer_label_hd.length > 0 ?  beer.response.beer.beer_label_hd : beer.response.beer.beer_label
      return (
        <Image
          style = {styles.image}
          source = {{uri : imageQuality}}
        />
      )
    }


  }

  _displayFlag(){
    const beer = this.state.beer
    const { getCode, getName } = require('country-list');
    var codeState = getCode( beer.response.beer.brewery.country_name );
    if (codeState != undefined){
      return (
        <Flag
          code = {codeState}
          size = { 64 }
          type = 'shiny'
        />
      )
    }
  }


  _renderViewMore(onPress){
    return(
      <Text onPress={onPress}  style = { styles.show_More }>
        Voir plus
      </Text>
    )
  }

  _renderViewLess(onPress){
    return(
      <Text onPress={onPress} style = { styles.show_More }>
        Voir moins
      </Text>
    )
  }

  _displayTextDescription(){
    const beer = this.state.beer
    if(beer.response.beer.beer_description.length > 0){
      return(
        <Card title = "Description">
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={this._renderViewMore}
            renderViewLess={this._renderViewLess}
            textStyle={{textAlign: 'center'}}
          >
            <Text style = { styles.description_beer }>
              {beer.response.beer.beer_description}
            </Text>
          </ViewMoreText>
        </Card>
      )
    }
  }






  _displayBeer(){
    const { getCode, getName } = require('country-list')
    const beer = this.state.beer
    const data = {
      labels: ['Goût', 'Prix', 'Alcool'],
      datasets: [{
        data: [ 4.3, 2.1, 4.6 ]
      }]
    }

    if( beer != undefined){
      return(
        <ScrollView style = {styles.main_container}>
        <Card
          title = {beer.response.beer.beer_name}
          titleStyle = {styles.beer_title}>
          <View style = {styles.header}>
            {this._displayImageHd()}
            <View style = { styles.header_description }>
              { this._displayFlag() }
              <Text style={styles.header_description_average}>{beer.response.beer.beer_abv}%</Text>
              <Image
                style = { styles.header_image }
                source = { require('../Images/ic_favorite_beer.png') }
              />
            </View>
          </View>
        </Card>



        <Card title = "Ratio">
          <BarChart

            style={styles.bar_chart}
            data={data}
            width={Dimensions.get('window').width-10}
            height={220}
            yAxisLabel={''}
            fromZero= {true}
            chartConfig={{
              backgroundColor: '#E25731',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
            }}
          />
        </Card>
        {this._displayTextDescription()}


        </ScrollView>
      )
    }
  }



  render(){
    return(
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayBeer()}
      </View>
    )
  }
}





const styles = StyleSheet.create({
  main_container : {
    flex: 1,

  },
  beer_title : {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',

  },
  image: {
    resizeMode: 'contain',
    flex: 2,
  },
  header: {
    flexDirection: 'row',
  },
  header_description: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header_description_average: {
    fontSize: 30,
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: 'black',
    borderBottomColor: 'black',
  },
  header_image: {
    width: 48,
    height: 48,
  },
  description_beer: {
    fontSize: 15,

  },
  show_More: {
    textAlign: 'right',
    color: 'blue',
    fontSize: 17,

  },
  frame: {
    margin: 5,
  },
  beer_ratio: {
    fontSize: 20,

  },
  bar_chart: {

  },

})





export default DescriptionBeer
