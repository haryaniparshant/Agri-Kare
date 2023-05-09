import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DiseaseDetection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>Camera opened for disease detection</Text>
    </View>
  )
}

export default DiseaseDetection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: '#d3d3d3',
       },
       item: {
         padding: 10,
         fontSize: 18,
         height: 44,
       },
})