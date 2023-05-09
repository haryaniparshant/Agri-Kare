import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

const Pending = ({navigation}) => {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>
        Aik acre py kitny dawa dalegi?
      </Text>
    <View style={styles.fixToText}>
        <Button
          title="Accept"
          onPress={() => Alert.alert('Accepted')}
          style={styles.button}
        />
        <Text>   </Text>
        <Button
          title="Reject"
          onPress={() => Alert.alert('Rejected')}
          style={styles.button}
        />
      </View>
      </View>
  )
}

export default Pending

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
        marginVertical:10
      },
      button:{
        margin:40,
      }
})