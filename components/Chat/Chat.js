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
  AsyncStorage
} from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons'

const chats = [
  { first_name: 'Serey',
    last_name: 'Morm',
    preview: 'A test messsage',
    profile_image: 'https://avatars0.githubusercontent.com/u/24735049?s=460&v=4'
  },
  { first_name: 'Merey',
    last_name: 'Sorm',
    preview: 'Another test messsage',
    profile_image: 'https://avatars0.githubusercontent.com/u/24735049?s=460&v=4'
  },
  { first_name: 'Test',
    last_name: 'Boy',
    preview: 'A tests messsage',
    profile_image: 'https://avatars0.githubusercontent.com/u/24735049?s=460&v=4'
  },
  { first_name: 'Tester',
    last_name: 'Sir',
    preview: 'Another ssstest messsage',
    profile_image: 'https://avatars0.githubusercontent.com/u/24735049?s=460&v=4'
  },
]

export default class Profile extends Component {

  _renderItem = ({ item, index }) => { 
    const { first_name, last_name, profile_image, preview } = item

    return (
      <TouchableOpacity 
        style={styles.chatItem}
        onPress={() => Actions.push('chatThread', { conversationId: 1  } )}>
        <View style={styles.chatInfo}>
          <Image 
            source={{ uri: profile_image }} 
            style={styles.profilePic}/>
          <View style={styles.chatPreview}>
            <Text style={styles.userName}>{first_name} {last_name}</Text>
            <Text style={styles.preview}>{preview}</Text>
          </View>
        </View>
        <Icons name='ios-arrow-forward' color='black' size={24} />
      </TouchableOpacity>
    )
  }

  _keyExtractor = (chat, index) => chat.first_name

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chat</Text>
        <Text style={styles.smallTitle}>
          Stay connected with other users who you've previously connected with.
        </Text>
        <FlatList
          data={chats}
          renderItem={this._renderItem} 
          keyExtractor={this._keyExtractor}
          extraData={this.state}
          onRefresh={this.fetchDiscover}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '7%',
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: '2%',
  },
  title: {
    fontFamily: 'circular',
    fontSize: 40,
    color: 'black'
  },
  smallTitle: {
    fontWeight: '300',
    fontSize: 20,
    paddingVertical: 15,
    color: '#888'
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
    fontFamily: 'circular',
    fontSize: 20
  },
  preview: {
    fontWeight: '300',
    fontSize: 16,
    color: '#555',
  }
})