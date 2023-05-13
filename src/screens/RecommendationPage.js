import React, { useEffect, useState } from "react";
import { View, Text, Button ,StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { navigate } from "../navigationRef";



export default RecommendationPage = ({navigation}) => {
    const Crop = navigation.getParam('Crop');
    const Disease = navigation.getParam('Disease');

    const [pesticides, setData] = useState(null);

    const crop_disease = async () => {
        const formData = new FormData();
        formData.append("crop", Crop)
        formData.append("disease", Disease)
        await fetch('https://980a-2407-aa80-15-e0a2-d46e-b1db-f88d-d2e.ngrok-free.app/recommend',{
            method: 'POST',
            body: formData,
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setData(data)
          })
          .catch(error => console.error(error));
      };

      useEffect(()=>{
        if(Crop != "Crop_Not_in_Database"){
            crop_disease();
        }
      },[Crop, Disease])

    return <View>
        <Text style={{fontSize: 24, fontWeight: 'bold', margin: 15}}>{Crop}  {Disease}</Text>
        <FlatList
        data={pesticides}
        keyExtractor={item => item.Brand_Name  + item.Brand}
        renderItem={({item}) =>{
            return <TouchableOpacity onPress={() =>{
                navigate('PesticideDetail', {item})
            }}>
                <ListItem style={styles.item}>
                <ListItem.Content>
                    <ListItem.Title style={{fontSize: 20}}>{item.Brand_Name}</ListItem.Title>
                    <ListItem.Subtitle>Brand : {item.Brand}</ListItem.Subtitle>
                    <ListItem.Subtitle>Dosage : {item.Dosage_per_Acre}</ListItem.Subtitle>
                </ListItem.Content>
                </ListItem>
            </TouchableOpacity>
        }}
        />
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
      },

      item: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(247,247,247,1.0)',
      },
})