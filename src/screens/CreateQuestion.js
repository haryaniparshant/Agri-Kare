import React from "react";
import { Input, Button, Text } from "react-native-elements";
import { View } from "react-native";
import { useState, useContext } from "react";
import { navigate } from '../navigationRef';
import jsonServer from "../api/jsonServer";
import { Context as AuthContext } from "../context/AuthContext";

export default CreateQuestion = ({navigation}) => {
    const [question,setQuestion] = useState('');
    const {state} = useContext(AuthContext);

    const postQuestion = async () => {
        try{
            const response = await jsonServer.post('/questions', {user_id : state.udata._id, question_text : question})
    }
    catch(err){
        console.log(err);
    }

    }
    return <View>
        <Input 
        label="Question"
        value={question}
        onChangeText={setQuestion}
        autoCapitalize="none"
        autoCorrect={false}
        />
        <Button
        title="Post Question"
        onPress={() =>{
            postQuestion();
          navigation.goBack();
        }}
        />
    </View>
};