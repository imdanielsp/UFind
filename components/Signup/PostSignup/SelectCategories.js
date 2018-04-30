import React, { Component } from 'react'
import { 
  View, Text, StyleSheet, AsyncStorage, Image,  StatusBar,
  ActivityIndicator, TouchableOpacity, Animated, FlatList, Easing
} from 'react-native'
import axios from 'axios'
import LottieView from 'lottie-react-native'
import lottieCheck from '../../../lottie/check.json'
import lottieDone from '../../../lottie/done.json'
import lottieLoading from '../../../lottie/loading.json'
import Icons from 'react-native-vector-icons/Ionicons'
import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import { PRIMARY_COLOR } from '../../../constants/colors'
import { ENDPOINT } from '../../../constants/api'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

class Check extends Component {
  state = {
    progress: new Animated.Value(0)
  }

  componentDidUpdate() {
    if(this.props.selected) {
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 250,
        easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(this.state.progress, {
        toValue: 0,
        duration: 250,
        easing: Easing.linear,
      }).start();
    }
  }
  
  render() {
    return <LottieView source={lottieCheck} progress={this.state.progress} />
  }
}

export default class SelectCategories extends Component {
  state = {
    categories: null,
    selected: [],
    progress: new Animated.Value(0),
    isLoading: true,
    done: false,
  }

  async componentDidMount() {
    const res = await axios.get(`${ENDPOINT}/category`)
    if(res) this.setState({ categories: res.data })
    setTimeout(() => this.setState({ isLoading: false }), 1000)
  }

  _renderItem = ({ item, index }) => { 
    const { selected } = item
    return (
      <TouchableOpacity style={styles.option} onPress={this._onSelect(index)}>
        <Text key={item.id} style={selected ? styles.optionSelected : styles.optionText }>{item.name}</Text>
        <View style={styles.lottieContainer}>
          <Check selected={selected} />
        </View>
      </TouchableOpacity>
    )
  }

  renderCheck = isSelected => {
    const progress = new Animated.Value(0)
    if(isSelected) {
      Animated.timing(progress, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: 250,
        easing: Easing.linear,
      }).start();
    }
  }

  // categories and email
   _onSubmit = async () => {
    const { categories } = this.state
    
    const selectedIds = []
    categories.forEach(item => {
      if(item.selected) selectedIds.push(item.id)
    })
    try {
      const token = await AsyncStorage.getItem('@token')
      if(token) {
        const { email } = jwt_decode(token).identity
           this.setState({ done: true })
        axios.post(`${ENDPOINT}/category/subscribe`, { email, categories: selectedIds})
        .then(res => setTimeout(() => Actions.reset('main'), 1800))
        .catch(e => console.log(e))
      } else {
        Actions.push('welcome')
      }
    } catch (e) {
      console.log(e)
    }
  }

  _onSelect = index => () => {
    const { categories } = this.state
    let currentCategory = categories[index]
    if(!currentCategory.selected) 
      currentCategory['selected'] = true
    else
      currentCategory['selected'] = false
    let updatedCategory = categories
    updatedCategory[index] = currentCategory
    this.setState({ categories: updatedCategory })
  }

  _keyExtractor = (item, index) => item.name

  render() {
    const { categories, isLoading, done } = this.state
    if(done) {
      return (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <View style={{width: '70%', height: '100%',marginLeft: '12%'}}>
              <LottieView source={lottieDone}   
                loop={false}          
                ref={animation => {
                  if (animation) animation.play()
                }}/>
            </View>
          </View>
        </View>
      )
    }
    if(isLoading) {
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
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='white' barStyle="dark-content" />
        <View style={styles.content}>
          <Text style={styles.header}>Almost done —</Text>
          <Text style={styles.smallText}>In order to create connections between you and other students with similar interests, please select all categories that applies.</Text>
          <View style={styles.flatListContainer}>
            <FlatList
              data={categories}
              renderItem={this._renderItem } 
              keyExtractor={this._keyExtractor}
              extraData={this.state}
              showsHorizontalScrollIndicator={false}/>
          </View>
        </View>
        <TouchableOpacity onPress={this._onSubmit} style={styles.fab}>
          <Text style={styles.fabText}>Save Categories</Text>
          <Icons name="ios-checkmark-circle" color='white' size={24} style={styles.fabIcon}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: '4%',
    paddingTop: ifIphoneX('10%', '6%'),
    justifyContent: 'space-between',
  },
  content: {
    paddingVertical: '2%',    
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
  lottieContainer: {
    height: 110,
    width: 110,
  },
  flatListContainer: {
    height: ifIphoneX('74%', '72%'),
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '108%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  optionText: {
    fontFamily: 'circular-black',
    fontSize: 30,
    color: '#888'
  },
  optionSelected: {
    fontFamily: 'circular-black',
    fontSize: 30,
    color: 'black'
  },
  header: {
    fontSize: 40,
    color: 'black',
    fontFamily: 'circular-black'
  },
  smallText: {
    fontSize: ifIphoneX(22, 20),
    color: '#888',
    marginTop: 8,
    fontFamily: 'circular'
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
    fontFamily: 'circular-black',
    color: 'white',
    fontSize: 20
  },
  fabIcon: {
    marginTop: 5,
    paddingHorizontal: 10
  }
})