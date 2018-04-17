import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, 
          TouchableOpacity, AsyncStorage, Animated, 
          ActivityIndicator, KeyboardAvoidingView, Easing } from 'react-native'
// import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { PRIMARY_BLUE } from '../../constants/colors'
import { HEADER_TITLE as titleStyle } from '../../constants/styles'

type Props = {}
export default class BioProfilePic extends Component<Props> {
  state = { 
    bio: '',
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
    })
  }

  _onSubmit = () => {
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
          <KeyboardAwareScrollView>
          <View>
            <Text style={styles.text}>Lets add a Bio and Profile Picture</Text>
            <Text style={styles.text_small}>Say something about yourself</Text>
            <TextInput 
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              value={this.state.bio}
              onChangeText={bio => this.setState({ bio })}
              onSubmitEditing={this._onSubmit}
              placeholder='Bio'
              onFocus={() => this.setState({ errors: '' })}
              blurOnSubmit={false}
              ref={input => this.input = input}           
            />
            {!!this.state.errors && <Text style={styles.invalid}>{this.state.errors}</Text>}
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
    marginBottom: 40,
    marginTop: 40
  },
  text_small: {
    color: 'white',
    fontSize: 20,
    fontWeight: "200",
    textAlign: 'center',
  },
  input: {
    width: '100%',
    fontSize: 25,
    color: 'white',
    margin: 'auto',
    textAlign: 'center',
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