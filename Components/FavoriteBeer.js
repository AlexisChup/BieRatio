
import React from 'react'
import { TouchableOpacity,Image ,StyleSheet, View,  Text, Animated, Easing } from 'react-native'


class FavoriteBeer extends React.Component {

  static navigationOptions = ({ navigate, navigation }) => ({
    title: 'Bières favorites',
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
    // headerBackTitle: "Ratios"
  })


  constructor(props){
    super(props)
    this.state = {
      topPosition: new Animated.Value(0),
      leftPosition: new Animated.Value(0),
    }
  }

  componentDidMount(){
    // Animated.spring(
    //   this.state.topPosition, {
    //     toValue: 100,
    //     speed: 4,
    //     bounciness: 15
    //   }
    // ).start()
    // Animated.decay(
    //   this.state.topPosition,
    //   {
    //     velocity: 0.8,
    //     deceleration: 0.997,
    //   }
    // ).start()
    // Animated.sequence([
    //   Animated.spring(
    //     this.state.topPosition,
    //     {
    //       toValue: 100,
    //       tension: 8,
    //       friction: 3
    //     }
    //   ),
    //   Animated.timing(
    //     this.state.topPosition,
    //     {
    //       toValue: 0,
    //       duration: 1000,
    //       easing: Easing.elastic(2)
    //     }
    //   )
    // ]).start()
    Animated.parallel([
      Animated.spring(
        this.state.topPosition,
        {
          toValue: 100,
          tension: 8,
          friction: 3
        }
      ),
      Animated.timing(
        this.state.leftPosition,
        {
          toValue: 100,
          duration: 1000,
          easing: Easing.elastic(2)
        }
      )
    ]).start()
  }

  componentWillUnmount(){
    // console.log('====================================');
    // console.log("Je demonte le component");
    // console.log('====================================');
    // this.setState({
    //   topPosition: 0,
    // })
  }

  render() {
    return (
      <View style={styles.main_container}>
        {/* <Animated.View style={[styles.animation_view, { top : this.state.topPosition, left: this.state.leftPosition }]}>
        </Animated.View> */}
        <Text>Yo la squale</Text>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 8,
  }
})



export default FavoriteBeer
