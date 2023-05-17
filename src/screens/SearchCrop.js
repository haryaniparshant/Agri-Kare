import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { navigate } from "../navigationRef";
import { useState } from "react";
import { Button } from "react-native-elements";


export default SearchCrop = () => {

    const [crop, setCrop] = useState('');
    const [disease,setDisease] = useState('');

    return (<View>
        <Input 
        label="Crop"
        value={crop}
        onChangeText={setCrop}
        autoCapitalize="none"
        autoCorrect={false}
        />
        <Input 
        label="Disease"
        value={disease}
        onChangeText={setDisease}
        autoCapitalize="none"
        autoCorrect={false}
        />
        <Button 
        title="Find Pesticide"
        onPress={()=>{
            setCrop('');
            setDisease('')
            navigate('RecommendationPage', {Crop: crop, Disease: disease});
        }}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        />
    </View>)

}
const styles = StyleSheet.create({
    button: {
      backgroundColor: 'green',
      borderRadius: 5,
      padding: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
  });