import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { FlatList } from 'react-native';

const questions = [
  {
    id: 1,
    text: 'What is your favorite color?'
  },
  {
    id: 2,
    text: 'What is your favorite food?'
  },
  {
    id: 3,
    text: 'What is your favorite animal?'
  }
];

const Community = () => {
  return (
        <View style={styles.container}>
          <FlatList
            data={[
              {key: '1 acre py kitni  dawai?'},
              {key: 'How can we I use this pesticide?'},
              {key: 'from where can i buy best fertilizers'},
              {key: 'Is baar barishon ka kitna chance hai'},
              {key: 'faisel mai keera pargya kia karna chahiye?'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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
       },
})