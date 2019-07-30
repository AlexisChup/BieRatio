import React from 'react'
import {  ScrollView, ActivityIndicator, Image, StyleSheet, View, TextInput, Button, Text, Platform, Alert, Animated } from 'react-native'
import { getBeerDetailFromApi } from '../API/UntappdApi'
import { getBeerByBid } from '../API/BieRatioApi'
import VerticalSlider from 'rn-vertical-slider'


import Flag from 'react-native-flags';

import ViewMoreText from 'react-native-view-more-text';

import { Card, Icon, ThemeProvider } from 'react-native-elements'

import { ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';


import { colorAlcool, colorBackItem, colorIbu, colorPrice} from '../assets/colors'

import EnlargeShrink from './Animations/EnlargeShrink'

import { Ipv4 } from '../assets/Ip'
import { TouchableOpacity } from 'react-native-gesture-handler';

TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, '41c2d80ee5584c0c9ec9baa101f89371','fr');

class DescriptionBeer extends React.Component{


  constructor(props){
    super(props)
    this.state = {
      beer: undefined,
      isLoading: true,
      progress: 0,
      codeState: undefined,
      disabled: true,
      addButon: "Déjà existante",
      priceText: (Math.random() *5).toFixed(1),
      randomDisabled: true,
      editable: false,
      text: "Déjà rempli",
      backgroundColor: "#D9D9D9",
      price : (Math.random() * (5 - 1) + 1).toFixed(1),
      selectedIndex: 0,
      description: "",
      existInAPI: false,
      iconName : "ios-heart-empty",
    }
    this.ibu = this.props.navigation.state.params.ibu,
    this.price = this.props.navigation.state.params.price,
    this.abv = this.props.navigation.state.params.abv,
    this.sliderBallIndicatorPosition = -40,
    this.sliderBallIndicatorWidth = 35,
    this.sliderWidth = 25,
    this.sliderHeight = 180,
    this._updateIndex = this._updateIndex.bind(this);
  }


  componentDidMount() {
    this.setState({ isLoading : true })
    getBeerByBid(this.props.navigation.state.params.bid).then(data => {  
      if(data["hydra:totalItems"] === 0){
        this.setState({
          disabled: false,
          addButon: "Ajouter dans l'API",
          editable: true,
          text: "",
          backgroundColor: 'red',
          randomDisabled: false,
        }, () => {this._getDetailFromUntappd()} )

      }else{
        this.setState({
          beer: data["hydra:member"][0],
          existInAPI: true,
        }, () => {this._checkProps()}  )
      }
    })
  }

  _checkProps(){
    this.setState({
      priceText: this.state.beer.price.toFixed(1),
      isLoading: false,
    })
  }

  _getDetailFromUntappd(){
    getBeerDetailFromApi(this.props.navigation.state.params.bid).then(data => {
      this.setState({
        beer: data.response.beer,
        isLoading: false,
      }, () => { this._updateNavigationParams() })
    }) 
  }



  _updateDescription(){
    const beer = this.state.beer
    var description = beer.beer_description
    console.log('====================================');
    console.log("Traduction va etre faite: " + description);
    console.log('====================================');
    this.setState({
      isLoading: true,
    })
    const translator = TranslatorFactory.createTranslator();
    translator.translate(description, 'fr').then(translated => {
    //Do something with the translated text which would be in French
      description = translated
      this.setState({
        description: description
      }, () => this._addToAPI())

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
    const imageQuality = this.state.existInAPI === true ? beer.label : (beer.beer_label_hd.length > 0 ? beer.beer_label_hd : beer.beer_label )
    if( beer != undefined){
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
    console.log('====================================');
    console.log('bid : ' + beer.bid)
    console.log('====================================');
    const { getCode } = require('country-list');
    var codeState = this.state.existInAPI === true ? getCode (beer.countryName) : getCode(beer.brewery.country_name)
    if(codeState === undefined){
      if(this.state.existInAPI){
        if(beer.countryName === "Russia"){
          codeState = getCode("Russian Federation")
        }else if (beer.countryName === "England"){
          codeState = getCode("United Kingdom")
        }else if (beer.countryName == "South Korea"){
          codeState = getCode("Korea, Republic of")
        }
      }else{
        if(beer.brewery.country_name === "Russia"){
          codeState = getCode("Russian Federation")
        }else if (beer.brewery.country_name === "England"){
          codeState = getCode("United Kingdom")
        }else if (beer.brewery.country_name == "South Korea"){
          codeState = getCode("Korea, Republic of")
        }
      }
    }
    
    if (codeState != undefined){
      return (
        <Flag
          code = {codeState}
          size = { 32 }
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
    const description = this.state.existInAPI === true ? beer.description : beer.beer_description
    if(description.length > 2){
      return(
        <Card title = "Description">
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={this._renderViewMore}
            renderViewLess={this._renderViewLess}
            textStyle={{textAlign: 'center'}}
          >
            <Text style = {{ fontSize: 15 }}>
              {description}
            </Text>
          </ViewMoreText>
        </Card>
      )
    }
  }


  _displaySlider(){
    const existInAPI = this.state.existInAPI
    const beer = this.state.beer
    if (existInAPI){
      return(
        <Card title = "Ratio">
          <View
              style = {styles.container_slider}
            >
              <View style = {styles.container}>
                <VerticalSlider
                  value={beer.ibu}
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

              <View style = {styles.container}>
                <VerticalSlider
                  value={beer.price}
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
              <View style = {styles.container}>
                <VerticalSlider
                  value={beer.abv}
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
            <View style = { styles.view_slider_icon }>
              <Image
                style = { styles.image_slider }
                source = {require ('../Images/ic_hop.png')}
              />
              <Image
                style = { styles.image_slider }
                source = {require ('../Images/ic_euro.png')}
              />
              <Image
                style = { styles.image_slider }
                source = {require ('../Images/ic_alcohol.png')}
              />
            </View>
          </Card>
        )
    }
    else{
      return(
        <Card title = "Ratio">
          <View
            style = {styles.container_slider}
          >
            <View style = {styles.container}>
              <VerticalSlider
                value={beer.beer_ibu}
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

            <View style = {styles.container}>
              <VerticalSlider
                value={parseFloat(this.state.priceText)}
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
            <View style = {styles.container}>
              <VerticalSlider
                value={beer.beer_abv.toFixed(1)}
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
          <View style = { styles.view_slider_icon }>
            <Image
              style = { styles.image_slider }
              source = {require ('../Images/ic_hop.png')}
            />
            <Image
              style = { styles.image_slider }
              source = {require ('../Images/ic_euro.png')}
            />
            <Image
              style = { styles.image_slider }
              source = {require ('../Images/ic_alcohol.png')}
            />
          </View>
        </Card>
        )
    }
  }

  _addToAPI(){
    const beer = this.state.beer
    const imageHD =  beer.beer_label_hd.length > 0 ? beer.beer_label_hd : beer.beer_label
    const url = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/beers' : 'http://' + Ipv4 + ':8000/api/beers'

    console.log('====================================');
    console.log("Before the post Request description : " + this.state.description);
    console.log('====================================');
    
    if(this.state.priceText.length === 3 && parseFloat(this.state.priceText)>= 0 && parseFloat(this.state.priceText)<= 5  ){
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bid: beer.bid,
          name: beer.beer_name,
          abv: beer.beer_abv,
          ibu: beer.beer_ibu,
          price: parseFloat(this.state.priceText),
          ratingScore :parseFloat(beer.rating_score.toFixed(1)),
          ratingCount :1,
          description: this.state.description,
          label: imageHD,
          countryName : beer.brewery.country_name
        }),
      }).then(response => {
        const price = parseFloat(this.state.text)
        if(response.status === 201){
          this.setState({
            disabled: true,
            addButon: "Bière envoyé !",
            price : price,
            editable: false,
            text: "Prix envoyé !",
            backgroundColor: '#D9D9D9',
            isLoading: false,
            randomDisabled: true
            
            
          })
        }
      });
    }
    else{
      Alert.alert('Le prix doit être compris entre 0.0 et 5.0')
    }
    
    

  }



  _updateIndex (selectedIndex) {
    this.setState({
      selectedIndex : selectedIndex
    })
  }

  _getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  _randomPrice(){
    const price = (Math.random() *5).toFixed(1)
    this.setState({
      priceText : price,
      backgroundColor: this._getRandomColor()
    })
  }

  _displayFavoriteBeer(){
    return(
      <TouchableOpacity
        onPress = {()=> this._updateFavorite() }
      >
        <Icon
          type = "ionicon"
          name = {this.state.iconName}
          iconStyle = {{ marginLeft: 25 }}
          size = {40}
        />
      </TouchableOpacity>
      
    )
  }

  _updateFavorite(){
    this.setState({
      iconName : this.state.iconName === "ios-heart-empty" ? "ios-heart" : "ios-heart-empty"
    })
  }
  

  _displayBeer(){

    if(!this.state.isLoading){


      const beer = this.state.beer
      const title = this.state.existInAPI === true ? beer.name : beer.beer_name
      const ratingScore = this.state.existInAPI === true ? beer.ratingScore : beer.rating_score.toFixed(1)
      if( beer != undefined){
        const { selectedIndex } = this.state
        return(
          <ScrollView style = {styles.main_container}>
          <Card
            title = {title}
            titleStyle = {styles.beer_title}>
            <View style = {{ flexDirection : 'row', justifyContent: "space-evenly" }}>
              {this._displayImageHd()}
              <View style = { styles.header_description }>
                <View style = { styles.iconContainer }>
                  <Image
                    style = { styles.icon }
                    source = {require('../Images/ic_brewery.png')}
                  />
                  <Text style ={{ fontSize: 20 }} > : </Text>
                  { this._displayFlag() }
                </View>
                
                {this._displayFavoriteBeer()}
              </View>
            </View>
          </Card>

          <View style = {{ flexDirection: 'row', justifyContent: "space-evenly" }} >
            <Text style = {{ fontSize: 20, fontWeight: 'bold' }} >Saisir Prix : </Text>
            <TextInput
              editable = {this.state.editable}
              value = {this.state.priceText}
              onChangeText ={(text) => this.setState({ priceText: text }) }
              style = {{ textAlign: 'center', fontSize: 20, height: 30, color: '#D9D9D9', width: 150, color: this.state.backgroundColor }}
              placeholder = "Veuillez saisir le prix/ 5"
              placeholderTextColor = '#D9D9D9'
              onSubmitEditing = {() => this._addToAPI()}
            />
          </View>


          <View style = {{flexDirection: "row", justifyContent : "space-evenly"}} >
            <Text style = {{ fontSize: 20, fontWeight: 'bold' }}>Random Prix :</Text>
            <Button 
              title = {this.state.priceText}
              disabled = {this.state.randomDisabled}
              onPress = {() => this._randomPrice() }
              color = {this.state.backgroundColor}
              style = {{margin : 10, height: 50, fontSize: 20, width: 150}}
            />
          </View>

          <Button
            title = {this.state.addButon}
            disabled = {this.state.disabled}
            onPress = {() => this._updateDescription()}
            color = {this.state.backgroundColor}
            style = {{margin: 10, height: 50 }}
          />



          {this._displaySlider()}

          

          {this._displayTextDescription()}





          </ScrollView>
        )
      }
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
  view_slider_icon: {
    marginTop: -20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image_slider: {
    height: 30,
    width: 30,
  },
  container_slider: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  iconContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 30,
  },
  icon:{
    height: 30,
    width: 30,
  },
  view_slider_icon:{
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    margin: 60,
    
  },
  beer_title : {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',

  },
  image: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
  },
  header_description: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  header_image: {
    width: 35,
    height: 35,
    marginLeft: 25,
  },
  show_More: {
    textAlign: 'right',
    color: 'blue',
    fontSize: 17,
  },

})





export default DescriptionBeer
