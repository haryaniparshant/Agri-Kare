import { StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native'
import React from 'react'
import {button1} from '../common/button'
import logo from '../../assets/logo.jpeg'

const Homepage = ({navigation}) => {
  return (
    <View style={styles.container}>
    <Image style={styles.welcome} source={logo}/>
    <TouchableOpacity onPress={() => navigation.navigate('Community')}>
    <Text style={button1}>
          Go to Community Page
      </Text>
    </TouchableOpacity>
    {/* //TO-DO buttons bhtr krny hain */}
    <Text style={button1}onPress={() => navigation.navigate('DiseaseDetection')}>
          Scan For disease detection
      </Text>
    
  </View>
  )
}

export default Homepage

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#d3d3d3',
  }
})