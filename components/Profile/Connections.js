import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity, Image,
  FlatList
} from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import LottieView from 'lottie-react-native'
import lottieCrying from '../../lottie/crying.json'
import lottieLoading from '../../lottie/loading.json'

import { PRIMARY_COLOR } from '../../constants/colors'
import { ENDPOINT } from '../../constants/api'

export default class Connections extends Component {

  state = {
    users: [],
    loading: true
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params 
    axios.get(`${ENDPOINT}/connection/${id}`)
    .then(res => {
      this.setState({ users: res.data })
      setTimeout(() => this.setState({ loading: false }), 1000)
    })
  }

  _renderItem = ({ item, index }) => { 
    const { first_name, last_name, id, email, bio, profile_image } = item
    return (
      <TouchableOpacity 
        style={styles.userContainer}
        onPress={
          () => Actions.push('viewUser', { 
            user: item, 
            viewer: { id: this.props.navigation.state.params.id },
            backTo: 'connections'
          })}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: !profile_image.includes('base64') ? `data:image/png;base64,${profile_image}` : profile_image }} 
            style={styles.profilePic}/>
          <View style={styles.userInterests}>
            <Text style={styles.userName}>{first_name} {last_name}</Text>
          </View>
        </View>
        <Icons name="ios-arrow-forward" color={PRIMARY_COLOR} size={30} />
      </TouchableOpacity>
    )
  }

  _keyExtractor = (item, index) => item.email

  render() {
    const { users, loading } = this.state
    if(loading) {
      return (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <LottieView source={lottieLoading}             
              ref={animation => {
                if (animation) animation.play()
              }}/>
          </View>
        </View>
      )
    }
    const hasConnections = users.length > 0
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{hasConnections ? 'Your Connections' : 'Connections —'}</Text>
        {hasConnections
          ? (
            <FlatList
            data={users}
            renderItem={this._renderItem} 
            keyExtractor={this._keyExtractor}
            extraData={this.state}
            refreshing={this.state.loading}
            onRefresh={this.fetchDiscover}/>
          )
          : (
            <View>
              <Text style={styles.noConnectionText}>Looks like you haven't made any connections yet. Once you do, they'll appear on this list, and you can start a conversation with them from here.</Text>
              <View style={{height: '60%', width: '100%', marginTop: '4%'}}>
                <LottieView source={lottieCrying} 
                  loop 
                  ref={animation => {
                    if (animation) animation.play()
                  }}/>
              </View>
              <TouchableOpacity onPress={() => Actions.push('discover')} style={styles.fab}>
                <Text style={styles.fabText}>Find Connections</Text>
                <Icons name="ios-people" color='white' size={34} style={styles.fabIcon}/>
              </TouchableOpacity>
            </View>
          )
        }
        </View>
      )
    }
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: '4%'
  },
  title: {
    fontFamily: 'circular',
    fontSize: 30
  }, 
  loadingContainer: {
    flex: 1,
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  noConnectionText: {
    fontSize: 24,
    color: '#888',
    paddingTop: '5%'
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
  fab: {
    flexDirection: 'row',
    backgroundColor: PRIMARY_COLOR,
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
  },
  fabText: {
    fontFamily: 'circular',
    color: 'white',
    fontSize: 20
  },
  fabIcon: {
    marginTop: 5,
    paddingHorizontal: 5
  }
})
