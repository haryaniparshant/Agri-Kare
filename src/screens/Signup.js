import { StyleSheet, Text, TextInput, View, ListView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { head1,head2,errormessage } from '../common/form'
import {button1} from '../common/button'
import jsonServer from '../api/jsonServer'
import {navigate} from '../navigationRef';
import { Context as AuthContext } from '../context/AuthContext';


const Signup = ({navigation}) => {
    const {state, clearErrorMessage, verification} = useContext(AuthContext);


    const [fdata, setfdata] = useState({
        name :'',
        email : '',
        password: '',
        cpassword : '',
        dob : '',
        CNIC:'',
    })
  return (
    <ScrollView>
      <Text style={styles.h1}>Agri-Kare</Text>
      <Text style={styles.small1}>The Solution to your Agriculure Problems</Text>
        <View style={styles.s2}>
           <Text style={head1}>Create your new account</Text>
           <Text style={head2}>Already registered?&nbsp;
             <Text style={styles.login} onPress={()=> navigation.navigate('Signin')}>Login</Text>
           </Text>

           <View style={styles.formgroup}>
                {
                    state.errorMessage ? <Text style={errormessage}>{state.errorMessage}</Text> : null
                 }
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} placeholder="Enter your Name"
                    onChangeText={(text) => setfdata({...fdata,name:text})}
                    onPressIn={clearErrorMessage}
                />
                 
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder="something@email.com"
                    onChangeText={(text) => setfdata({...fdata,email:text})}
                    onPressIn={clearErrorMessage}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder="Enter your password"
                    secureTextEntry={true}
                    onChangeText={(text) => setfdata({...fdata,password:text})}
                    onPressIn={clearErrorMessage}
                />

                <Text style={styles.label}>Re-Enter Password</Text>
                <TextInput style={styles.input} placeholder="Confirm your password"
                    secureTextEntry={true}
                    onChangeText={(text) => setfdata({...fdata,cpassword:text})}
                    onPressIn={clearErrorMessage}
                />

                <Text style={styles.label}>Date of Birth</Text>
                <TextInput style={styles.input} placeholder="01-01-2001"
                    onChangeText={(text) => setfdata({...fdata,dob:text})}
                    onPressIn={clearErrorMessage}
                />

                <Text style={styles.label}>CNIC</Text>
                <TextInput style={styles.input} placeholder="12345-1234567-8"
                    onChangeText={(text) => setfdata({...fdata,CNIC:text})}
                    onPressIn={clearErrorMessage}
                />

              
                {/* <View>
                    <Text style={styles.link}>Forgot Password?</Text>
                </View> */}
                <TouchableOpacity onPress={()=>{
                        verification({fdata});
                    }}>
                       <Text style={button1}
                        
                        > Signup</Text>
                </TouchableOpacity>
                 
                    {/* <Text style={styles.link2}>Don't have an account? Signup</Text> */}
           </View>
        </View>
    </ScrollView>
    
  )
}

export default Signup

const styles = StyleSheet.create({
    h1:{
        marginTop:10,
        fontSize:25,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        marginLeft: 130,
      
    },
    small1:{
        fontSize:17,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        marginLeft:30,
    },
    s2:{
        //display: 'flex',
        backgroundColor:'#fff',
        width:'100%',
        height: '90%',
    },
    formgroup:{
        marginVertical:10,
    },
    label:{
        fontSize:17,
        color: '#000',
        marginLeft:10,
    },
    input:{
        backgroundColor:'#d3d3d3',
        borderRadius: 10,
        //width:'100%',
        padding : 10,
        borderRadius:20,
        marginVertical:10
    },
    link:{
        fontSize:15,
        color:'black',
        marginLeft:220,
        marginBottom:10,
    },
    link2:{
        fontSize:15,
        marginTop:10,
        marginLeft:10
    },
    login:{
        color:'blue',
        
    }
})