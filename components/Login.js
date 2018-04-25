import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, TouchableOpacity,
  AsyncStorage, Animated, ActivityIndicator, Alert, StatusBar } from 'react-native'
import axios from 'axios'
// import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'
// import { FontAwesome } from '@expo/vector-icons'
// import Signup from './Signup'
// import Home from './Home'
import Spinner from 'react-native-spinkit'

import { PRIMARY_COLOR } from '../constants/colors'
import { HEADER_TITLE as titleStyle } from '../constants/styles'
import { ENDPOINT } from '../constants/api'

type Props = {}
export default class Login extends Component<Props> {
  state = { 
    email: '',
    password: '',
    isLoading: false,
    fadeAnim: new Animated.Value(0)
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
    Actions.replace('signupEmail')
  }

  onSubmit = () => {
    const { email, password } = this.state
    if(email === '' || password === '') {
      Alert.alert(
        'Empty Fields', 
        `Please enter both your university email and password for your account.`
      )
      return
    }
    const match = /^([a-zA-Z]+)_([a-zA-Z]+)[0-9]*@student.uml.edu/.exec(email)
    if(!match) {
      Alert.alert(
        'Invalid Email', 
        `Make sure you've entered your university email correctly.`
      )
    } else {
      this.setState({ isLoading: true })
      const payload = { email, password }
      axios.post(`${ENDPOINT}/login`, payload)
      .then(async res => {
        this.setState({ isLoading: false })
        try {
          await AsyncStorage.setItem('@token', res.data.access_token)
          Actions.push('discover')
        } catch (e) {
          console.log(e)
        }
      })
      .catch((err) => {
        if(err.request.status === 403) {
          Alert.alert(
            'Invalid Password', 
            `Make sure you've entered your password correctly.`
          )
        } else if(err.request.status === 404) {
          Alert.alert(
            'Email not found', 
            `Make sure you've typed your email correctly — or create an account if you haven't already`
          )
        }
        this.setState({ isLoading: false })
      })
    }
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
    const { isLoading } = this.state
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />
          <Animated.View style={[styles.content, containerAnimation]}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.allInputContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Your E-mail</Text>
                <TextInput
                  placeholder='University E-Mail'
                  underlineColorAndroid='rgba(0,0,0,0)'
                  onChangeText={(email) => this.setState({email})}
                  autoCapitalize='none'
                  style={styles.textInput}
                  spellCheck={false}
                  autoCorrect={false}/>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholder='Your Password'
                  underlineColorAndroid='rgba(0,0,0,0)'
                  onChangeText={(password) => this.setState({password})}
                  style={styles.textInput}
                  autoCapitalize='none'
                  secureTextEntry/>
              </View>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={isLoading ? null : this.onSubmit}>
              {isLoading 
                ? <ActivityIndicator size='small' color={PRIMARY_COLOR} /> 
                : <Text style={styles.buttonText}>Login</Text>
              }
            </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={this._goToSignup}>
                <Text style={styles.buttonText}>Not a member?</Text>
              </TouchableOpacity>
            </View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: '3%',
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    textAlign: 'left',
    color: 'white',
    fontFamily: 'circular'
  },
  content: {
    justifyContent: 'space-between',
  },
  allInputContainer: {
    marginTop: '0%',
  },
  inputContainer: {
    flexDirection: 'column',
    borderColor: '#eee',
  },
  buttonContainer: {
    // flexDirection: 'column',
  },
  textInput: {
    padding: 15,
    width: '100%',
    color: 'black',
    fontSize: 18,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    fontFamily: 'circular',
    borderWidth: 0,
  },
  label: {
    color: 'white',
    fontFamily: 'circular',
    fontSize: 18,
    textAlign: 'left',
    paddingVertical: '5%'
  },
  buttonContainer: {
    marginTop: '25%'
  },
  button: {
    paddingVertical: 20,
    marginBottom: '5%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'circular',
    color: PRIMARY_COLOR,
  },
})