import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated, 
  Easing
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import LottieView from 'lottie-react-native'
import lottieFile from '../lottie/map.json'

import { PRIMARY_BLUE, DARKER_ORANGE } from '../constants/colors'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    progress: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start()
  }

  goToLogin = () => Actions.push('login')

  goToSignup = () => Actions.push('signupFirstname')
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.title}>UFind —</Text>
          <Text style={styles.titleIntro}>A university community driven application to search for activities or friends.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.goToLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToSignup} style={styles.button}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: '8%',
    paddingHorizontal: '3%',
    backgroundColor: PRIMARY_BLUE,
  },
  title: {
    fontSize: 50,
    textAlign: 'left',
    color: 'white',
    fontFamily: 'circular'
  },
  titleIntro: {
    fontSize: 20,
    fontFamily: 'circular',
    color: 'white',
    paddingTop: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: '2%',
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
    color: PRIMARY_BLUE,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'circular'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
