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
  Image,
  AsyncStorage
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import TabNavigator from 'react-native-tab-navigator';
import Account from './component/account/index'
import Login from './component/account/login'
import Edit from './component/edit/index'
import Creation from './component/creation/index'
import Detail from './component/creation/Detail'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});
const Navigator = StackNavigator({
  Creation: { screen: Creation },
  Detail: { screen: Detail },
}, {
    initialRouteName: 'Creation', // 默认显示界面
    onTransitionStart: () => { console.log('导航栏切换开始'); },  // 回调
    onTransitionEnd: () => { console.log('导航栏切换结束'); },  // 回调
  });

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      logined: false,
      user: null
    }
  }

  componentDidMount() {
    this._asyncAppStatus();
  }
  _asyncAppStatus() {
    AsyncStorage.getItem('user')
      .then((data) => {
        var user
        var newState = {

        }
        if (data) {
          user = JSON.parse(data)
        }
        if (user && user.accessToken) {
          newState.user = user;
          newState.logined = true
        } else {
          newState.logined = false
        }
        this.setState(newState)
      })
  }


  save(data){
    user=JSON.stringify(data)
    AsyncStorage.setItem('user',user)
    .then(()=>{
      this.setState({
        logined:true,
        user:user
      })
    })
  }
  render() {
    if (!this.state.logined) {
      return (
        <Login afterLogin={this.save.bind(this)}/>
      )
    }
    return (
      <TabNavigator
        tabBarStyle={{ height: 60 }}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          renderIcon={() => <Image style={styles.Image} source={require('./component/source/ic_launcher.png')} />}
          renderSelectedIcon={() => <Image style={styles.Image} source={require('./component/source/ic_launcher_round.png')} />}
          onPress={() => this.setState({ selectedTab: 'home' })}>
          {
            <Navigator />
          }
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'video'}
          title="video"
          renderIcon={() => <Image style={styles.Image} source={require('./component/source/ic_launcher.png')} />}
          renderSelectedIcon={() => <Image style={styles.Image} source={require('./component/source/ic_launcher_round.png')} />}
          onPress={() => this.setState({ selectedTab: 'video' })}>
          {<Edit />}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          renderIcon={() => <Image style={styles.Image} source={require('./component/source/ic_launcher.png')} />}
          renderSelectedIcon={() => <Image style={styles.Image} source={require('./component/source/ic_launcher_round.png')} />}
          onPress={() => this.setState({ selectedTab: 'profile' })}>
          {<Account />}
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
    width: 30
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
  TabNavigator: {
    height: 160,
  }
});
