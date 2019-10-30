import React from 'react'

import { SafeAreaView ,ActivityIndicator, Image, StyleSheet, View, FlatList, Text, Dimensions,TouchableOpacity } from 'react-native'
import { Slider, Button, Icon } from 'react-native-elements'
import Tooltip from 'react-native-walkthrough-tooltip';
import * as color from '../assets/colors'
var {height, width } = Dimensions.get('window')

class ToolTipRatios extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            toolTipVisible: false
        }

    }
    render() {


        return (
            <Tooltip
                animated = {true}
                isVisible= {this.state.toolTipVisible}
                placement= "bottom"
                // childlessPlacementPadding= {50}
                arrowSize = {{width: 18, height: 10}}
                arrowStyle = {{ alignSelf: "center" }}
                contentStyle= {{ marginLeft: 15, }}
                onClose={() => this.setState({ toolTipVisible: false })}
                content = {
                    <View style = {{backgroundColor: color.colorBackground}}>
                        <View style = {{ marginTop: 10 }}>
                            <View style = { styles.tooltipHeader }>
                            <Image
                                style = { styles.imageTooltip }
                                source = {require ('../Images/ic_hop.png')}
                            />
                            <Text style = {{  color: color.colorDivider,fontFamily: 'MPLUSRounded1c-Bold' }} > : IBU{'\n'}</Text>
                            </View>
                            <Text style = {styles.desText}>Unité en amertume.{'\n'}International bitterness unit (symbole IBU) est une unité utilisée par les brasseurs pour mesurer l'amertume de leurs bières.{'\n'}Plus cette valeur est élevée plus la bière est amère. {'\n'}</Text>
                            {/* <Text style = {{ color: color.colorDivider,textAlign : 'right', marginRight: 25,fontFamily:'MPLUSRounded1c-Regular' , }} >source : Wikipédia</Text> */}
                        </View>
                        <View style = {{ marginTop: 10 }}>
                            <View style = { styles.tooltipHeader }>
                            <Image
                                style = { styles.imageTooltip }
                                source = {require ('../Images/ic_euro.png')}
                            />
                            <Text style = {{ color: color.colorDivider, fontFamily: 'MPLUSRounded1c-Bold'}} > : Argent{'\n'}</Text>
                            </View>
                            <Text style = {styles.desText}>Unité arbitraire sur 5.{'\n'}Même si le prix de la bière peut varier d'un bar à l'autre.{'\n'}Plus cette valeur est élevée plus la bière est chère.</Text>
                        </View>
                        <View style = {{ marginTop: 10 }}>
                            <View style = { styles.tooltipHeader }>
                            <Image
                                style = { styles.imageTooltip }
                                source = {require ('../Images/ic_alcohol.png')}
                            />
                            <Text style = {{color: color.colorDivider,fontFamily: 'MPLUSRounded1c-Bold' }} > : TAV{'\n'}</Text>
                            </View>
                            <Text style = {styles.desText}>Unité en degré d'alcool.{'\n'}Le titre alcoométrique volumique (TAV), aussi appelé degré alcoolique, est la proportion d'alcool dans une boisson.{'\n'}Plus cette valeur est élevée plus la bière contient de l'alcool.{'\n'}</Text>
                            {/* <Text style = {{color: color.colorDivider, textAlign : 'right', marginRight: 25,fontFamily:'MPLUSRounded1c-Regular' , }} >source : Wikipédia</Text> */}
                        </View> 
                        <View>
                            <Text style = {[styles.desText, {fontSize: 15}]}>
                                Les critères peuvent être supprimés en touchant l'interrupteur sous la barre lors du choix des ratios. Il faut néanmoins 1 critère minimum.
                            </Text>    
                            
                        </View>          
                    </View>
                }
                
                
               

                >
                    <TouchableOpacity
                    onPress= {() => this.setState({ toolTipVisible: true})}>
                        <Icon
                        name = "info"
                        type = "octicon"
                        color = {color.colorDivider}
                        size = {30}
                        iconStyle = {{ marginRight: 15 }}
                        />
                    </TouchableOpacity>
            </Tooltip>
            
        )
    }
}

const styles = StyleSheet.create({
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
    desText: {
        fontFamily:'MPLUSRounded1c-Regular' ,
        color: color.colorDivider,
        fontSize: 10,

    }
})

export default ToolTipRatios;