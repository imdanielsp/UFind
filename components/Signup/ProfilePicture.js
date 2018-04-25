import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, Image,
          TouchableOpacity, AsyncStorage, Animated, Alert,
          ActivityIndicator, KeyboardAvoidingView, Easing, Keyboard } from 'react-native'
// import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios'

import { PRIMARY_COLOR } from '../../constants/colors'
import { HEADER_TITLE as titleStyle } from '../../constants/styles'
import { ENDPOINT } from '../../constants/api'

type Props = {}
export default class Bio extends Component<Props> {
  state = { 
    profile_image: null,
    isLoading: false,
    fadeAnim: new Animated.Value(0),
    slideOut: new Animated.Value(0),
    slideIn: new Animated.Value(1000),
  }

  componentDidMount() {
    Keyboard.dismiss()
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 250,
      }
    ).start(done => {
    })
  }

  _onSubmit = () => {
    if(profile_image === null) return
    const { profile_image } = this.state
    const { first_name, last_name, email, password, bio } = this.props
    const payload = { first_name, last_name, email, password, bio, profile_image }
    this.setState({ isLoading: true })
    axios.post(`${ENDPOINT}/user`, payload)
    .then(async res => {
      const { access_token } = res.data
      try {
        await AsyncStorage.setItem('@token', JSON.stringify(res.data.access_token))
        Actions.push('selectCategories')
      } catch (e) {
        Alert.alert('Token Error', 'Somethig went wrong while setting up your account..')
        this.setState({ isLoading: false })
      }
    })
    .catch(err => { 
      Alert.alert('Server Error', 'Something went wrong while signing up..')
      this.setState({ isLoading: false })
    })
  }

  _pickImage = () => {
    ImagePicker.openPicker({
      width: 160,
      height: 160,
      compressImageQuality: 0.8,
      cropping: true,
      includeBase64: true
    }).then(image => { 
      this.setState({ profile_image: `data:image/png;base64,${image.data}` })})
  }

  render() {
    let containerAnimation = {
      opacity: this.state.fadeAnim,
      transform: [{
        translateY: this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0]
        })
      }, { translateY: this.state.slideOut}]
    }
    const { profile_image, isLoading } = this.state
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.content, containerAnimation]}>
          <KeyboardAvoidingView style={styles.keyboardAvoid}>
            <View>
              <Text style={styles.text}>{profile_image === null ? 'Upload a profile picture —' : 'Looking good!'}</Text>
              <Text style={styles.text_small}>
                {profile_image === null
                 ? 'Add a picture of yourself so others can see what you look like'
                 : 'You can continue with the signup process or choose a different photo '
                }
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              {profile_image === null
                ? (
                  <Image 
                    style={styles.imagePreview}
                    onPress={this._pickImage}
                    source={{ uri: 'https://s3.amazonaws.com/ufind-statics/profile_image.png'}} 
                  />
                )
                : <Image style={styles.imagePreview} source={{uri: profile_image }} />
              }
            </View>
            <View>
              {profile_image === null 
                ? (
                  <TouchableOpacity onPress={this._pickImage} style={styles.button}>
                    <Text style={styles.buttonText}>Choose Image</Text>
                  </TouchableOpacity>
                )
                : (
                <View style={styles.twoButtonContainer}>
                  <TouchableOpacity onPress={this._pickImage} style={styles.shortButton}>
                    <Text style={styles.buttonText}>Rechoose Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._onSubmit} style={styles.shortButton}>
                    {isLoading
                      ? <ActivityIndicator color={PRIMARY_COLOR} size='small' />
                      : <Text style={styles.buttonText}>Complete Signup</Text>
                    }
                  </TouchableOpacity>
                </View>
                )
              }
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: '3%'
  },
  keyboardAvoid: {
    height: '98%',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 40,
    textAlign: 'left',
    fontWeight: "200",
    marginBottom: 20,
    fontFamily: 'circular'
  },
  text_small: {
    color: 'white',
    fontSize: 20,
    textAlign: 'left',
    fontWeight: "200",
    marginBottom: 20,
    fontFamily: 'circular'
  },
  input: {
    width: '100%',
    fontSize: 24,
    textAlign: 'left',
    color: 'white',
    margin: 'auto',
    backgroundColor: 'rgba(255,255,255,0.25)'
  },
  invalid: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: '2%',
    paddingVertical: '3%'
  },
  button: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: '3%',
    marginVertical: '3%',
    borderRadius: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 1,
  },
  shortButton: {
    width: '49%',
    alignItems: 'center',
    paddingVertical: '3%',
    marginVertical: '3%',
    borderRadius: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 1,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'circular',
    color: PRIMARY_COLOR
  },
  twoButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  imagePreview: { 
    width: 200, 
    height: 200, 
    borderRadius: 100
  }
})