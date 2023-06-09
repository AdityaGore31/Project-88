import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import * as Font from 'expo-font';

import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      previewImage: 'image_1',
      dropdownHeight: 40,
      caption: '',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async addPost() {
    if (this.state.caption) {
      let postData = {
        preview_images: this.state.previewImage,
        caption: this.state.caption,
        author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_uid: firebase.auth().currentUser.uid,
        profile_image: this.state.profile_image,
        likes: 0,
      };
      await firebase
        .database()
        .ref('/posts/' + Math.random().toString(36).slice(2))
        .set(postData)
        .then(function (snapshot) {});
      this.props.setUpdateToTrue();
      this.props.navigation.navigate('Feed');
    } else {
      Alert.alert(
        'Error',
        'All fields are required!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }

  render() {
    if (this.state.fontLoaded) {
      let preview_images = {
        image_1: require('../assets/image_1.jpg'),
        image_2: require('../assets/image_2.jpg'),
        image_3: require('../assets/image_3.jpg'),
        image_4: require('../assets/image_4.jpg'),
        image_5: require('../assets/image_5.jpg'),
      };
      console.log(this.state.previewImage);

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>

            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>New Post</Text>
            </View>
          </View>

          <View style={styles.feildsContainer}>
            <ScrollView>
              <Image
                source={preview_images[this.state.previewImage]}
                style={styles.previewImage}></Image>

              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: 'image 1', value: 'image_1' },
                    { label: 'image 2', value: 'image_2' },
                    { label: 'image 3', value: 'image_3' },
                    { label: 'image 4', value: 'image_4' },
                    { label: 'image 5', value: 'image_5' },
                    { label: 'image 6', value: 'image_6' },
                    { label: 'image 7', value: 'image_7' },
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 40,
                    borderRadius: 20,
                    marginBottom: 10,
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{ backgroundColor: 'transparent' }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{ backgroundColor: '#2a2a2a' }}
                  labelStyle={{ color: 'white' }}
                  arrowStyle={{ color: 'white' }}
                  onChangeitem={(item) =>
                    this.setState({
                      preview_images: item.value,
                    })
                  }
                />
              </View>

              <TextInput
                style={styles.inputFont}
                onChangeText={(caption) => this.setState({ caption })}
                placeholder={'caption'}
                placeholderTextColor="white"
              />
            </ScrollView>
          </View>

          <View style={{ flex: 0.08 }}></View>

          <Text>Create Story</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.8,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'MuseoModerno',
  },
  cardContainer: {
    flex: 0.85,
  },
  postCardLight: {
    margin: RFValue(20),
    backgroundColor: 'eaeaea',
    borderRadius: RFValue(20),
  },
  appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(28),
  },
});
