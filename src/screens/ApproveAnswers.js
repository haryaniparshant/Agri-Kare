import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, FlatList,ScrollView } from 'react-native';
import jsonServer from '../api/jsonServer';
import { NavigationEvents } from 'react-navigation';

const ApproveAnswers = ({navigation}) => {

    const [answer, setAnswer] = useState(null);
    const getAnswers = async () => {
      try{
        const response = await jsonServer.get('/answersforapproval');
        setAnswer(response.data);
        console.log(response.data);
      }
      catch(e){
        console.log(e);
      }
    };
    useEffect(()=>{
    getAnswers();
  },[]);
  
  const rejectAnswer = async (question_id,_id) => {
    try{
      const response = await jsonServer.put(`/reject-answer/${question_id}/${_id}`);
      console.log(response.data);
    }
    catch(e){
      console.log(e);
    }
  };
  
  const acceptAnswer = async (question_id,_id) => {
    try{
      const response = await jsonServer.put(`/approve-answer/${question_id}/${_id}`);
      console.log(response.data);
    }
    catch(e){
      console.log(e);
    }
  };


  return (<View style={styles.container}>
      <NavigationEvents
        onWillFocus={getAnswers}
        />
        {answer? <FlatList
        data={answer}
        keyExtractor={item => item._id}
        renderItem={({item}) =>{
            return <View style={styles.fixToText}>
                  <ScrollView horizontal>
                    <Text> {item.answer_text} </Text>
                  </ScrollView>
                  <Button
                    title="Accept"
                    onPress={() => {
                      acceptAnswer(item.question_id,item._id);
                      Alert.alert('Accepted');
                      getAnswers;
                    }}
                    color="green"
                  />
                  <Text>   </Text>
                  <Button
                    title="Reject"
                    onPress={() => {
                      rejectAnswer(item.question_id,item._id);
                      Alert.alert('Rejected');
                      getAnswers();
                    }}
                    color="red"
                  />
                </View>
        }}
        />:
        null}
      </View>
  )
}

export default ApproveAnswers

const styles = StyleSheet.create({
    container: {
        
      },
      title: {
        textAlign: 'center',
        marginVertical: 8,
      },
      fixToText: {
        padding:5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical:10,
      },
      button:{
        margin:40,
        backgroundColor: 'green',
      }
})