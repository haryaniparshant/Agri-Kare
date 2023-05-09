import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState ,useEffect} from 'react'
import { head1,head2,errormessage } from '../common/form'
import {button1} from '../common/button'
import jsonServer from '../api/jsonServer'
import axios from 'axios'
const Verification = ({navigation, route}) => {
    
    const {udata} = route.params;

    const [errormsg, seterrormsg] = useState(null);
    const [usercode, setusercode] = useState("xxxx");
    const [actualcode, setactualcode] = useState(null);
    useEffect(() => {
        setactualcode(udata[0]?.VerificationCode);
    }, [])
    const SendtoBackend = () =>{
        console.log(usercode);
        if (usercode == 'XXXX' || usercode == '') {
            seterrormsg('Please enter the code');
            return;
        }

        else if (usercode == actualcode) {
            // console.log('correct code');
            const fdata = {
                name: udata[0]?.name,
                email: udata[0]?.email,
                password: udata[0]?.password,
                dob: udata[0]?.dob,
                CNIC: udata[0]?.CNIC,
            }
            jsonServer.post('/signup', {
                fdata
            }).then(res =>{
                console.log("message");
                console.log(res);
                if (res['data']['message'] === 'User Registered Successfully') {
                    alert(res['data']['message']);
                    navigation.navigate('Signin')
                }
                else {
                    alert("Something went wrong !! Try Signing Up Again");

                }
            })
        }else if (usercode != actualcode) {
            seterrormsg('Incorrect code');
            return;
        }
    }
  return (
    <View>
      <Text style={styles.h1}>Agri-Kare</Text>
      <Text style={styles.small1}>The Solution to your Agriculure Problems</Text>
        <View style={styles.s2}>
           <Text style={head1}>Verification</Text>
           <Text style={head2}>A code has been sent to you on your email</Text>

           <View style={styles.formgroup}>
                {
                        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
                 }
                <Text style={styles.label}></Text>
                <TextInput style={styles.input}
                    placeholder="Enter 6 digit code"
                    secureTextEntry={true}
                    onChangeText={(text) => setusercode(text)}
                    onPressIn={()=>{seterrormsg(null)}}
                />
                {/* <View>
                    <Text style={styles.link}>Forgot Password?</Text>
                </View> */}
                    <Text style={button1} onPress={()=>{
                        SendtoBackend();
                    }}>Verify</Text>
                    <Text style={styles.link2}>Don't have an account?&nbsp;
                    <Text style={styles.login} onPress={()=> navigation.navigate('Signup')}>Signup</Text>
                    </Text>
           </View>
        </View>
    </View>
    
  )
}

export default Verification

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