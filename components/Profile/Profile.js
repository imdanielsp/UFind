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
      this.props.onLogout()
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
          <View style={styles.profileContainer}>
            <View style={styles.profileBubble}>
              <Image source={{ uri: this.state.user.profile_image }} style={styles.profilePic}/>  
              <Text style={styles.profileBubbleText}> 
                {`${first_name} ${last_name}`}
              </Text>
            </View>
            <View style={styles.bioContainer}>
              <Text style={styles.bioHeader}>Bio</Text>
              <Text style={styles.bioText}>{bio}</Text>
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

        <Text onPress={this._onLogout} style={styles.logoutButton}>
          Logout
        </Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    height: '88%',
    paddingHorizontal: 20,    
  },
  loadingContainer : {
    height: '90%',
    justifyContent: 'center',
  },
  profileContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  profileBubble: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  profileBubbleText: {
    letterSpacing: 2,
    color: 'black',
    fontFamily: 'circular',
    fontSize: 20,
    paddingLeft: 5
  },
  profileTextBubbleContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: PRIMARY_COLOR, 
    justifyContent: 'center',
    alignItems: 'center' ,
    
  },
  profileTextBubble: {
    color: 'white',
    fontWeight: '700',
    fontSize: 30,
  },
  fullName: {
    fontSize: 25,
    fontWeight: '700',
  },
  profilePic: {
    height: 70,
    width: 70,
    borderRadius: 35
  },
  bioContainer: {
    justifyContent: 'center',
    width: '45%',
  },
  bioHeader: {
    fontFamily: 'circular',
    fontSize: 18,
    color: 'black'
  },
  bioText: {
    fontFamily: 'circular',
    fontSize: 16,
    color: '#888'
  },
  logoutButton: {
    backgroundColor: PRIMARY_COLOR,
    color: 'white',
    letterSpacing: 2,
    fontWeight: '700',
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'circular',
    marginTop: 20,
    borderRadius: 5
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