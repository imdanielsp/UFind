import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, 
          TouchableOpacity, AsyncStorage, Animated, Alert,
          ActivityIndicator, KeyboardAvoidingView, Easing, Keyboard } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { PRIMARY_COLOR } from '../../constants/colors'
import { HEADER_TITLE as titleStyle } from '../../constants/styles'

type Props = {}
export default class Bio extends Component<Props> {
  state = { 
    bio: '',
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
    const { bio } = this.state
    if(bio === ''){
      Alert.alert('Empty Fields', `Please write something in your bio in order to continue.`)
    } else {
      Actions.push('signupProfilePicture', 
      { 
        first_name: this.props.first_name,
        last_name: this.props.last_name,
        email: this.props.email,
        password: this.props.password,
        bio
      })
    }

  }

  render() {
    let containerAnimation = {
      opacity: this.state.fadeAnim,
      transform: [{
        translateY: this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0]
        })
      }, { translateY: this.state.slideOut}]
    }

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.content, containerAnimation]}>
          <KeyboardAwareScrollView>
            <View>
              <Text style={styles.text}>Let's update your bio</Text>
              <Text style={styles.text_small}>Tell us something about yourself — this will be displayed on your profile</Text>
              <TextInput 
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
                value={this.state.bio}
                onChangeText={bio => this.setState({ bio })}
                onSubmitEditing={this._onSubmit}
                placeholder='Bio'
                blurOnSubmit={false}
                ref={input => this.input = input}   
                multiline
              />
              <View>
                <TouchableOpacity onPress={this._onSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
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