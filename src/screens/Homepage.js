import { StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native'
import React, {useContext} from 'react'
import {button1} from '../common/button'
import logo from '../../assets/logo.jpeg'
import { Context as AuthContext } from '../context/AuthContext'
import SearchCrop from './SearchCrop';
import Community from './Community';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiseaseDetection from './DiseaseDetection'
import { NavigationContainer } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingScreen from './Setting';
import Adminpage from './Adminpage'

const Tab = createBottomTabNavigator();

const Homepage = ({navigation}) => {

  const { state, signout } = useContext(AuthContext);
  

  return (
    // // <Image style={styles.welcome} source={logo}/>
    // {/* <TouchableOpacity onPress={() => navigation.navigate('Community')}>
    // <Text style={button1}>
    //       Go to Community Page
    //   </Text>
    // </TouchableOpacity>
    // {/* //TO-DO buttons bhtr krny hain */}
    // {/* <Text style={button1}onPress={() => navigation.navigate('DiseaseDetection')}>
    //       Scan For disease detection
    //   </Text>
    //   <Text style={button1}onPress={() => navigation.navigate('SearchCrop')}>
    //       Search By Crop Name and Disease Name
    //   </Text>
    //   <Text style={button1} onPress={signout}>
    //       Sign Out
    //   </Text> */}
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="DiseaseDetection"
          component={DiseaseDetection}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color }}>Disease</Text>
            ),
        
            tabBarIcon: ({ color }) => (
              <Icon name="bug" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="SearchCrop"
          component={SearchCrop}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color }}>Search</Text>
            ),
        
            tabBarIcon: ({ color }) => (
              <Icon name="search" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Community"
          component={Community}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color }}>Community</Text>
            ),
        
            tabBarIcon: ({ color }) => (
              <Icon name="users" size={20} color={color} />
            ),
          }}
        />
          <Tab.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color }}>Setting</Text>
            ),
        
            tabBarIcon: ({ color }) => (
              <Icon name="gear" size={20} color={color} />
            ),
          }}
        />
        {state.udata && state.udata.isAdmin?
        <Tab.Screen
        name="Admin"
        component={Adminpage}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>Admin</Text>
          ),
      
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={20} color={color} />
          ),
        }}
      />:
      null
        }
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Homepage

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#d3d3d3',
  }
})