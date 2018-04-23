import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux'
import Icons from 'react-native-vector-icons/Ionicons'

import Welcome from './components/Welcome'
import Login from './components/Login'
import Home from './components/Home'

// Tabs
import Discover from './components/Discover/Discover'
import Chat from './components/Chat/Chat'
import Profile from './components/Profile/Profile'

// Signup Flow
import Email from './components/Signup/Email'
import Password from './components/Signup/Password'
import PasswordConfirm from './components/Signup/PasswordConfirm'
import Bio from './components/Signup/Bio'
import ProfilePicture from './components/Signup/ProfilePicture'
import ViewUser from './components/ViewUser/ViewUser'

// Post Signup — Account Setup
import SelectCategories from './components/Signup/PostSignup/SelectCategories'

import { PRIMARY_COLOR } from './constants/colors'

const TabIcon = ({ focused, title, iconName }) => {
  const color = focused ? PRIMARY_COLOR : '#999'
  return (
  <View style={{width: 100, height: 70, justifyContent: 'center', alignItems: 'center'}}>
    <Icons 
      name={focused ? iconName : `${iconName}-outline` } 
      size={28} 
      color={color} />
    <Text style={{fontSize: 14, fontFamily: 'circular', color }}>
      {title}
    </Text>
  </View>
)}

type Props = {};
export default class App extends Component<Props> {
  state = {
    authenticated: false,
    isLoading: false,
  }

  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('@token')
      if(!token) { 
        Actions.push('welcome')
      }
    } catch (e) {
      console.log(e)
    }
  }
  

  loginBackButton = () => {
    return <Icons 
      name="ios-arrow-round-back" 
      style={styles.backIcon}
      onPress={() => {
        Actions.push({refresh:{}})
      }}
      />
  }

  backButton = () => {
    return (
      <TouchableOpacity 
        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
        onPress={ () => Actions.push('discover') }>
        <Icons 
          name="ios-arrow-back" 
          style={{
            fontSize: 36,
            color: 'black',
            paddingLeft: 15,
            marginBottom: 0
          }}/>
        <Text style={{fontFamily: 'circular', fontSize: 18, paddingLeft: 15, paddingBottom: 3}}>
          Back to Discover
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { authenticated } = this.state
    if(this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color='white' size='large' />
        </View>
      )
    }

    return (
      <Router>
        <Stack key='root'
          transitionConfig={
            () => ({ screenInterpolator: CardStackStyleInterpolator.forHorizontal }) }>
          <Scene key='main' tabBarStyle={styles.tabBar} tabs>
            <Scene
              key='discover'
              title='Discover'
              tabBarLabel=' '
              titleStyle={styles.tabTitle}
              iconName='ios-contacts'
              hideNavBar
              icon={TabIcon}
              component={Discover}
              />
            <Scene
              key='chat'
              title='Chat'
              tabBarLabel=' '
              iconName='ios-chatbubbles'
              hideNavBar
              icon={TabIcon}
              component={Chat} initial/>
            <Scene
              key='profile'
              title='Profile'
              tabBarLabel=' '
              iconName='ios-contact'
              hideNavBar
              icon={TabIcon}
              component={Profile}/>
          </Scene>
          <Scene
            key='welcome'
            title=''
            component={Welcome}
            hideNavBar/>
            <Scene
            key='selectCategories'
            title=''
            component={SelectCategories}
            hideNavBar/>
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
          <Scene
            navigationBarStyle={styles.navWhite}
            key='viewUser' 
            title=''
            component={ViewUser}
            navBarButtonColor='white'
            backButtonTintColor='white'
            backButtonTextStyle={styles.backButtonTextStyle}
            titleStyle={styles.titleStyle}
            renderBackButton={this.backButton} />
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
  navWhite: {
    backgroundColor: 'white',
    shadowColor: 'transparent',
    shadowRadius: 0,
    elevation: 0,
    height: 50,
    borderBottomWidth: 0,
  },
  tabBar: {
    backgroundColor: 'white',
    height: 70,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

// <Scene
//             key='home'
//             title=''
//             component={Home}
//             hideNavBar/>


