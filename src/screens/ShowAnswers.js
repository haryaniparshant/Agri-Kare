import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'
import { Button, ListItem } from 'react-native-elements'
import { FlatList } from 'react-native';
import jsonServer from '../api/jsonServer';
import { NavigationEvents } from "react-navigation";
import { navigate } from '../navigationRef';



const ShowAnswers = ({navigation}) => {

    const question_id = navigation.getParam('question_id');
    console.log(question_id);

  const [answers, setAnswers] = useState(null);

  const getAnswers = async () => {
    try{
      const response = await jsonServer.get('/answers');
      setAnswers(response.data);
      console.log(response.data);
    }
    catch(e){
      console.log(e);
    }
  };

//   useEffect(() => {
//     getQuestions();
// },[]);



  return (
        <View style={styles.container}>
        <NavigationEvents
        onWillFocus={getAnswers}
        />
        {answers? <FlatList
        data={answers}
        keyExtractor={item => item._id}
        renderItem={({item}) =>{
            return <TouchableOpacity style={{flexDirection : 'row'}}  onPress={() =>{
              navigate('CreateAnswer', {question_id : item._id})
            }}>
              <Text style={styles.item}>{item.answer_text}</Text>
            </TouchableOpacity>
        }}
        />:
        null}
        <Button
        title="Add a new Answer"
        onPress={() =>{
          setAnswers(null)
          navigation.navigate('CreateAnswer', {question_id : question_id});
        }}
        />
        </View>
      );
}


export default ShowAnswers

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: '#d3d3d3',
       },
       item: {
         padding: 10,
         fontSize: 18,
         height: 44,
         marginLeft: 15,
       },
})