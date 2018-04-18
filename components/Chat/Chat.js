import React, { Component } from 'react'
import { 
  AppRegistry, 
  SectionList,
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  Image,
  TextInput,
  NavigatorIOS,
  TouchableOpacity,
  AppState,
  AsyncStorage
} from 'react-native'

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chat</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
    paddingHorizontal: '2%'
  },
  title: {
    fontFamily: 'circular',
    fontSize: 40,
    color: 'black'
  }
})