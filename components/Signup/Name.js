import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button,
          TouchableOpacity, AsyncStorage, Animated, ActivityIndicator, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native'
// import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'

import { PRIMARY_BLUE } from '../../constants/colors'
import { HEADER_TITLE as titleStyle } from '../../constants/styles'

type Props = {}
export default class Name extends Component<Props> {
  state = { 
    fullname: '',
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
    if(this.state.fullname.split(' ').length !== 2) {
      this.setState({ errors: 'Invalid Name'})
    }
    else {
      Keyboard.dismiss()
      Actions.push('signupEmail', { fullname: this.state.fullname })
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
              <Text style={styles.text}>Hi There</Text>
              <Text style={styles.text_small}>First, lets get your name</Text>
              <TextInput 
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
                value={this.state.fullame}
                onChangeText={fullname => this.setState({ fullname })}
                onSubmitEditing={this._onSubmit}
                placeholder='First Last'
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
    marginBottom: 40
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