import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, 
          TouchableOpacity, AsyncStorage, Animated, 
          ActivityIndicator, KeyboardAvoidingView, Easing } from 'react-native'
// import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'

import { PRIMARY_BLUE } from '../../constants/colors'
import { HEADER_TITLE as titleStyle } from '../../constants/styles'

type Props = {}
export default class BioProfilePic extends Component<Props> {
  state = { 
    password: '',
    errors: '',
    slide: new Animated.Value(200),
    slideOut: new Animated.Value(0),
    slide2: new Animated.Value(200),
    slideOut2: new Animated.Value(0),
    showMessage: true
  }

  componentDidMount() {
    const slideInOut = [Animated.timing(
      this.state.slide,
      {
        toValue: 0,
        duration: 1000,
        easing: Easing.in(Easing.ease)
      }
    ), Animated.timing(
      this.state.slideOut,
      {
        delay: 2000,
        toValue: 200,
        duration: 1000,
        easing: Easing.in(Easing.ease)
      }
    )]

    const slideInOut2 = [Animated.timing(
      this.state.slide2,
      {
        toValue: 0,
        duration: 1000,
        easing: Easing.in(Easing.ease)
      }
    ), Animated.timing(
      this.state.slideOut2,
      {
        delay: 2000,
        toValue: 200,
        duration: 1000,
        easing: Easing.in(Easing.ease)
      }
    )]

    if(this.state.showMessage) {
      Animated.sequence(slideInOut).start(done => {
        this.setState({ showMessage: false })
      })
    }
  }

  componentDidUpdate() {
    const slideInOut2 = [Animated.timing(
      this.state.slide2,
      {
        toValue: 0,
        duration: 1000,
        easing: Easing.in(Easing.ease)
      }
    ), Animated.timing(
      this.state.slideOut2,
      {
        delay: 2000,
        toValue: 200,
        duration: 1000,
        easing: Easing.in(Easing.ease)
      }
    )]
    Animated.sequence(slideInOut2).start()
  }

  render() {
    if(this.state.showMessage) {
      return (
        <View style={styles.container}>
          <Animated.View style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center', 
              transform: [{translateX: this.state.slide}, {translateX: this.state.slideOut}]}}>
            <Text style={styles.text}>OK</Text>
          </Animated.View>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Animated.View style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center', 
              transform: [{translateX: this.state.slide2}, {translateX: this.state.slideOut2}]
          }}>
            <Text style={styles.text}>OI</Text>
          </Animated.View>
        </View>
      )
    }
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
  fullScreen: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
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
})