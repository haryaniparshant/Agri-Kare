import { delay } from "lodash";
import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView  } from 'react-native';
import { ListItem } from "react-native-elements";



const PesticideDetail = ({navigation}) => {
    const Detail = navigation.getParam('item');
    
    const [brand_detail, setBrand_detail] = useState(null);
    const [packaging_sizes, setPackaging_sizes] = useState(null);
    
  const recieveDetail = async () => {
      const formData = new FormData();
      formData.append("Brand", Detail.Brand);
      formData.append("Brand_Name", Detail.Brand_Name);
      await fetch('https://777e-2406-d00-aaaa-a94d-29f3-efbb-85f0-69b4.ngrok-free.app/detail',{
          method: 'POST',
          body: formData,
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then(response => response.json())
        .then(async data => {
          setBrand_detail(data[0]);
          setPackaging_sizes(data[1]);
        })
        .catch(error => console.error(error));
    };


    useEffect(() => {
      recieveDetail()
  },[Detail]);

  return (
  <View>
    <Text style={{fontSize: 30, fontWeight: 'bold', alignSelf: 'center'}}>Pesticide Detail</Text>
    <Text style={{fontSize: 20, fontWeight: 'bold' , alignSelf: 'center'}}>Packaging Sizes</Text>
    <FlatList
        data={packaging_sizes}
        keyExtractor={item => item.Packing_Size}
        renderItem={({item}) =>{
            return <ListItem style={styles.item}>
                <ListItem.Content>
                    <ListItem.Title style={{fontSize: 20}}>{item.Packing_Size}</ListItem.Title>
                </ListItem.Content>
                </ListItem>
        }}
        />
        {brand_detail?
        <ScrollView>
        <Text style={styles.details}>Generic Name: {Detail.Generic_Name}</Text>
        <Text style={styles.details}>Dosage: {Detail.Dosage_per_Acre}</Text>
        <Text style={styles.details}>Brand: {Detail.Brand}</Text>
        <Text style={styles.details}>Address: {brand_detail.Address}</Text>
        <Text style={styles.details}>Cell: {brand_detail.Cell_No}</Text>
        <Text style={styles.details}>Email: {brand_detail.Email}</Text>
        </ScrollView>:
        null}
    </View>
    );
};


export default PesticideDetail

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
  details: {
    fontSize: 15,
    padding: 10,
    margin: 10,
  }
});

