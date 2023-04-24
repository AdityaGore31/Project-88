import React, {Component} from 'react'

import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  registerUser = (email, password, confirmPassword, first_name, last_name) => {
    if (password == confirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          Alert.alert('User Registeres!!');
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    } else {
      Alert.alert("Password Don't match!");
    }
  };
}
