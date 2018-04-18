import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, 
          TouchableOpacity, AsyncStorage, Animated, Alert,
          ActivityIndicator, KeyboardAvoidingView, Keyboard } from 'react-native'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'

import { PRIMARY_COLOR } from '../../constants/colors'
import { HEADER_TITLE as titleStyle } from '../../constants/styles'
import { ENDPOINT } from '../../constants/api'

import { isEmail } from 'lodash-checkit'

type Props = {}
export default class Email extends Component<Props> {
  state = { 
    email: '',
    isLoading: false,
    fadeAnim: new Animated.Value(0),
    slideOut: new Animated.Value(0),
    slideIn: new Animated.Value(1000),
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 250,
      }
    ).start(done => {
      this.input.focus()
    })
  }

  _onSubmit = () => {
    Keyboard.dismiss()
    const { email } = this.state
    const match = /^([a-zA-Z]+)_([a-zA-Z]+)[0-9]*@student.uml.edu/.exec(email)
    if(match) {
      this.setState({ isLoading: true })
      axios.post(`${ENDPOINT}/user/verify/email`, { email })
      .then(res => {
        if(res.status === 200) {
          Actions.push(
            'signupPassword',
            { 
              first_name: match[1].toLowerCase().charAt(0).toUpperCase() + match[1].slice(1),
              last_name: match[2].toLowerCase().charAt(0).toUpperCase() + match[2].slice(1),
              email: email.toLowerCase() 
            }
          )
        }
        this.setState({ isLoading: false })
      })
      .catch(err => {
        if(err.response.status === 409)
          Alert.alert('Invalid Email', `Email already in use — already a member? Navigate to the login page`)
        this.setState({ isLoading: false })
      })
    } else {
      Alert.alert('Invalid Email', `UFind requires all members to use their UMass Lowell emails.`)
      this.setState({ isLoading: false })
    }
  }

  render() {
    let containerAnimation = {
      opacity: this.state.fadeAnim,
      transform: [{
        translateY: this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0]
        })
      }, { translateY: this.state.slideOut}]
    }
    const { isLoading } = this.state
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.content, containerAnimation]}>
          <KeyboardAvoidingView style={styles.keyboardAvoid}>
            <View>
              <Text style={styles.text}>Hello —</Text>
              <Text style={styles.text_small}>UFind requires you to have a UMass Lowell student email.</Text>
              <TextInput 
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={this._onSubmit}
                placeholder='Email'
                blurOnSubmit={false}
                ref={input => this.input = input}            
              />
            </View>
            <View>
              <TouchableOpacity onPress={isLoading ? null : this._onSubmit} style={styles.button}>
                {isLoading
                  ? <ActivityIndicator color={PRIMARY_COLOR} size='small' />
                  : <Text style={styles.buttonText}>Next</Text> 
                }
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: '3%'
  },
  keyboardAvoid: {
    height: '98%',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 40,
    textAlign: 'left',
    fontWeight: "200",
    marginBottom: 20,
    fontFamily: 'circular'
  },
  text_small: {
    color: 'white',
    fontSize: 20,
    textAlign: 'left',
    fontWeight: "200",
    marginBottom: 20,
    fontFamily: 'circular'
  },
  input: {
    width: '100%',
    fontSize: 24,
    textAlign: 'left',
    color: 'white',
    margin: 'auto',
    backgroundColor: 'rgba(255,255,255,0.25)'
  },
  invalid: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: '2%',
    paddingVertical: '3%'
  },
  button: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: '3%',
    marginVertical: '3%',
    borderRadius: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 1,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'circular',
    color: PRIMARY_COLOR
  }
})