import React, { Component } from 'react'
import { 
  View, Text, StyleSheet, AsyncStorage, Image,  StatusBar,
  ActivityIndicator, TouchableOpacity, Animated, FlatList
} from 'react-native'
import axios from 'axios'

import { PRIMARY_COLOR } from '../../../constants/colors'
import { ENDPOINT } from '../../../constants/api'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

export default class SelectCategories extends Component {
  state = {
    categories: null,
    isLoading: true
  }

  componentDidMount() {
    this._fetchCategories()
  }

  async _fetchCategories() {
    const res = await axios.get(`${ENDPOINT}/category`)
    if(res) this.setState({ categories: res.data, isLoading: false })
  }

  _renderItem = ({ item }) => { 
    console.log(item.id)
    return (
      <Text key={item.id}>{item.name}</Text>
    )
  }

  _keyExtractor = (item, index) => item.id

  render() {
    const { categories, isLoading } = this.state
    if(isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator color='white' size='large' />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />
        <View style={styles.content}>
          <Text style={styles.header}>Almost done!</Text>
          <Text style={styles.smallText}>In order to create connections between you and other students with similar interests, please select all categories that applies.</Text>
          <FlatList
            data={categories}
            renderItem={this._renderItem } 
            keyExtractor={this._keyExtractor}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  content: {
    flex: 1,
    paddingHorizontal: '2%',
    paddingVertical: '4%',    
  },
  loadingContainer: {
    justifyContent: 'center'
  },
  header: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'circular'
  },
  smallText: {
    fontSize: 20,
    color: 'white',
    marginTop: 10
  }
})