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
  StatusBar
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import Icons from 'react-native-vector-icons/Ionicons'
import jwt_decode from 'jwt-decode'
import { ENDPOINT } from '../../constants/api'
import LottieView from 'lottie-react-native'
import lottieCrying from '../../lottie/crying.json'
import lottieLoading from '../../lottie/loading.json'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { PRIMARY_COLOR } from '../../constants/colors';

export default class Profile extends Component {

  state = {
    currentUser: {},
    conversations: [],
    loading: true,
    initalFetch: true
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('@token')
    try {
      if(token) { 
      this.setState({ currentUser: jwt_decode(token).identity })
      this.fetchChat()
      }
    } catch(e) { console.log(e) }
  }

  fetchChat = () => {
    axios.get(`${ENDPOINT}/conversation/all/${this.state.currentUser.id}`)
    .then(res =>{
      this.setState({ conversations: res.data, loading: false, initialFetch: false })
    })
  }

  _renderItem = ({ item, index }) => { 
    const { first_name, last_name, profile_image, id:user_b } = item.receiver
    const { content:previewMessage, sent_at } = item.last
    const { conversation_id } = item


    return (
      <TouchableOpacity 
        style={styles.chatItem}
        onPress={() => Actions.push('chatThread', { user_b } )}>
        <View style={styles.chatInfo}>
          <Image 
            source={{ uri: profile_image }} 
            style={styles.profilePic}/>
          <View style={styles.chatPreview}>
            <Text style={styles.userName}>{first_name} {last_name}</Text>
            <Text style={styles.preview}>{previewMessage}</Text>
          </View>
        </View>
        <Icons name='ios-arrow-forward' color='black' size={24} />
      </TouchableOpacity>
    )
  }

  _keyExtractor = (item, index) => String(item.conversation_id)

  render() {
    if(this.state.initialFetch) {
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
    const hasConversations = this.state.conversations.length > 0 || this.state.loading
    return (
      <View>
        <StatusBar backgroundColor='white' barStyle="dark-content" />
        <View style={styles.container}>
          <Text style={styles.title}>{hasConversations ? 'Chat' : 'Uh oh —'}</Text>
          {hasConversations
            ? (
              <Text style={styles.smallTitle}>
                Stay connected with other users who you've previously connected with.
              </Text>
            )
            : (
              <View>
                <Text style={styles.noChatText}>
                  It looks like you don't have any active conversations. Start by connecting with other users to start chatting with them.
                </Text>
                <View style={{height: '60%', width: '100%', marginTop: '4%'}}>
                  <LottieView source={lottieCrying} 
                    loop 
                    ref={animation => {
                      if (animation) animation.play()
                    }}/>
                </View>
                <View style={styles.refreshContainer}>
                  <TouchableOpacity onPress={this.fetchChat} style={styles.refreshContent}>
                    <Icons name='ios-refresh-circle-outline' color='#eee' size={28} />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
          <FlatList
            data={this.state.conversations}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            extraData={this.state}
            refreshing={this.state.loading}
            onRefresh={this.fetchChat}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: ifIphoneX('12%', '7%'),
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: '4%',
    justifyContent: 'space-between'
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
  refreshContainer: {
    width: '100%', 
    alignItems: 'center'
  },
  refreshContent: {
    
  },
  title: {
    fontFamily: 'circular-black',
    fontSize: 40,
    color: 'black'
  },
  smallTitle: {
    fontFamily: 'circular',
    fontSize: 20,
    paddingVertical: 15,
    color: '#888'
  },
  noChatText: {
    fontSize: 24,
    color: '#888',
    paddingTop: '5%',
    fontFamily: 'circular'
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderColor: '#ddd',
    borderBottomWidth: 1
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: 40
  },
  chatPreview: {
    paddingLeft: 10
  },
  userName: {
    fontFamily: 'circular-black',
    color: '#333',
    fontSize: 20
  },
  preview: {
    fontWeight: '300',
    fontSize: 16,
    color: '#555',
  }
})