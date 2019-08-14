import React from 'react'
import {  ScrollView, ActivityIndicator, Image, StyleSheet, View, TextInput, Text, Platform, Alert, Animated, Linking, Dimensions, TouchableOpacity } from 'react-native'
import { getBeerDetailFromApi } from '../API/UntappdApi'
import { getBeerByBid } from '../API/BieRatioApi'
import VerticalSlider from 'rn-vertical-slider'
import { connect } from 'react-redux'

import Flag from 'react-native-flags';

import ViewMoreText from 'react-native-view-more-text';

import { Card, Icon, ThemeProvider ,Button, } from 'react-native-elements'

import { ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';

import { keyMicrosftAzure } from '../Access_Token/keyMicrosoftAzure'

import * as color  from '../assets/colors'

import EnlargeShrink from './Animations/EnlargeShrink'

import { Ipv4 } from '../assets/Ip'
import ToolTipRatios from './ToolTipRatios'

var {height, width} = Dimensions.get('window');


TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, keyMicrosftAzure,'fr');

class DescriptionBeer extends React.Component{
  static navigationOptions = ({}) => ({
    headerRight: (
      <ToolTipRatios
      />
    ),
  })

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
      callRemaining: true,
    }
    this.colorCard = color.colorBackground,
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

  componentDidUpdate(){
    // console.log("Component update ? : "+ JSON.stringify(this.props.favoritesBeers,null, 4));
    
  }

  _checkProps(){
    this.setState({
      priceText: this.state.beer.price.toFixed(1),
      isLoading: false,
    })
  }
  _checkPropsAfterAdd(){
    this.setState({
      priceText: this.state.beer.price.toFixed(1),
      isLoading: false,
    }, this._toggleFavorite())
  }

  _getDetailFromUntappd(){
    getBeerDetailFromApi(this.props.navigation.state.params.bid).then(data => {
      if(data.meta.code !== 429){
        this.setState({
          beer: data.response.beer,
          isLoading: false,
        }, () => { this._updateNavigationParams() })
      }else {
        this.setState({
          callRemaining: false,
          isLoading: false
        })
      }
    })
    .catch((error) =>    console.log("error : "  + error))
  }



  _updateDescriptionAfterToggleFavorite(){
    const beer = this.state.beer
    var description = beer.beer_description
    this.setState({
      isLoading: true,
    })
    const translator = TranslatorFactory.createTranslator();
    translator.translate(description, 'fr').then(translated => {
    //Do something with the translated text which would be in French
      description = translated
      this.setState({
        description: description
      }, () => this._addToAPIAfterToggleFavorite())

    })

  }
  _addToAPIAfterToggleFavorite(){
    const beer = this.state.beer
    const imageHD =  beer.beer_label_hd.length > 0 ? beer.beer_label_hd : beer.beer_label
    const url = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/beers' : 'http://' + Ipv4 + ':8000/api/beers'
    
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
            randomDisabled: true,
            
          }, () => this._reloadBeerAfterAdToToggleFavorite())
        }
      });
    }
    else{
      this.setState({
        isLoading: false
      })
      Alert.alert('Le prix doit être compris entre 0.0 et 5.0')
    }
  }

  _reloadBeerAfterAdToToggleFavorite(){
    getBeerByBid(this.props.navigation.state.params.bid).then(data => {  
      this.setState({
        beer: data["hydra:member"][0],
        existInAPI: true,
      }, () => {this._checkPropsAfterAdd()}  )
    })
  }
  _reloadBeerAfterAd(){
    getBeerByBid(this.props.navigation.state.params.bid).then(data => {  
      this.setState({
        beer: data["hydra:member"][0],
        existInAPI: true,
      }, () => {this._checkProps()}  )
    })
  }

  _updateDescription(){
    
    const beer = this.state.beer
    var description = beer.beer_description
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
  _addToAPI(){
    const beer = this.state.beer
    const imageHD =  beer.beer_label_hd.length > 0 ? beer.beer_label_hd : beer.beer_label
    const url = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/beers' : 'http://' + Ipv4 + ':8000/api/beers'
    
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
            randomDisabled: true,

            
            
          }, () => this._reloadBeerAfterAd() )
        }
      });
    }
    else{
      this.setState({
        isLoading: false
      })
      Alert.alert('Le prix doit être compris entre 0.0 et 5.0')
    }
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
        }else if (beer.countryName == "Scotland"){
          codeState = getCode("United Kingdom")
        }
      }else{
        if(beer.brewery.country_name === "Russia"){
          codeState = getCode("Russian Federation")
        }else if (beer.brewery.country_name === "England"){
          codeState = getCode("United Kingdom")
        }else if (beer.brewery.country_name == "South Korea"){
          codeState = getCode("Korea, Republic of")
        }else if (beer.brewery.country_name == "Scotland"){
          codeState = getCode("United Kingdom")
        }
      }
    }
    
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
    const description = this.state.existInAPI === true ? beer.description : beer.beer_description
    if(description.length > 2){
      return(
        <Card title = "Description"
            containerStyle = { styles.card }
            dividerStyle = {styles.cardDivider}
            titleStyle = {styles.cardSubTitle}>
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={this._renderViewMore}
            renderViewLess={this._renderViewLess}
            textStyle={{textAlign: 'center'}}
          >
            <Text style = {styles.textDescription}>
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
        <Card title = "Ratios"
              containerStyle = { styles.card }
              dividerStyle = {styles.cardDivider}
              titleStyle = {styles.cardSubTitle}>
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
                  minimumTrackTintColor={color.colorIbu}
                  maximumTrackTintColor={color.colorBackItem}
                  showBallIndicator = {true}
                  ballIndicatorColor={color.colorIbu}
                  ballIndicatorTextColor={'white'}
                  ballIndicatorWidth = {this.sliderBallIndicatorWidth}
                  ballIndicatorPosition = {this.sliderBallIndicatorPosition}
                />

              </View>

              <View style = {styles.container}>
                <VerticalSlider
                  value={beer.price}
                  disabled={true}
                  min={0}
                  max={5}
                  width={this.sliderWidth}
                  height={this.sliderHeight}
                  step={0.2}
                  borderRadius={150}
                  minimumTrackTintColor={color.colorPrice}
                  maximumTrackTintColor={color.colorBackItem}
                  showBallIndicator
                  ballIndicatorColor={color.colorPrice}
                  ballIndicatorTextColor={color.colorBackItem}
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
                  minimumTrackTintColor={color.colorAlcool}
                  maximumTrackTintColor={color.colorBackItem}
                  showBallIndicator
                  ballIndicatorColor={color.colorAlcool}
                  ballIndicatorTextColor={color.colorBackItem}
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
        <Card title = "Ratios"
              containerStyle = {styles.card}
              dividerStyle = {styles.cardDivider}
              titleStyle = {styles.cardSubTitle}>
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
                minimumTrackTintColor={color.colorIbu}
                maximumTrackTintColor={color.colorBackItem}
                showBallIndicator = {true}
                ballIndicatorColor={color.colorIbu}
                ballIndicatorTextColor={'white'}
                ballIndicatorWidth = {this.sliderBallIndicatorWidth}
                ballIndicatorPosition = {this.sliderBallIndicatorPosition}
              />

            </View>

            <View style = {styles.container}>
              <VerticalSlider
                value={parseFloat(this.state.priceText)}
                disabled={true}
                min={0}
                max={5}
                width={this.sliderWidth}
                height={this.sliderHeight}
                step={0.2}
                borderRadius={150}
                minimumTrackTintColor={color.colorPrice}
                maximumTrackTintColor={color.colorBackItem}
                showBallIndicator
                ballIndicatorColor={color.colorPrice}
                ballIndicatorTextColor={color.colorBackItem}
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
                minimumTrackTintColor={color.colorAlcool}
                maximumTrackTintColor={color.colorBackItem}
                showBallIndicator
                ballIndicatorColor={color.colorAlcool}
                ballIndicatorTextColor={color.colorBackItem}
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
    if(!this.state.existInAPI){
      var nameIcon = "ios-heart-empty"
      var nameButton = " Ajouter aux Favoris "
      if(this.props.favoritesBeers.findIndex(item => item.bid === this.state.beer.bid) !== -1){
        nameIcon = "ios-heart"
        nameButton = " Favoris " 
      }
      return(
        // <TouchableOpacity
        //   onPress = {()=> this._updateDescriptionAfterToggleFavorite() }
        // >
        //   {this._displayFavoriteIcon()}
        // </TouchableOpacity>
        <Button
          title = {nameButton}
          onPress = {()=> this._updateDescriptionAfterToggleFavorite() }
          iconRight = {true}
          icon = { 
            <Icon
              type = "ionicon"
              name = {nameIcon}
              size = {30}
              color = {color.colorBackground}
            
            />
          }
          buttonStyle = { styles.buttonBuyStyle }
          titleStyle = { styles.buttonBuyText }
        />
        
      )
    }else if ( this.state.existInAPI ){
      var nameIcon = "ios-heart-empty"
      var nameButton = " Ajouter aux Favoris "
      if(this.props.favoritesBeers.findIndex(item => item.bid === this.state.beer.bid) !== -1){
        nameIcon = "ios-heart"
        nameButton = " Favoris " 
      }
      return(
        // <TouchableOpacity
        //   onPress = {()=> this._toggleFavorite() }
        // >
        //   {this._displayFavoriteIcon()}
        // </TouchableOpacity>
        <Button
          title = {nameButton}
          onPress = {()=> this._toggleFavorite() }
          iconRight = {true}
          icon = { 
            <Icon
              type = "ionicon"
              name = {nameIcon}
              size = {30}
              color = {color.colorBackground}
            
            />
          }
          buttonStyle = { styles.buttonBuyStyle }
          titleStyle = { styles.buttonBuyText }
        />
        
      )

    }
  }

  _displayFavoriteIcon(){
    var nameIcon = "ios-heart-empty"
    if(this.props.favoritesBeers.findIndex(item => item.bid === this.state.beer.bid) !== -1){
      nameIcon = "ios-heart" 
    }
    return(
      <Icon
        type = "ionicon"
        name = {nameIcon}
        iconStyle = {{ marginLeft: 25 }}
        size = {40}
        color = {color.colorDivider}
      />
    )
  }

  _toggleFavorite(){
    const action = { type: "TOGGLE_FAVORITE", value: this.state.beer }
    this.props.dispatch(action)

  }
  
  // handleClick = () => {
  //   Linking.canOpenURL(this.props.url).then(supported => {
  //     if (supported) {
  //       Linking.openURL(this.props.url);
  //     } else {
  //       console.log("Don't know how to open URI: " + this.props.url);
  //     }
  //   });
  // }

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
              titleStyle = {styles.beer_title}
              containerStyle = {styles.card}
              dividerStyle = {styles.cardDivider}>
              <View style = {{ flexDirection : 'row', justifyContent: "space-evenly" }}>
                {this._displayImageHd()}
                <View style = { styles.header_description }>
                  <View style = { styles.iconContainer }>
                    <Image
                      style = { styles.icon }
                      source = {require('../Images/ic_brewery.png')}
                    />
                    <Text style ={{ fontSize: 30 }} > : </Text>
                    { this._displayFlag() }
                  </View>
                  
                </View>
              </View>
            </Card>
{/* 
            <View style = {{ flexDirection: 'row', justifyContent: "space-evenly" }} >
              <Text style = {{ fontSize: 20, fontWeight: 'bold' }} >Saisir Prix : </Text>
              <TextInput
                editable = {this.state.editable}
                value = {this.state.priceText}
                onChangeText ={(text) => this.setState({ priceText: text }) }
                style = {{ textAlign: 'center', fontSize: 20, height: 30, color: '#D9D9D9', width: 150, color: this.state.backgroundColor }}
                placeholder = "Veuillez saisir le prix/ 5"
                placeholderTextColor = '#D9D9D9'
                onSubmitEditing = {() => this._updateDescription()}
              />
            </View>


            <View style = {{flexDirection: "row", justifyContent : "space-evenly", alignItems: 'center'}} >
              <Text style = {{ fontSize: 20, fontWeight: 'bold' }}>Random Prix :</Text>
              <Button 
                title = {this.state.priceText}
                disabled = {this.state.randomDisabled}
                onPress = {() => this._randomPrice() }
                buttonStyle = {{margin : 10, height: 40, width: 150, backgroundColor:this.state.backgroundColor }}
                titleStyle = {{ fontSize:20 }}
              />
            </View>

            <Button
              title = {this.state.addButon}
              disabled = {this.state.disabled}
              onPress = {() => this._updateDescription()}
              buttonStyle = {{margin: 10, height: 40, backgroundColor: this.state.backgroundColor }}
            /> */}



            {this._displaySlider()}

            

            {this._displayTextDescription()}

            <View style = {styles.viewButton} > 
              <Button
                title = " Acheter "
                onPress={ ()=>{ Linking.openURL('https://google.com/search?q=buy+' + title+'+beer')}}
                iconRight = {true}
                icon = { 
                  <Icon
                    type = "material-community"
                    name = "cash-register"
                    size = {30}
                    color = {color.colorBackground}
                  
                  />
                }
                buttonStyle = { styles.buttonBuyStyle }
                titleStyle = { styles.buttonBuyText }
              />
              {this._displayFavoriteBeer()}

            </View>




            <View style = {{ marginBottom: 10 }} ></View>

          </ScrollView>
        )
      }
    }else {
      return null
    }
  }

  render(){
    // console.log("Props : " + JSON.stringify(this.props, null, 4));
    
    if(this.state.callRemaining){
      return(
        <View style={styles.main_container}>
          {this._displayLoading()}
          {this._displayBeer()}
        </View>
      )
    }else{
      return(
        <View style = {styles.iconView} >
          <Text style = {styles.iconText} >
            Limite de recherches atteintes pour cette heure. Veuillez attendre la prochaine heure pour en rechercher de nouvelles.
          </Text>
          <Image
            style = {styles.iconImage}
            source = {require('../Images/emoji_man_shrugging.png')}
          />
        </View>
      )
    }
  }
}





const styles = StyleSheet.create({
  main_container : {
    flex: 1,
    backgroundColor: color.colorBottomTabBackground
  },
  view_slider_icon: {
    paddingBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loading_container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  viewButton: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonBuyStyle: {
    borderRadius: 100,
    borderWidth: 5,
    borderColor: color.colorDivider,
    backgroundColor: color.colorDivider
  },
  buttonBuyText: {
    color: color.colorBackground,
    marginRight: 10,
    fontSize: 14,
    fontFamily: 'MPLUSRounded1c-Bold',
    fontWeight: "300",
  },
  buttonBuyIon: {

  }, 
  image_slider: {
    height: 30,
    width: 30,
  },
  container_slider: {
    justifyContent: "space-evenly",
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 30,
  },
  icon:{
    height: 60,
    width: 60,
  },
  card: {
    backgroundColor: color.colorBackground,
    borderColor: color.colorDivider,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, 
    elevation: 20,
  },
  cardDivider:{
    backgroundColor: color.colorDivider,
    opacity: 100,
    height: 3,
    borderRadius: 10,
  },
  cardSubTitle: {
    color: color.colorDivider,
    fontFamily: 'MPLUSRounded1c-Bold',
    fontWeight: "300"

  },
  textDescription:{
    fontSize: 15,
    color: color.colorDivider,
    fontFamily: 'MPLUSRounded1c-Regular'
  },
  view_slider_icon:{
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    marginHorizontal: 60,
    marginBottom: 20,
  },
  beer_title : {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    color: color.colorDivider,
    fontFamily: 'MPLUSRounded1c-Bold',
    fontWeight: "400"

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
    color: color.colorAlcool,
    fontSize: 17,
    fontFamily: 'Pacifico-Regular',
  },  
  iconImage: {
    height: 200,
    width: 200,
    marginTop: 25,
    resizeMode: 'contain',
    
  },
  iconView: {
    margin: 15,
    alignItems: 'center'
  },
  iconText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: color.colorDivider
  }

})

const mapStateToProps = (state) => {
  return { 
    favoritesBeers : state.favoritesBeers
  }
}


export default connect(mapStateToProps)(DescriptionBeer)
