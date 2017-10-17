import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
var Video = require('react-native-video').default;
import request from '../common/netUtils'
import config from '../common/config'
var { height, width } = Dimensions.get('window');
export default class Detail extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerPressColorAndroid: 'blue',
    //左上角的返回键文字, 默认是上一个页面的title  IOS 有效
    headerBackTitle: "返回",
    //导航栏的style
    headerStyle: {
      backgroundColor: '#fff'
    },
    title: '详情'
  });
  constructor(props){
    super(props)
    this.state=({
      rate: 1,
      muted: false,
      resizeMode: 'cover',
      repeat: false
    })
  }
  render() {
    var data = this.props.navigation.state.params.data;
    console.log(data.video)
    console.log(this.state)
    return (
      <View style={styles.container}>
        <View style={styles.videoBox}>
          <Video
            ref="videoPlayer"
            source={{ uri: data.video }} //视频播放地址
            style={styles.video}      //样式
            volum={4}                 //声音放大倍数
            paused={false}            //true暂停 false开始
            rate={this.state.rate}    // 0 暂停 1正常
            muted={this.state.muted}  //true静音 false 正常
            resizeMode={this.state.resizeMode}//
            repeat={this.state.repeat}//
            onLoadStart={this._onLoadStart} //视频开始加载回调
            onLoad={this._onLoad}           //视频加载完毕回调
            onProgress={this._onProgress}   //每隔250ms调用一次
            onEnd={this._onEnd}             //视频加载结束回调
            onError={this._onError}         //视频加载错误回调
          />
        </View>
      </View>
    )
  }
  _onLoadStart() {
    console.log('onLoadStart')
  }
  _onLoad() {
    console.log('onLoad')

  }
  _onProgress(data) {
    console.log('onProgress:' + data)
  }
  _onEnd() {
    console.log('onEnd')

  }
  _onError(e) {
    console.log('onError：' + e)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  videoBox: {
    width: width,
    height: 360,
    backgroundColor: '#000'
  },
  video: {
    width: width,
    height: 360,
    backgroundColor: '#000'
  }
})