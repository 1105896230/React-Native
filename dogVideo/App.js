/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Account from './component/account/index'
import Edit from './component/edit/index'
import Creation from './component/creation/index'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    }
  }
  render() {
    return (
      <TabNavigator
      tabBarStyle={{height:60}}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          renderIcon={() => <Image style={styles.Image} source={require('./component/source/ic_launcher.png')} />}
          renderSelectedIcon={() => <Image  style={styles.Image} source={require('./component/source/ic_launcher_round.png')} />}
          onPress={() => this.setState({ selectedTab: 'home' })}>
          {<Creation/>}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'video'}
          title="video"
          renderIcon={() => <Image style={styles.Image} source={require('./component/source/ic_launcher.png')} />}
          renderSelectedIcon={() => <Image  style={styles.Image} source={require('./component/source/ic_launcher_round.png')} />}
          onPress={() => this.setState({ selectedTab: 'video' })}>
          {<Edit/>}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          renderIcon={() => <Image style={styles.Image} source={require('./component/source/ic_launcher.png')} />}
          renderSelectedIcon={() => <Image  style={styles.Image} source={require('./component/source/ic_launcher_round.png')} />}
          onPress={() => this.setState({ selectedTab: 'profile' })}>
          {<Account/>}
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  Image: {
    height: 30,
    width:30
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  TabNavigator:{
    height: 160,
  }
});
