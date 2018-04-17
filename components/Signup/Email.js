import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, 
          TouchableOpacity, AsyncStorage, Animated, 
          ActivityIndicator, KeyboardAvoidingView, Keyboard } from 'react-native'
// import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'

import { PRIMARY_BLUE } from '../../constants/colors'
import { HEADER_TITLE as titleStyle } from '../../constants/styles'

import { isEmail } from 'lodash-checkit'

type Props = {}
export default class Email extends Component<Props> {
  state = { 
    email: '',
    errors: '',
    fadeAnim: new Animated.Value(0),
    slideOut: new Animated.Value(0),
    slideIn: new Animated.Value(1000),
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start(done => {
      this.input.focus()
    })
  }

  _onSubmit = () => {
    if(!isEmail(this.state.email)) {
      this.setState({ errors: 'Invalid Email'})
    }
    else {
      Keyboard.dismiss()
      Actions.push('signupPassword', 
      { 
        fullname: this.props.fullname,
        email: this.state.email
      })
    }
  }

  render() {
    let containerAnimation = {
      opacity: this.state.fadeAnim,
      transform: [{
        translateY: this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1000, 0]
        })
      }, { translateY: this.state.slideOut}]
    }
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.content, containerAnimation]}>
          <KeyboardAvoidingView style={styles.keyboardAvoid}>
            <View>
              <Text style={styles.text}>Nice to meet you, {this.props.fullname.split(' ')[0]}</Text>
              <Text style={styles.text_small}>Now we need your email</Text>
              <TextInput 
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={this._onSubmit}
                placeholder='Email'
                onFocus={() => this.setState({ errors: '' })}
                blurOnSubmit={false}
                ref={input => this.input = input}            
              />
              {!!this.state.errors && <Text style={styles.invalid}>{this.state.errors}</Text>}
            </View>
            <View>
              <TouchableOpacity onPress={() => this._onSubmit()} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
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
    backgroundColor: PRIMARY_BLUE,
    paddingHorizontal: '3%'
  },
  keyboardAvoid: {
    height: '98%',
    justifyContent: 'space-between'
  },
  text: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: "200",
    marginBottom: 20
  },
  text_small: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: "200",
    marginBottom: 20
  },
  input: {
    width: '100%',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    margin: 'auto'
  },
  invalid: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center'
  },
  button: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: '3%',
    marginVertical: '3%',
    borderRadius: 4,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 1,
  },
  buttonText: {
    fontSize: 20,
    color: 'black'
  }
})