import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, TouchableOpacity, AsyncStorage, Animated, 
        ActivityIndicator, KeyboardAvoidingView, Easing } from 'react-native'
import axios from 'axios'
// import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'
// import { FontAwesome } from '@expo/vector-icons'
// import Signup from './Signup'
// import Home from './Home'
import Spinner from 'react-native-spinkit'

import { PRIMARY_BLUE } from '../constants/colors'
import { HEADER_TITLE as titleStyle } from '../constants/styles'

import LottieView from 'lottie-react-native';
type Props = {}
export default class Login extends Component<Props> {
  state = { 
    progress: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1.5,
      duration: 3000,
      easing: Easing.linear
    }).start()
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
    return (
      <View style={styles.container}>
          <LottieView
            source={require('../lottie/check.json')}
            progress={this.state.progress}
          />
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
    fontSize: 30
  },
  text: {
    fontSize: 30,
    color: 'white',
    marginBottom: 10
  }
})