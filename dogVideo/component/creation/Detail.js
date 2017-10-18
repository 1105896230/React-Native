import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
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
  constructor(props) {
    super(props)
    this.state = ({
      rate: 1,
      muted: false,
      resizeMode: 'cover',
      repeat: false,
      videoReady: false,
      videoProgress: 0.01,
      videoTotal: 0,
      videoCurrent: 0,
      playing: false,
      paused: false,
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
            paused={this.state.paused}            //true暂停 false开始
            rate={this.state.rate}    // 0 暂停 1正常
            muted={this.state.muted}  //true静音 false 正常
            resizeMode={this.state.resizeMode}//
            repeat={this.state.repeat}//
            onLoadStart={this._onLoadStart} //视频开始加载回调
            onLoad={this._onLoad}           //视频加载完毕回调
            onProgress={this._onProgress.bind(this)}   //每隔250ms调用一次
            onEnd={this._onEnd}             //视频加载结束回调
            onError={this._onError}         //视频加载错误回调
          />
          {!this.state.videoReady && <ActivityIndicator color='#ee735c' style={styles.loading} />}
          {
            this.state.videoReady && this.state.playing
              ? <TouchableOpacity style={styles.pauseBtn} onPress={() => this._onPause()}>
                {
                  this.state.paused ? 
                  <Image
                  source={require("../source/ic_launcher.png")}
                  style={styles.icon}
                />
                 : null
              }
              </TouchableOpacity> 
              : null
          }
          <View style={styles.progressBox}>
            <View style={[styles.progressBar, { width: width * this.state.videoProgress }]} />
          </View>
        </View>
      </View>
    )
  }
  _onPause() {
    this.setState({
      paused: !this.state.paused
    })
  }
  _onLoadStart() {
    console.log('onLoadStart')
  }
  _onLoad() {
    console.log('onLoad')

  }
  _onProgress(data) {
    console.log(this.state)
    if (!this.state.videoReady) {
      this.setState({
        videoReady: true
      })
    }
    var total = data.playableDuration;
    var current = data.currentTime;
    var percent = Number((current / total).toFixed(2));
    console.log(total)
    console.log(Number(current.toFixed(2)))
    console.log(percent)
    this.setState({
      videoTotal: total,
      currentTime: Number(current.toFixed(2)),
      videoProgress: percent,
      playing: true
    })

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
    backgroundColor: '#F5FCFF'
  },
  videoBox: {
    width: width,
    height: 250,
    backgroundColor: '#000'
  },
  video: {
    width: width,
    height: 360,
    backgroundColor: '#000'
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 360,
    width: width,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  progressBox: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    height: 2,
    backgroundColor: '#ccc'
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 2,
    backgroundColor: '#ff6600'
  },
  pauseBtn: {
    width: width,
    height: 360,
    position: 'absolute',
    top:0,
    left:0
  },
  icon: {
    position: 'absolute',
    top:140,
    left:width/2-23,
    width: 46,
    height: 46,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
  }
})