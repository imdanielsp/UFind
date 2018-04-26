import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, Image,
          TouchableOpacity, AsyncStorage, Animated, Alert, FlatList,
          ActivityIndicator, KeyboardAvoidingView, Easing, Keyboard } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from 'react-native-vector-icons/Ionicons'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { GiftedChat } from 'react-native-gifted-chat'
import lottieLoading from '../../lottie/loading.json'
import LottieView from 'lottie-react-native'

import { PRIMARY_COLOR } from '../../constants/colors'
import { HEADER_TITLE as titleStyle } from '../../constants/styles'
import { ENDPOINT, SOCKET } from '../../constants/api'

type Props = {}
export default class ChatThread extends Component<Props> {
  state = {
    currentUser: {},
    messages: [],
    conversation_id: null,
    otherUser: this.props.navigation.state.params.user_b,
    otherUserObject: {},
    loading: true
  }
  async componentDidMount() {
    const token = await AsyncStorage.getItem('@token')
    try {
      if(token) { 
        this.setState({ currentUser: jwt_decode(token).identity })
        const { id:user_a } = this.state.currentUser
        const { user_b } = this.props.navigation.state.params
        axios.post(`${ENDPOINT}/conversation`, { user_a, user_b })
        .then(res => {
          const { id:conversation_id } = res.data.conversation
          const otherUserObject = (res.data.conversation.user_a.id === this.state.otherUser) ? res.data.conversation.user_a : res.data.conversation.user_b
          const messages = this.parseMessages(res.data.messages)
          this.setState({ conversation_id, messages, otherUserObject, loading: false })
          SOCKET.emit('join', { conversation_id } )
          SOCKET.on('json', message => {
            if(message.sender.id === this.state.otherUser) {
              const newMessage = [{ 
                text: message.msg,
                _id: this.state.messages.length + 2,
                user: {
                  _id: message.sender.id
                }
              }]
              this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, newMessage),
              }))
            }
          })
        })
        .catch(e => console.log(e))
      }
    } catch(e) {
      console.log(e)
    }
  }

  componentWillUnmount() {
    SOCKET.removeAllListeners()
  }

  parseMessages = messages => {
    return messages.map((message, key) => {
      return { 
        text: message.content,
        _id: key,
        user: {
          _id: message.sender.id,
        }
      }
    })
  }

  _keyExtractor = (item, index) => item.text 

  onSend(messages = []) {
    const { conversation_id } = this.state, { id:sender_id } = this.state.currentUser
    const msg = messages.find(f => f).text
    SOCKET.emit('text', { msg, conversation_id, sender_id })
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  _onPress = () => {
    const { currentUser:viewer, otherUserObject:user } = this.state
    Actions.push('viewUser', { user, viewer, backTo: 'pop'  })
  }

  render() {
    const { loading } = this.state
    const { profile_image, first_name, last_name } = this.state.otherUserObject

    if(loading) {
      return (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <LottieView source={lottieLoading}             
              ref={animation => {
                if (animation) animation.play()
              }}/>
          </View>
        </View>
      )
    }
    return ( 
      <View style={styles.container}>
        <View style={styles.recipientContainer}>
          <TouchableOpacity onPress={this._onPress}>
            <Image style={styles.recipientPic} source={{ uri: profile_image }} />
          </TouchableOpacity>
          <Text style={styles.recipientName}>{first_name} {last_name}</Text>
        </View>
          <GiftedChat
            messages={this.state.messages} 
            onSend={messages => this.onSend(messages)}
            user={{_id: this.state.currentUser.id}}
            renderAvatar={null}
            renderTime={() => null}/>
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
  loadingContainer: {
    flex: 1,
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
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
  messageContainer: {
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
