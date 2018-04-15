import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, TouchableOpacity, AsyncStorage, Animated, ActivityIndicator } from 'react-native'
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
export default class Login extends Component<Props> {
  state = { 
    username: '',
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
            <Text style={styles.title}>Login</Text>
            <View style={styles.allInputContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Your E-mail</Text>
                <TextInput
                  placeholder='University E-Mail'
                  onChangeText={(username) => this.setState({username})}
                  autoCapitalize='none'
                  style={styles.textInput}/>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholder='Your Password'
                  onChangeText={(password) => this.setState({password})}
                  style={styles.textInput}
                  autoCapitalize='none'
                  secureTextEntry/>
              </View>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onSubmit}>
              <Text style={styles.buttonText}>Login</Text>
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
    backgroundColor: PRIMARY_BLUE,
    paddingTop: '15%',
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
    marginTop: '8%',
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
    color: PRIMARY_BLUE,
  },
})