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
import lottieFile from '../lottie/gradient.json'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  goToLogin = () => Actions.push('login')

  goToSignup = () => Actions.push('signup')
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>UFind</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5BCEC1'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '80%',
    alignItems: 'center',
    paddingHorizontal: '8%',
    paddingVertical: '5%',
    marginVertical: '3%',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  buttonText: {
    color: '#5BCEC1',
    fontSize: 20,
    fontWeight: '600'
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: '800',
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
