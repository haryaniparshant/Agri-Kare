import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useContext } from 'react'
import { head1,head2,errormessage } from '../common/form'
import {button1} from '../common/button'
import jsonServer from '../api/jsonServer'
import axios from 'axios'
import { Context as AuthContext } from '../context/AuthContext'

const Signin = ({navigation}) => {

    const [fdata, setfdata] = useState({
        email:'',
        password:'',
    })
    const [errormsg, seterrormsg] = useState(null);
    const SendtoBackend = ()=>{
        //console.log(fdata);
        if (fdata.email == '' || fdata.password == '') {
            seterrormsg('All fields are required');
            return;
        }else{
            jsonServer.post('/signin', {
                fdata
            }) .then( res =>{
                     console.log(res);
                    
                    if(res['data']['error'] === "Invalid Credentials" ){
                        seterrormsg("Something went wrong");
                        return;
                    }else{
                        console.log('here')
                        alert("Login Successfully");
                    }   navigation.navigate('Homepage');
                }
            ).catch(err =>{
                console.log(err.data);
            })
        }
    }
  return (
    <View>
      <Text style={styles.h1}>Agri-Kare</Text>
      <Text style={styles.small1}>The Solution to your Agriculure Problems</Text>
        <View style={styles.s2}>
           <Text style={head1}>Login</Text>
           <Text style={head2}>Sign in to continue</Text>

           <View style={styles.formgroup}>
                {
                        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
                 }
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input}
                     onChangeText={(text) => setfdata({...fdata,email:text})}
                     onPressIn={()=>{seterrormsg(null)}}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text) => setfdata({...fdata,password:text})}
                    onPressIn={()=>{seterrormsg(null)}}
                />
                <View>
                    <Text style={styles.link}>Forgot Password?</Text>
                </View>
                    <Text style={button1} onPress={()=>{
                        SendtoBackend();
                    }}>Login</Text>
                    <Text style={styles.link2}>Don't have an account?&nbsp;
                    <Text style={styles.login} onPress={()=> navigation.navigate('Signup')}>Signup</Text>
                    </Text>
           </View>
        </View>
    </View>
    
  )
}

export default Signin

const styles = StyleSheet.create({
    h1:{
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
        height: '50%',
    },
    formgroup:{
        // marginVertical:10,
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