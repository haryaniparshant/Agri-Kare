import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { head1,head2 } from '../common/form'
import {button1} from '../common/button'
const Admin = ({navigation}) => {
    const [fdata,setdata] = useState({
            email:'',
            password:''
    });
    const SendtoBackend = () =>{
        console.log('here');
        if(fdata.email=='agrikare@gmail.com' && fdata.password=='1234'){
            navigation.navigate('Pending');
            return;
        }else{
            alert('error');
        }
    }
  return (
    <View>
      <Text style={styles.h1}>Agri-Kare</Text>
      <Text style={styles.small1}>The Solution to your Agriculure Problems</Text>
        <View style={styles.s2}>
           <View style={styles.formgroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input}
                     onChangeText={(text) => setdata({...fdata,email:text})}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input}
                      secureTextEntry={true}
                      onChangeText={(text) => setdata({...fdata,password:text})}
                />
                    <Text style={button1}
                        onPress={()=>{
                            SendtoBackend();
                        }}
                    >Login</Text>
           </View>
        </View>
    </View>
    
  )
}

export default Admin

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
        marginTop:20,
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
    }
})