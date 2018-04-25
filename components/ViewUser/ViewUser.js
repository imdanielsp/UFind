import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, Image,
          TouchableOpacity, AsyncStorage, Animated, Alert,
          ActivityIndicator, KeyboardAvoidingView, Easing, Keyboard } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

import { PRIMARY_COLOR } from '../../constants/colors'
import { HEADER_TITLE as titleStyle } from '../../constants/styles'
import { ENDPOINT } from '../../constants/api'

type Props = {}
export default class Bio extends Component<Props> {
  state = {
    connected: false,
    user_a: this.props.navigation.state.params.viewer.id,
    user_b: this.props.navigation.state.params.user.id,
    loading: false
  }

  componentDidMount() {
    const { user_a, user_b } = this.state
    console.log('###')
    console.log(user_a, user_b)
    axios.post(`${ENDPOINT}/connection/verify`, { user_a, user_b })
    .then(res => {
      console.log(res)
      if(res.request.status === 200) this.setState({ connected: true })
    })
    .catch(err => console.log(err))
  }

  _onSubmit = () => {
    const { user_a, user_b, connected } = this.state
    if(connected) return
    this.setState({ loading: true })
    axios.post(`${ENDPOINT}/connection`, { user_a, user_b })
    .then(res => {
      if(res.request.status === 200) this.setState({ connected: true, loading: false })
    })
    .catch(err => console.log(err))
  }

  pushToChat = () => {
    Actions.push('chatThread', { user_b: this.props.navigation.state.params.user.id })
  }

  render() {
    const { first_name, last_name, bio, email, id, profile_image } = this.props.navigation.state.params.user
    const { connected, loading } = this.state
    const renderMsgBtn = this.props.navigation.state.params.backTo === 'connections'
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.userInfo}>
            <Image source={{ uri: profile_image }} style={styles.profilePic}/>
            <Text style={styles.userName}>{first_name} {last_name}</Text>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.smallHeader}>Bio</Text>
            <Text style={styles.smallText}>{bio}</Text>
          </View>
          <View style={styles.interestContainer}>
            <Text style={styles.smallHeader}>{first_name}'s Interests</Text>
            <Text style={styles.smallText}>Music, Film, Architecture, this is just filler stuff - udpate later</Text>
          </View>
        </View>
        {renderMsgBtn
          ? (
              <TouchableOpacity style={styles.messageButton} onPress={this.pushToChat}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.connectButtonText}>
                    Send {first_name} a message
                  </Text>
                  <Icons name='ios-chatbubbles' color='white' size={28} />
                </View>
              </TouchableOpacity>
            )
          : (
            <TouchableOpacity style={connected ? styles.connectedButton : styles.connectButton} onPress={this._onSubmit}>
              {loading 
                ? <ActivityIndicator color='white' size='large' />
                : (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.connectButtonText}>
                      {connected ? `Connected with ${first_name}` : `Connect with ${first_name}` }
                    </Text>
                    <Icons 
                      name={connected ? 'ios-checkmark-circle' : 'md-globe'} 
                      color='white' 
                      size={28} />
                  </View>
                )
              }
            </TouchableOpacity>
          )
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 25,
    justifyContent: 'space-between'
  },
  profilePic: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  userName: {
    fontFamily: 'circular-black',
    fontSize: 38,
    color: 'black',
    paddingLeft: 20,
    color: 'black',
    width: 250
  },
  bioContainer: {
    paddingVertical: 25,
  },
  smallHeader: {
    fontFamily: 'circular',
    fontSize: 24,
    color: 'black'
  },
  smallText: {
    fontWeight: '300',
    paddingTop: 5,
    color: '#888',
    fontSize: 16
  },
  interestContainer: {
    paddingBottom: 20
  },
  connectButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
    height: 80,
    backgroundColor: PRIMARY_COLOR,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
  },
  connectedButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#28c101',
    borderRadius: 5,
    marginBottom: 20,
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
  },
  messageButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#28c101',
    borderRadius: 5,
    marginBottom: 20,
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
  },
  connectButtonText: {
    fontFamily: 'circular-black',
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 15,
    paddingBottom: 4
  }
})