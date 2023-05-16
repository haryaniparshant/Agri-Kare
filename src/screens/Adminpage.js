import React, {useContext} from "react";
import { StyleSheet, Text, View  } from 'react-native';
import { Button } from "react-native-elements";
import { navigate } from "../navigationRef";



const Adminpage = ({navigation}) => {

  return (
  <View>
    <Button
    title="Approve Questions"
    onPress={() =>{
        navigate('ApproveQuestions');
    }}
    />
    <Button
    title="Approve Answers"
    onPress={() => {
        navigate('ApproveAnswers');
    }}
    />
    </View>
    );
};


export default Adminpage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});

