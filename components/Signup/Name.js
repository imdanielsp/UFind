import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, 
          TouchableOpacity, AsyncStorage, Animated, 
          ActivityIndicator, KeyboardAvoidingView } from 'react-native'
// import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'

import { PRIMARY_BLUE } from '../../constants/colors'
import { HEADER_TITLE as titleStyle } from '../../constants/styles'

type Props = {}
export default class Name extends Component<Props> {
  state = { 
    fullname: '',
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
    if(this.state.fullname.split(' ').length !== 2) {
      this.setState({ errors: 'Invalid Name'})
    }
    else {
      Actions.push('signupEmail', { fullname: this.state.fullname })
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
            <Text style={styles.text}>Hi, lets start with your name.</Text>
            <TextInput 
              style={styles.input}
              underlineColorAndroid='white'
              value={this.state.fullame}
              onChangeText={fullname => this.setState({ fullname })}
              onSubmitEditing={this._onSubmit}
              placeholder='First Last'
              onFocus={() => this.setState({ errors: '' })}
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