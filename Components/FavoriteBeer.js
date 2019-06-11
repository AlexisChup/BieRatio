
import React from 'react'

import { StyleSheet, View, FlatList, SafeAreaView, Text, ScrollView } from 'react-native'
import { Bar, VictoryBar, VictoryChart, VictoryTheme, VictoryVoronoiContainer, VictoryContainer } from "victory-native";

const data = [
  { x: "Goût", y: 2.5, fill:"#376285", opacity: 1, label: "G" },
  { x: "Prix", y: 1.3, fill: "#e7eb96", opacity: 1, label: "P" },
  { x: "Alcool", y: 3.8, fill: "#fe0a00", opacity: 0.8, label: "A" },

];

class FavoriteBeer extends React.Component{

  constructor(props){
    super(props)
    this.state= {
      scrollEnabled: false
    }
    this.text = "A"
  }



  render() {
    VictoryTheme.material.axis.style.grid.stroke = 'none'

    return(
      <SafeAreaView style = {styles.main_container}>

          <View style={styles.container}>
            <VictoryChart
              width={350}
              theme={VictoryTheme.material}
              domain={{ x: [0.5, 3.5], y: [0, 5] }}
              // containerComponent={
              //   <VictoryVoronoiContainer
              //     labels={(d) => `${d.x}, ${d.y}`}
              //   />
              // }

            >
              <VictoryBar
                data={data}
                barRatio = {0.8}
                cornerRadius = {{ top: 15 }}
                style = {{
                  data: {
                    fill: (d) => d.fill,stroke: "black", strokeWidth: 2,
                    opacity: (d) => d.opacity
                  }
                }}
                categories = {{
                  x: ["Goût", "Prix", "Alcool"]
                }}
              />
            </VictoryChart>

            <VictoryBar
              data={[
                {x: 1, y: 2},
                {x: 2, y: 4},
                {x: 3, y: 7},
                {x: 4, y: 3},
                {x: 5, y: 5},
              ]}
              dataComponent={
                <Bar
                  events={{
                    onClick: () => console.log("Appuie sur une bar")
                  }}
                />
              }
            />




          </View>

      </SafeAreaView>
    )
  }
}




const styles = StyleSheet.create({

  main_container: {
    flex:1,

  },
  container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5fcff"
  },

})
export default FavoriteBeer
