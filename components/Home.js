import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types'
import jwt_decode from 'jwt-decode'
import { 
  AppRegistry, 
  SectionList,
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  Image,
  TextInput,
  NavigatorIOS,
  TouchableOpacity,
  AppState,
  AsyncStorage,
  StatusBar
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Icons from 'react-native-vector-icons/Ionicons'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'

import Discover from './Discover/Discover'
import Chat from './Chat/Chat'
import Profile from './Profile/Profile'

import { PRIMARY_COLOR } from '../constants/colors'

// import Profile from './Profile'


class Home extends Component {
  
    state = {
      listings: [],
      currentTab: 'home'
    }

    async componentWillMount() {
      try {
        const token = await AsyncStorage.getItem('@token')
        if(!token) Actions.push('welcome')
      } catch (e) {
        console.log(e)
      }
    }

    _goToProfile = async () => {
      const token = await AsyncStorage.getItem('@token')
      if(token){
        this.setState({ currentTab: 'profile' })
      } else {
        this.setState({ currentTab: 'home' })
        Actions.push('login')
      }
    }

    _goToHome = () => {
      if(this.state.currentTab !== 'home') {
        this.setState({ currentTab: 'home' })
      }
    }

    _goToMessages = () => {
      if(this.state.currentTab !== 'messages') {
        this.setState({ currentTab: 'messages' })
        
      }
    }

    _getRoute = () => {
      switch(this.state.currentTab) {
        case 'home':
          return <Discover />
          break;
        case 'profile':
          return <Profile onLogout={this._goToHome}/>
          break;
        case 'messages':
          return <Chat />
          break;
      }
    }

    static onEnter = () => {
      console.log('xx')
    }

    onChangeText = todo => this.setState({ todo })
    render() {
      return (
        <View style={styles.homeContainer}>
        <StatusBar backgroundColor='white' barStyle="dark-content" />
          {this._getRoute()}
          <BottomNavigation
            labelColor={PRIMARY_COLOR}
            rippleColor='#777'
            style={styles.bottomNavigation}            
            onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
          >
            <Tab
              barBackgroundColor='white'
              label='Home'
              icon={<Icons size={24} color={PRIMARY_COLOR} 
              name={this.state.currentTab === 'home' ? 'ios-home' : 'ios-home-outline'}/>}
              onPress={this._goToHome}
            />
            <Tab
              barBackgroundColor='white'
              label='Messages'
              icon={<Icons size={24} color={PRIMARY_COLOR} 
                name={this.state.currentTab === 'messages' ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}/>}
              onPress={this._goToMessages}
            />
            <Tab
              barBackgroundColor='white'
              label='Profile'
              icon={<Icons size={24} color={PRIMARY_COLOR} 
                name={this.state.currentTab === 'profile' ? 'ios-contact' : 'ios-contact-outline'}/>}
              onPress={this._goToProfile}
            />
          </BottomNavigation>    
        </View>
      )
    }
  }
  

  const styles = StyleSheet.create({
    homeContainer: {
      ...ifIphoneX({ paddingTop: 50}, {paddingTop: 20} ),
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'space-between'
    },
    bottomNavigation: { 
      height: ifIphoneX(86, 56),
      elevation: 8, 
      // position: 'absolute', 
      // left: 0, 
      // bottom: 0, 
      // right: 0,
      // paddingBottom: 0,
      borderTopWidth: 1,
      borderColor: '#eee'
     },
     emptySpace: {
       height: 30
     }
  })
  
  export default Home