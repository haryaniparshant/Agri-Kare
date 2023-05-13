import React from "react";
import { Text, View } from "react-native";
import { Input } from "react-native-elements";
import { navigate } from "../navigationRef";
import { useState } from "react";
import { Button } from "react-native-elements";


export default SearchCrop = () => {

    const [crop, setCrop] = useState('');
    const [disease,setDisease] = useState('');

    return (<View style={{marginTop: 200,}}>
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
            navigate('RecommendationPage', {Crop: crop, Disease: disease});
        }}
        />
    </View>)

}