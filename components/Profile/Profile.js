import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, Image, ActivityIndicator,
  TouchableOpacity, Animated } from 'react-native'
import { Actions } from 'react-native-router-flux'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import Icons from 'react-native-vector-icons/Ionicons'

import { PRIMARY_COLOR } from '../../constants/colors'
import { ENDPOINT } from '../../constants/api'

export default class Profile extends Component {
  state = {
    user: { // default values — just in case
      first_name: '', 
      last_name: '', 
      isLoading: true,
      profile_image: 'http://via.placeholder.com/160x160', 
      bio: '' 
    },
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
  
  async componentWillMount() {
    try {
      const token = await AsyncStorage.getItem('@token')
      if(token) {
        const { id } = jwt_decode(token).identity
        axios.get(`${ENDPOINT}/user/${id}`)
        .then(res => {
          this.setState({ 
            isLoading: false,
            user: res.data,
          })
        })
        
      }
    }
    catch(e) {
      console.log(e)
    }
  }

  _onLogout = async () => {
    try {
      await AsyncStorage.removeItem('@token')
      Actions.push('welcome')
    }
    catch(e) {
      console.log(e)
    }
  }

  handleRoute = route => {
    switch(route) {
      case 'listings':
        return <Listings />
      case 'favorites':
        return <Listings data={this.queryFavorites()} />
      case 'completed':
        return <Listings data={this.queryCompleted()} />
      case 'settings':
        return <Settings />
      case 'createListing':
        Actions.push('createListing')
    }
  }
  render() {
    let containerAnimation = {
      opacity: this.state.fadeAnim,
      transform: [{
        translateY: this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0]
        })
      }]
    }
    const { first_name, last_name, profile_image, bio } = this.state.user
    if(this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={PRIMARY_COLOR} size='large' />
        </View>
      )
    }
    return (
      <Animated.View style={[styles.container, containerAnimation]}>
        <View>
          <View>
            <View style={styles.userInfo}>
              <Image source={{ uri: profile_image }} style={styles.profilePic}/>
              <Text style={styles.userName}>{first_name} {last_name}</Text>
            </View>
            <View style={styles.bioContainer}>
              <Text style={styles.smallHeader}>Bio</Text>
              <Text style={styles.smallText}>{bio} {bio}</Text>
            </View>
          </View>
          <View style={styles.profileOptionContainer}>
            <TouchableOpacity style={styles.profileOption} onPress={() => this.handleRoute('connections')}>
              <Text style={styles.profileOptionText}>Your Connections</Text>
              <Icons name='ios-checkmark-circle-outline' style={styles.fontAwesome}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileOption} onPress={() => this.handleRoute('settings')}>
              <Text style={styles.profileOptionText}>Settings</Text>
              <Icons name='ios-hammer-outline' style={styles.fontAwesome}/>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={this._onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
          <Icons name='ios-log-out' color='white' size={28} />
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between',
    height: '88%',
    paddingHorizontal: 20,    
  },
  loadingContainer : {
    height: '90%',
    justifyContent: 'center',
  },
  profilePic: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  userName: {
    fontFamily: 'circular',
    fontSize: 38,
    color: 'black',
    paddingLeft: 20,
    color: 'black',
    width: 250
  },
  bioContainer: {
    paddingVertical: 25,
  },
  smallHeader: {
    fontFamily: 'circular',
    fontSize: 24,
    color: 'black'
  },
  smallText: {
    fontFamily: 'circular',
    color: '#888',
    fontSize: 16
  },
  logoutButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 16,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  logoutText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 22,
    fontFamily: 'circular',
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingBottom: 3
  },
  profileOptionContainer: {
    borderTopWidth: 1,
    borderColor: '#eee',
    marginTop: 20
  },
  profileOption: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  profileOptionText: {
    fontSize: 20,
    fontWeight: '300',
    color: '#888',
    fontFamily: 'circular'
  },
  fontAwesome: {
    fontSize: 26,
    paddingRight: 10,
    color: PRIMARY_COLOR
  }
})