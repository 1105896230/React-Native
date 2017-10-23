'use strict'

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert
} from 'react-native';
import request from '../common/netUtils'
import config from '../common/config'
import Button from 'react-native-button'

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      phoneNumber: '',
      codeSend: false,
      verifyCode: '',
      countingDone: false
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.signupBox}>
          <Text style={styles.title}>快速登录</Text>
          <TextInput
            placeholder="输入手机号"
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'numeric'}
            style={styles.inputFieid}
            onChangeText={(text) => {
              this.setState({
                phoneNumber: text
              })
            }}
          />
          {
            this.state.codeSend ? <View style={styles.verifyCodeBox}>
              <TextInput
                placeholder="输入验证码"
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'numeric'}
                style={styles.inputFieid}
                onChangeText={(text) => {
                  this.setState({
                    verifyCode: text
                  })
                }}
              />
            </View> : null
          }

          {
            this.state.codeSend ? <Button style={styles.btn} onPress={() => this._submit()}>登录</Button>
              : <Button style={styles.btn} onPress={() => this.sendVerifyCode()}>获取验证码</Button>
          }
        </View>
      </View>
    )
  }
  _submit() {
    var phoneNumber = this.state.phoneNumber
    var that=this
    if (!phoneNumber) {
      Alert.alert('手机号不能为空')
      return
    }
    var body = {
      phoneNumber: phoneNumber,
      verifyCode: this.state.verifyCode
    }
    var url = config.api.base + config.api.login
    request.get(url, body)
      .then((data) => {
        console.log(that)
        that.props.afterLogin(data.data)
      }).catch((error) => {
        console.log(error)
      })
  }
  down() {
    this.setState({
      countingDone: true,
    })
  }
  sendVerifyCode() {
    var phoneNumber = this.state.phoneNumber
    if (!phoneNumber) {
      Alert.alert('手机号不能为空')
      return
    }
    var body = {
      phoneNumber: phoneNumber
    }
    var url = config.api.base + config.api.sendCode
    request.post(url, body)
      .then((data) => {
        this.showVeriyCode();
      }).catch((error) => {
        Alert.alert('检查网络')
      })
  }
  showVeriyCode() {
    this.setState({
      codeSend: true,
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9'
  },
  signupBox: {
    marginTop: 30,
  },
  title: {
    marginBottom: 20,
    color: '#333',
    fontSize: 20,
    textAlign: 'center'
  },
  inputFieid: {
    height: 40,
    padding: 5,
    color: '#666',
    fontSize: 16,
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  btn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "transparent",
    borderColor: '#ee735c',
    borderWidth: 1,
    borderRadius: 4,
    color: '#ee735c'
  },
  verifyCodeBox: {
    marginTop: 10,
  },
  countBtn: {
    width: 110,
    height: 40,
    padding: 10,
    marginLeft: 8,
    backgroundColor: 'transparent',
    borderColor: '#ee735c',
    textAlign: 'left',
    fontSize: 15,
    borderRadius: 2
  }
})