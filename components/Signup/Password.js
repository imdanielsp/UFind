import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, Platform,
          TouchableOpacity, AsyncStorage, Alert,
          ActivityIndicator, KeyboardAvoidingView, Keyboard } from 'react-native'
// import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import { PRIMARY_COLOR } from '../../constants/colors'
import { HEADER_TITLE as titleStyle } from '../../constants/styles'

type Props = {}
export default class Password extends Component<Props> {
  state = { 
    password: '',
  }

  componentDidMount() {
    setTimeout(() => this.input.focus(), 550)
  }

  _onSubmit = () => {
    Keyboard.dismiss()
    if(this.state.password.length < 7) {
      Alert.alert('Invalid Password', 'Passwords length must be greater than 6 characters')
    } else {
      Actions.push('signupPasswordConfirm', 
      { 
        first_name: this.props.first_name,
        last_name: this.props.last_name,
        email: this.props.email,
        password: this.state.password
      })
    }
  }

  render() {
    const { first_name, last_name, email } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <KeyboardAvoidingView 
            style={styles.keyboardAvoid} 
            keyboardVerticalOffset={Platform.OS === 'ios' ? ifIphoneX(100, 70) : 0} 
            behavior='padding'>
            <View>
              <Text style={styles.text}>Hello {first_name} —</Text>
              <Text style={styles.text_small}>Let's setup your password</Text>
              <TextInput 
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                onSubmitEditing={this._onSubmit}
                placeholder='Password'
                blurOnSubmit={false}
                ref={input => this.input = input}  
                secureTextEntry={true}          
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => this._onSubmit()} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
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
    marginBottom: 20,
    fontFamily: 'circular-black'
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
    backgroundColor: 'rgba(255,255,255,0.25)',
    padding: 10
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
    fontFamily: 'circular-black',
    color: PRIMARY_COLOR
  }
})