import React, { Component } from 'react'
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
  Animated, Easing, ActivityIndicator
} from 'react-native'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Icons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import LottieView from 'lottie-react-native'
import lottieFile from '../../lottie/skeleton.json'

import { ENDPOINT } from '../../constants/api'
import { PRIMARY_COLOR } from '../../constants/colors';

export default class Profile extends Component {
  state = {
    users: [],
    currentUser: {},
    loading: true,
    progress: new Animated.Value(0)
  }

  async componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    }).start()
    const token = await AsyncStorage.getItem('@token')
    try {
      if(token) { 
        this.setState({ currentUser: jwt_decode(token).identity })
        this.fetchDiscover()
      }
    } catch(e) {
      console.log(e)
    }
  }

  fetchDiscover = () => {
    const { id } = this.state.currentUser
    axios.get(`${ENDPOINT}/category/subscription/discover/${id}`)
    .then(res => {
      this.setState({ users: res.data, loading: false })
    })
  }

  _renderItem = ({ item, index }) => { 
    const { first_name, last_name, id, email, bio, profile_image } = item.user
    let commonInterests = ''
    item.common.forEach((currentInterest, index) => {
      if(index !== (item.common.length - 1))
        commonInterests += `${currentInterest.name}, `
      else 
        commonInterests += `and ${currentInterest.name}.`
    })

    return (
      <TouchableOpacity 
        style={styles.userContainer}
        onPress={
          () => Actions.push('viewUser', { 
            user: item.user, 
            viewer: this.state.currentUser,
            backTo: 'discover'
          })}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: !profile_image.includes('base64') ? `data:image/png;base64,${profile_image}` : profile_image }} 
            style={styles.profilePic}/>
          <View style={styles.userInterests}>
            <Text style={styles.userName}>{first_name} {last_name}</Text>
            <Text style={styles.commonInterest}>Also interested in {commonInterests}</Text>
          </View>
        </View>
        <Icons name="ios-arrow-forward" color={PRIMARY_COLOR} size={30} />
      </TouchableOpacity>
    )
  }

  _keyExtractor = (item, index) => item.user.email

  render() {
    const { users, loading } = this.state
    // if(loading) {
    //   return (
    //     <View style={styles.loadingContainer}>
    //       <View style={{height: '100%', width: '100%', marginTop: '20%'}}>
    //         <LottieView source={lottieFile} 
    //           loop 
    //           ref={animation => {
    //             if (animation) animation.play()
    //           }}/>
    //       </View>
    //     </View>
    //   )
    // }
    // <LottieView source={lottieFile} 
    // loop 
    // ref={animation => {
    //   if (animation) animation.play()
    // }}/>
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.titleSmall}>We've generated a list of users who share the same interest at you. Browse through and interact with them!</Text>
        <View style={styles.flatListContainer}>
          {
            loading
            ? (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator color={PRIMARY_COLOR} size='large' />
              </View>
            )
            : (
              <FlatList
              data={users}
              renderItem={this._renderItem} 
              keyExtractor={this._keyExtractor}
              extraData={this.state}
              refreshing={this.state.loading}
              onRefresh={this.fetchDiscover}/>
            )
          }

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '7%',
    paddingHorizontal: '3%',
    backgroundColor: 'white'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontFamily: 'circular',
    fontSize: 40,
    color: 'black',
    paddingBottom: 15
  },
  titleSmall: {
    fontWeight: '300',
    fontSize: 18,
    color: '#999'
  },
  flatListContainer: {
    height: '82%',
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#eee'
  },
  userContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userName: {
    fontFamily: 'circular',
    fontSize: 24,
    color: 'black'
  },
  userInterests: {
    flexDirection: 'column',
    paddingLeft: 15,
  },
  commonInterest: {
    width: 220
  }
})