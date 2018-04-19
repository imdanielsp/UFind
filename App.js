import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux'
import Icons from 'react-native-vector-icons/Ionicons'

import Welcome from './components/Welcome'
import Login from './components/Login'
import Home from './components/Home'

// Signup Flow
import Email from './components/Signup/Email'
import Password from './components/Signup/Password'
import PasswordConfirm from './components/Signup/PasswordConfirm'
import Bio from './components/Signup/Bio'
import ProfilePicture from './components/Signup/ProfilePicture'

// Post Signup — Account Setup
import SelectCategories from './components/Signup/PostSignup/SelectCategories'

import { PRIMARY_COLOR } from './constants/colors'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    authenticated: false,
    isLoading: false,
  }

  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('@token')
      if(token) { 
        this.setState({ authenticated: true, isLoading: false })
      }
    } catch (e) {
      console.log(e)
      this.setState({ isLoading: false })
    }
  }
  

  loginBackButton = () => {
    return <Icons 
      name="ios-arrow-round-back" 
      style={styles.backIcon}
      onPress={() => {
        Actions.pop()
      }}
      />
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color='white' size='large' />
        </View>
      )
    }
    // <Scene
    // key='home'
    // title=''
    // component={SelectCategories}
    // hideNavBar
    // initial/>
    return (
      <Router>
        <Stack key='root'
          transitionConfig={
            () => ({ screenInterpolator: CardStackStyleInterpolator.forHorizontal }) }>

            <Scene
              key='home'
              title=''
              component={Home}
              hideNavBar
              initial={this.state.authenticated}/>
            <Scene
              key='welcome'
              title=''
              component={Welcome}
              hideNavBar
              initial={!this.state.authenticated}/>
            <Scene 
              title=''
              key='login'
              component={Login}
              navigationBarStyle={styles.nav}
              navBarButtonColor='white'
              backButtonTintColor='white'
              backButtonTextStyle={styles.backButtonTextStyle}
              titleStyle={styles.titleStyle}
              renderBackButton={this.loginBackButton}
              backTitle='CANCEL'
              />
            <Scene 
              navigationBarStyle={styles.nav}
              key='signupEmail' 
              title=''
              component={Email}
              navBarButtonColor='white'
              backButtonTintColor='white'
              backButtonTextStyle={styles.backButtonTextStyle}
              titleStyle={styles.titleStyle}
              renderBackButton={this.loginBackButton}
              />
            <Scene
              navigationBarStyle={styles.nav}
              key='signupPassword' 
              title=''
              component={Password}
              navBarButtonColor='white'
              backButtonTintColor='white'
              backButtonTextStyle={styles.backButtonTextStyle}
              titleStyle={styles.titleStyle}
              renderBackButton={this.loginBackButton}
              />
            <Scene 
              navigationBarStyle={styles.nav}
              key='signupPasswordConfirm' 
              title=''
              component={PasswordConfirm}
              navBarButtonColor='white'
              backButtonTintColor='white'
              backButtonTextStyle={styles.backButtonTextStyle}
              titleStyle={styles.titleStyle}
              renderBackButton={this.loginBackButton}
              />
            <Scene
              navigationBarStyle={styles.nav}
              key='signupBio' 
              title=''
              component={Bio}
              navBarButtonColor='white'
              backButtonTintColor='white'
              backButtonTextStyle={styles.backButtonTextStyle}
              titleStyle={styles.titleStyle}
              renderBackButton={this.loginBackButton}
              />
            <Scene
              navigationBarStyle={styles.nav}
              key='signupProfilePicture' 
              title=''
              component={ProfilePicture}
              navBarButtonColor='white'
              backButtonTintColor='white'
              backButtonTextStyle={styles.backButtonTextStyle}
              titleStyle={styles.titleStyle}
              renderBackButton={this.loginBackButton}
              />
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
  loadingContainer:{
    height: '100%',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    fontWeight: '800',
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  backIcon: {
    fontSize: 40,
    color: 'white',
    paddingLeft: 15,
    marginBottom: 0
  },
  nav: {
    backgroundColor: PRIMARY_COLOR,
    shadowColor: 'transparent',
    shadowRadius: 0,
    elevation: 0,
    height: 50,
    borderBottomWidth: 0,
  },
});
