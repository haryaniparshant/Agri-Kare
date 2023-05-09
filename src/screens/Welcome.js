import { StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native'
import React from 'react'
import {button1} from '../common/button'
import logo from '../../assets/logo.jpeg'
const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.welcome} source={logo}/>
      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
      <Text style={button1}>
            Login
        </Text>
      </TouchableOpacity>
      {/* //TO-DO buttons bhtr krny hain */}
      <Text style={button1}onPress={() => navigation.navigate('Signup')}>
            Signup
        </Text>
      <Text style={button1}onPress={() => navigation.navigate('Admin')}> 
            Login as a admin
        </Text>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  welcome:{
        marginBottom: 10,
  },
  container:{
    backgroundColor: '#d3d3d3',
    height:'100%'
  }
});