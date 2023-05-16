import React, {useContext} from "react";
import { StyleSheet, Text, View  } from 'react-native';
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";



const SettingScreen = ({navigation}) => {
    const {signout} = useContext(AuthContext);

  return (
  <View>
    <Button 
    title="Sign Out"
    onPress={signout}
    />
    </View>
    );
};


export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});

