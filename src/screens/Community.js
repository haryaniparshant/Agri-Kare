import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'
import { Button, ListItem } from 'react-native-elements'
import { FlatList } from 'react-native';
import jsonServer from '../api/jsonServer';
import { NavigationEvents } from "react-navigation";
import { navigate } from '../navigationRef';



const Community = () => {

  const [questions, setQuestions] = useState(null);
  const getQuestions = async () => {
    try{
      const response = await jsonServer.get('/questions');
      setQuestions(response.data);
      console.log(response.data);
    }
    catch(e){
      console.log(e);
    }
  };
  useEffect(()=>{
  getQuestions();
},[]);
  

//   useEffect(() => {
//     getQuestions();
// },[]);



  return (
        <View style={styles.container}>
        <NavigationEvents
        onWillFocus={getQuestions}
        />
        {questions? <FlatList
        data={questions}
        keyExtractor={item => item._id}
        renderItem={({item}) =>{
            return <TouchableOpacity style={{flexDirection : 'row'}}  onPress={() =>{
              navigate('ShowAnswers', {question_id : item._id})
            }}>
              <Text style={styles.item}>{item.question_text}</Text>
            </TouchableOpacity>
        }}
        />:
        null}
        <Button
        title="Add a new Question"
        onPress={() =>{
          setQuestions(null)
          navigate('CreateQuestion');
        }}
        />
        </View>
      );
}


export default Community

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