'use strict'

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import request from '../common/netUtils'
import config from '../common/config'
import Button from 'react-native-button'
var { height, width } = Dimensions.get('window');
var ImagePicker = require('react-native-image-picker');
export default class Account extends Component {

  constructor(props) {
    super(props)
    var u = this.props.user

    this.state = ({
      user: u,
      modalvisable: false,

    })
  }

  _pickPhoto() {
    var that = this
    var options = {
      title: '选择头像',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '选择相册',
      quality: 0.75,
      allowsEditing: true,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        return
      }
      console.log(that)
      var avaterData = 'data:image/jpeg;base64,' + response.data
      var user = that.state.user
      user.avater = avaterData;
      that.setState({
        user: user
      })
    });
  }

  render() {
    var user = this.props.user
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarText}>我的账号</Text>
          <Text style={styles.toolBarEdit} onPress={() => {
            this.setState({
              modalvisable: true
            })
          }}>编辑</Text>
        </View>

        {
          user.avater ?
            <TouchableOpacity style={styles.avaterContainer} onPress={this._pickPhoto.bind(this)}>
              <Image style={styles.avaterContainer} source={{ uri: this.props.user.avater }}>
                <View style={styles.avaterBox}>
                  <Image
                    source={{ uri: this.props.user.avater }}
                    style={styles.avater}

                  />
                </View>
                <Text style={styles.avaterTip}>
                  戳这里换头像
              </Text>
              </Image>
            </TouchableOpacity>
            : <View style={styles.avaterContainer}>
              <Text style={styles.avaterTip}>
                添加头像
              </Text>
              <TouchableOpacity style={styles.avaterBox} onPress={this._pickPhoto.bind(this)}>
                <Image
                  source={require("../source/ic_launcher.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
        }

        {this.state.modalvisable ? <Modal
          animated={true}
          visible={this.state.modalvisable}>
          <View style={styles.modalContainer}>
            <Image
              source={require("../source/ic_launcher.png")}
              style={styles.closeIcon}
              onPress={() => {
                this.setState({
                  modalvisable: false
                })
              }}
            />
            <View style={styles.filedItem}>
              <Text style={styles.lable}>昵称</Text>
              <TextInput
                placeholder="输入你的昵称"
                style={styles.inputFiled}
                autoCapitalize={'none'}
                autoCorrect={false}
                defaultValue={this.state.user.nickName}
                onChangeText={(text) => {
                  this.changeUserText('nickName', text)
                }} />

            </View>

          </View>


        </Modal>:<View/>}

      </View>
    )
  }
  changeUserText(key,value){
    var user=this.state.user
    user[key]=value
    this.setState({
      user:user
    })
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  toolbar: {
    flexDirection: 'row',
    padding: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c',
  },
  toolbarText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',

  },
  avaterContainer: {
    width: width,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee'
  },
  avaterBox: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    padding: 20,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  avaterTip: {
    color: '#fff',
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  avater: {
    width: width * 0.2,
    height: width * 0.2,
    margin: 15,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.1
  },
  toolBarEdit: {
    position: 'absolute',
    right: 10,
    top: 26,
    color: '#fff',
    textAlign: 'right',
    fontWeight: '600',
    fontSize: 14
  },
  modalContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',

  },
  filedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: '#eee',
    borderBottomWidth: 1,
  },
  lable: {
    color: '#eee',
    marginRight: 10,
  },
  inputFiled: {
    height: 50,
    flex: 1,
    color: '#666',
    fontSize: 14
  },
  closeIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    fontSize: 32,
    right: 20,
    top: 30,

  }
})