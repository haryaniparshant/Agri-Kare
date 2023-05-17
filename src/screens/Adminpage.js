import React, {useContext} from "react";
import { StyleSheet, Text, View  } from 'react-native';
import { Button } from "react-native-elements";
import { navigate } from "../navigationRef";
import { Context as AuthContext } from "../context/AuthContext";



const Adminpage = ({navigation}) => {

  const {state} = useContext(AuthContext);
  console.log(state.udata.name);

  return (
  <View style={styles.container}>
    <View style={styles.adminInfoContainer}>
        <Text style={styles.adminName}>{state.udata.name}</Text>
        {/* Add additional admin information here */}
      </View>
    <Button
    title="Approve Questions"
    onPress={() =>{
        navigate('ApproveQuestions');
    }}
    buttonStyle={styles.button}
    titleStyle={styles.buttonText}
    />
    <Button
    title="Approve Answers"
    onPress={() => {
        navigate('ApproveAnswers');
    }}
    buttonStyle={styles.button}
    titleStyle={styles.buttonText}
    />
    </View>
    );
};


export default Adminpage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  adminInfoContainer: {
    marginBottom: 20,
  },
  adminName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
  },
});

