import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, TouchableOpacity, AsyncStorage, Animated, 
        ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import axios from 'axios'
// import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'
// import { FontAwesome } from '@expo/vector-icons'
// import Signup from './Signup'
// import Home from './Home'
import Spinner from 'react-native-spinkit'

import { PRIMARY_BLUE } from '../constants/colors'
import { HEADER_TITLE as titleStyle } from '../constants/styles'
type Props = {}
export default class Lastname extends Component<Props> {
  state = { 
    username: '',
    password: '',
    isLoading: false,
    fadeAnim: new Animated.Value(0),
    text: ''
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 500,
      }
    ).start()
  }

  _goToSignup = () => {
    Actions.replace('signup')
  }

  onSubmit = () => {
    const { username, password } = this.state
    console.log(username, password)
    // this.setState({ isLoading: true })
    // const { username, password } = this.state
    // const data = { username, password }
    // axios.post('http://fierce-sands-22150.herokuapp.com/api/login', data)
    // .then(async res => {
    //   this.setState({ isLoading: false })
    //   try {
    //     await AsyncStorage.setItem('@token', res.data.token)
    //     Actions.home()
    //   } catch (e) {
    //     console.log(e)
    //   }
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }

  render() {
    let containerAnimation = {
      opacity: this.state.fadeAnim,
      transform: [{
        translateY: this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0]
        })
      }]
    }
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.content, containerAnimation]}>
          <KeyboardAvoidingView style={styles.fullscreen}>
            <Text style={styles.text}>Hi {this.props.first}, lets make a username</Text>
            <TextInput 
              style={styles.input} 
              underlineColorAndroid='white'
              onSubmitEditing={() => {
                Actions.replace('success')
              }}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
            />
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: PRIMARY_BLUE,
    paddingTop: '15%',
    paddingHorizontal: '3%'
  },
  fullscreen: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '80%',
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
  },
  text: {
    fontSize: 30,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    margin: 'auto'
  }
})