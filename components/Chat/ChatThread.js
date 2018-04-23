import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, Image,
          TouchableOpacity, AsyncStorage, Animated, Alert, FlatList,
          ActivityIndicator, KeyboardAvoidingView, Easing, Keyboard } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from 'react-native-vector-icons/Ionicons'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

import { PRIMARY_COLOR } from '../../constants/colors'
import { HEADER_TITLE as titleStyle } from '../../constants/styles'
import { ENDPOINT } from '../../constants/api'

type Props = {}
export default class ChatThread extends Component<Props> {
  state = {
    currentUser: {}
  }
  async componentDidMount() {
    const token = await AsyncStorage.getItem('@token')
    try {
      if(token) { 
        this.setState({ currentUser: jwt_decode(token) })
      }
    } catch(e) {
      console.log(e)
    }
  }

  _renderItem = ({ item, index }) => { 
    const id = 10 //current user
    const msgStyle = item.sender_id === id ? styles.sent : styles.received
    const textStyle = item.sender_id === id ? styles.sentMsg : styles.receivedMsg
    return (
      <View style={msgStyle}>
        <Text style={textStyle}>{item.msg}</Text>
      </View>
    )
  }
  
  _keyExtractor = (item, index) => item.msg 

  render() {
    const first_name = 'Serey', last_name = 'Morm', profile_image = 'https://avatars0.githubusercontent.com/u/24735049?s=460&v=4'

    return ( 
      <View style={styles.container}>
        <View style={styles.recipientContainer}>
          <Image style={styles.recipientPic} source={{ uri: profile_image }} />
          <Text style={styles.recipientName}>{first_name} {last_name}</Text>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={messages}
            renderItem={this._renderItem} 
            keyExtractor={this._keyExtractor}
            extraData={this.state} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: '2%',
  },
  recipientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#eee',
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  recipientName: {
    fontWeight: '300',
    fontSize: 18,
    paddingVertical: 5
  },
  recipientPic: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  flatListContainer: {
    height: '75%',
    width: '100%'
  },
  sent: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#00BFFF',
    alignSelf: 'flex-end',
    borderRadius: 14,
    borderBottomRightRadius: 3
  },
  sentMsg: {
    color: 'white',
    fontSize: 18,
    width: '100%',
  },
  received: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
    borderRadius: 14,
    borderBottomRightRadius: 3
  },
  receivedMsg: {
    color: 'black',
    fontSize: 18,
  }
})

const messages = [
  { 
    msg: '1 A test mess sag daf1',
    sender_id: 10
  },
  { 
    msg: '2 A test messsage sdaf dfad 2',
    sender_id: 10
  },
  { 
    msg: '3 A test messsage dfadsfdfdsf3',
    sender_id: 20
  },
  { 
    msg: '4 A test messsage dsfadsf dfadf dafd 4',
    sender_id: 10
  },
  { 
    msg: '1 A test mess sag daf 5',
    sender_id: 20
  },
  { 
    msg: '2 A test messsage sdaf dfad 6',
    sender_id: 10
  },
  { 
    msg: '3 A test messsage dfadsfdfdsf7',
    sender_id: 20
  },
  { 
    msg: '4 A test messsage dsfadsf dfadf dafd 8',
    sender_id: 10
  },

]