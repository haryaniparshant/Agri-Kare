import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, FlatList,ScrollView } from 'react-native';
import jsonServer from '../api/jsonServer';
import { NavigationEvents } from 'react-navigation';

const ApproveQuestions = ({navigation}) => {

  const [questions, setQuestions] = useState(null);
  const getQuestions = async () => {
    try{
      const response = await jsonServer.get('/questionsforapproval');
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

const rejectQuestion = async (_id) => {
  try{
    const response = await jsonServer.put(`/reject-question/${_id}`);
    console.log(response.data);
  }
  catch(e){
    console.log(e);
  }
};

const acceptQuestion = async (_id) => {
  try{
    const response = await jsonServer.put(`/approve-question/${_id}`);
    console.log(response.data);
  }
  catch(e){
    console.log(e);
  }
};

  return (
    <View style={styles.container}>
    <Text style={styles.title}>
        Questions
      </Text>
      <NavigationEvents
        onWillFocus={getQuestions}
        />
        {questions? <FlatList
        data={questions}
        keyExtractor={item => item._id}
        renderItem={({item}) =>{
            return <View style={styles.fixToText}>
                  <ScrollView horizontal>
                    <Text> {item.question_text} </Text>
                  </ScrollView>
                  <Button
                    title="Accept"
                    onPress={() => {
                      acceptQuestion(item._id);
                      Alert.alert('Accepted');
                      getQuestions();
                    }}
                    style={styles.acceptButton}
                    color="green"
                  />
                  <Text>   </Text>
                  <Button
                    title="Reject"
                    onPress={() => {
                      rejectQuestion(item._id);
                      Alert.alert('Rejected');
                      getQuestions();
                    }}
                    color="red"
                    style={styles.rejectButton}
                  />
                </View>
        }}
        />:
        null}
      </View>
  )
}

export default ApproveQuestions

const styles = StyleSheet.create({
    container: {
        
      },
      title: {
        textAlign: 'center',
        marginVertical: 8,
      },
      fixToText: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        alignItems: 'center', // Center text vertically
      },
      buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', // Align buttons to the right
      },
      acceptButton: {
        backgroundColor: 'green',
      },
      rejectButton: {
        backgroundColor: 'green',
      },
})