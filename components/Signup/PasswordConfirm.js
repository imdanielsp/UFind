import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, 
          TouchableOpacity, AsyncStorage, Animated, 
          ActivityIndicator, KeyboardAvoidingView } from 'react-native'
// import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'

import { PRIMARY_BLUE } from '../../constants/colors'
import { HEADER_TITLE as titleStyle } from '../../constants/styles'

type Props = {}
export default class PasswordConfirm extends Component<Props> {
  state = { 
    password: '',
    errors: '',
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

  _onSubmit = () => {
    if(this.state.password !== this.props.password) {
      this.setState({ errors: 'Passwords must match'})
    }
    else {
      Actions.push('signupBioProfilePic', {
        fullname: this.props.fullname,
        email: this.props.email,
        password: this.props.password
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
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.content, containerAnimation]}>
          <KeyboardAvoidingView style={styles.keyboardAvoid}>
            <Text style={styles.text}>
              Please confirm your password.
            </Text>
            <TextInput 
              style={styles.input}
              underlineColorAndroid='white'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              onSubmitEditing={this._onSubmit}
              placeholder='Password'
              onFocus={() => this.setState({ errors: '' })}
              secureTextEntry
              autoFocus
            />
            {!!this.state.errors && <Text style={styles.invalid}>{this.state.errors}</Text>}
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
    paddingHorizontal: '3%',
  },
  keyboardAvoid: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  },
  input: {
    width: '80%',
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  },
  invalid: {
    color: 'red',
    fontSize: 15
  }
})