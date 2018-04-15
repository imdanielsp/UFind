import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux'
import Icons from 'react-native-vector-icons/Ionicons'

import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'
import Lastname from './components/Lastname'
import Success from './components/Success'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  loginBackButton = () => {
    return <Icons 
      name="ios-arrow-round-back" 
      style={styles.backIcon}
      onPress={() => Actions.pop()}/>
  }
  render() {
    return (
      <Router>
        <Stack key='root'>
          <Scene
            key='home'
            title='UFind'
            component={Welcome}
            hideNavBar
            initial/>
            <Scene 
              title=''
              key='login'
              component={Login}
              navBarButtonColor='white'
              backButtonTintColor='white'
              backButtonTextStyle={styles.backButtonTextStyle}
              titleStyle={styles.titleStyle}
              renderBackButton={this.loginBackButton}
              backTitle='CANCEL'
              navTransparent/>
              <Scene 
              title=''
              key='lastname'
              component={Lastname}
              navBarButtonColor='white'
              backButtonTintColor='white'
              backButtonTextStyle={styles.backButtonTextStyle}
              titleStyle={styles.titleStyle}
              renderBackButton={this.loginBackButton}
              backTitle='CANCEL'
              navTransparent/>
              <Scene 
              title=''
              key='success'
              component={Success}
              hideNavBar/>
            <Scene 
              key='signup' 
              title=''
              component={Signup}
              navBarButtonColor='white'
              backButtonTintColor='white'
              backButtonTextStyle={styles.backButtonTextStyle}
              titleStyle={styles.titleStyle}
              renderBackButton={this.loginBackButton}
              navTransparent/>
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5185EC',
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    fontWeight: '800',
    color: 'black'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  backIcon: {
    fontSize: 30,
    color: 'white',
    paddingLeft: 15,
    marginBottom: 0
  },
});
