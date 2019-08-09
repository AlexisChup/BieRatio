import React from 'react'

import { SafeAreaView ,ActivityIndicator, Image, StyleSheet, View, FlatList, Text, Dimensions } from 'react-native'
import { Slider, Button, Tooltip, Icon } from 'react-native-elements'

import * as color from '../assets/colors'
var {height, width } = Dimensions.get('window')

class ToolTipRatios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Tooltip
                popover = {
                    <View>
                    <View style = {{ marginTop: 10 }}>
                        <View style = { styles.tooltipHeader }>
                        <Image
                            style = { styles.imageTooltip }
                            source = {require ('../Images/ic_hop.png')}
                        />
                        <Text style = {{ fontWeight: 'bold', color: color.colorDivider, }} > : IBU{'\n'}</Text>
                        </View>
                        <Text style = {{ color: color.colorDivider, }}>International bitterness unit (symbole IBU) est une unité utilisée par les brasseurs pour mesurer l'amertume de leurs bières.{'\n'}Plus cette valeur est élevée plus la bière est amère. {'\n'}</Text>
                        <Text style = {{ color: color.colorDivider,textAlign : 'right', marginRight: 25, }} >source : Wikipédia</Text>
                    </View>
                    <View style = {{ marginTop: 10 }}>
                        <View style = { styles.tooltipHeader }>
                        <Image
                            style = { styles.imageTooltip }
                            source = {require ('../Images/ic_euro.png')}
                        />
                        <Text style = {{ color: color.colorDivider,fontWeight: 'bold' }} > : Argent{'\n'}</Text>
                        </View>
                        <Text style = {{color: color.colorDivider, }}>Unité arbitraire sur 5.{'\n'}Même si le prix de la bière peut varier d'un bar à l'autre.{'\n'}Plus cette valeur est élevée plus la bière est chère.</Text>
                    </View>
                    <View style = {{ marginTop: 10 }}>
                        <View style = { styles.tooltipHeader }>
                        <Image
                            style = { styles.imageTooltip }
                            source = {require ('../Images/ic_alcohol.png')}
                        />
                        <Text style = {{color: color.colorDivider, fontWeight: 'bold' }} > : TAV{'\n'}</Text>
                        </View>
                        <Text style = {{color: color.colorDivider,  }}>Le titre alcoométrique volumique (TAV), aussi appelé degré alcoolique, est la proportion d'alcool dans une boisson.{'\n'}Plus cette valeur est élevée plus la bière contient de l'alcool{'\n'}</Text>
                        <Text style = {{color: color.colorDivider, textAlign : 'right', marginRight: 25, }} >source : Wikipédia</Text>
                    </View>           
                    </View>
                }
                width = {width - 10}
                height = {height-200}
                containerStyle = {{ marginRight: 150, backgroundColor: color.colorBottomTabBackground }}>
                    <Icon
                    name = "info"
                    type = "octicon"
                    color = {color.colorDivider}
                    size = {30}
                    iconStyle = {{ marginRight: 15 }}
                    />
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
})

export default ToolTipRatios;