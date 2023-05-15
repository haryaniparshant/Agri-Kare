import React from "react";
import { Input, Button, Text } from "react-native-elements";
import { View } from "react-native";
import { useState, useContext } from "react";
import { navigate } from '../navigationRef';
import jsonServer from "../api/jsonServer";
import { Context as AuthContext } from "../context/AuthContext";

export default CreateAnswer = ({navigation}) => {

    const question_id = navigation.getParam('question_id');
    console.log(question_id);
    const [answer,setAnswer] = useState('');
    const {state} = useContext(AuthContext);

    const postAnswer = async () => {
        try{
            const response = await jsonServer.post('/answers', {user_id : state.udata._id, answer_text : answer, question_id: question_id})
    }
    catch(err){
        console.log(err);
    }

    }
    return <View>
        <Input 
        label="Answer"
        value={answer}
        onChangeText={setAnswer}
        autoCapitalize="none"
        autoCorrect={false}
        />
        <Button
        title="Post Answer"
        onPress={() =>{
            postAnswer();
          navigation.goBack();
        }}
        />
    </View>
};