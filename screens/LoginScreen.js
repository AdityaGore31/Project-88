import React, { Component } from "react"

import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Text,
  Image,
  Button,
  SafeAreaView,
} from 'react-native';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/Fonts/BubblegumSans-Regular.ttf'),
};

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fontsLoaded: false,
    };
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItemm: 'center',
          }}>
          <Button
            title="Sign in with Google"
            onPress={() => this.signInWithGoogleAsync()}></Button>
        </View>
      );
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.appIcon}></Image>
            <Text style={styles.appTitleText}></Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.signInWithGoogleAsync()}>
              <Image
                source={require('../assets/google_icon.png')}
                style={styles.googleIcon}></Image>
                <Text style={styles.googleText}>Sign in with Goolge</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

signIn = async (email, password) => {
  firebase
    .auth()
    .signInWithGoogleAsync(email, password)
    .then(() => {
      this.props.navigation.replace('Dashboard');
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
};
