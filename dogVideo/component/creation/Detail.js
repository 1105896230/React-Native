import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  ListView,
  TextInput,
  Modal,
  Alert
} from 'react-native';
var Video = require('react-native-video').default;
import Button from 'react-native-button'
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
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
      videoOk: true,
      coment: '',
      dataSource: ds.cloneWithRows([]),
      animationType: 'none',
      modalVisable: false,
      content:'',
      isSendIng:false

    })
  }
  componentDidMount() {
    this._fetchdata()
  }
  _fetchdata() {
    var that = this
    var url = config.api.base + config.api.comment
    request.get(url, {
      id: 124,
      accesToken: '123a'
    }).then(function (data) {
      if (data && data.success) {
        var comment = data.data
        if (comment && comment.length > 0) {
          that.setState({
            coment: comment,
            dataSource: that.state.dataSource.cloneWithRows(comment)
          })
        }
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    var data = this.props.navigation.state.params.data;
    var that = this;
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
          {
            !this.state.videoOk && <Text style={styles.failText}>视频出错了!很抱歉</Text>

          }

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
        <ScrollView
          automaticallyAdjustContentInsets={false}
          enableEmptySection={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}>
          <ListView
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderHeader={() => this._renderHeader()}
            showsVerticalScrollIndicator={false}
            renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
          />
          <Modal
            animationType={'fade'}
            visible={this.state.modalVisable}
            onRequestClose={() => { this._setModalVisable(false) }}>
            <View style={styles.modalContainer}>
              <View style={styles.commentBox}>
                <View style={styles.comment}>
                  <Text>输入评论</Text>
                  <TextInput
                    placeholder='好喜欢。。'
                    style={styles.content}
                    multiline={true}
                    onFocus={() => that._onFocus()}
                    onBlur={this._onBlur}
                    defaultValue={this.state.content}
                    onChangeText={(text) => {
                      that.setState({
                        content: text
                      })
                    }}
                  />
                </View>
              </View>
              <Button style={styles.submitbtn} onPress={()=>that._submit()}>评论</Button>
            </View>

          </Modal>
        </ScrollView>
      </View>
    )
  }
  _submit() {
    if (!this.state.content) {
      return Alert.alert('留言不能为空')
    }
    if (this.state.isSendIng) {
      return Alert.alert('正在评论中')
    }
    this.setState({
       isSendIng:true
    },function(){
      var body={
        accessToken:'abc',
        content:this.state.content,
        creation:'123'
      }
      var url=config.api.base+config.api.content;
      request.post(url,body)
      .then(function(data){
        console.log(data)
        Alert.alert('评论成功')
        this.setState({
          isSendIng:false,
        })
      }).catch((error)=>{
        this.setState({
          isSendIng:false
        })
      })
    })

  }
  _renderHeader() {
    var data = this.props.navigation.state.params.data;
    var that = this
    return (
      <View style={styles.listHeader}>
        <View style={styles.infoBox}>
          <Image style={styles.avater} source={{ uri: data.author.avater }} />
          <View style={styles.descBox}>
            <Text style={styles.nickname}>{data.author.nick}</Text>
            <Text style={styles.title}>{data.title}</Text>
          </View>
        </View>

        <View style={styles.commentBox}>
          <View style={styles.comment}>
            <Text>输入评论</Text>
            <TextInput
              placeholder='好喜欢。。'
              style={styles.content}
              multiline={true}
              onFocus={() => that._onFocus()}
            />
          </View>
        </View>
        <View style={styles.commentArea}>
          <Text style={styles.commentAreaText}>精彩评论</Text>
        </View>
      </View>
    )
  }
  _onBlur() {

  }
  _closeMoal() {
    this._setModalVisable(false)
  }
  _onFocus() {
    console.log(this)
    this._setModalVisable(true)
  }
  _setModalVisable(isVisable) {
    this.setState({
      modalVisable: isVisable
    })
  }
  renderRow(rowData) {
    return (
      <View key={rowData.id} style={styles.replayBox}>
        <Image style={styles.replayAvater} source={{ uri: rowData.repalyBy.avater }} />
        <View style={styles.replay}>
          <Text style={styles.replaynNickname}>{rowData.repalyBy.nick}</Text>
          <Text style={styles.replayTitle}>{rowData.content}</Text>
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
    if (!this.state.videoReady) {
      this.setState({
        videoReady: true
      })
    }
    var total = data.playableDuration;
    var current = data.currentTime;
    var percent = Number((current / total).toFixed(2));
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
  _onError() {
    console.log('onError：')
    this.setState({
      videoOk: false
    })
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
  scrollview: {

  },
  failText: {
    position: 'absolute',
    left: 0,
    top: 180,
    width: width,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: '#fff'
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
    top: 0,
    left: 0
  },
  icon: {
    position: 'absolute',
    top: 140,
    left: width / 2 - 23,
    width: 46,
    height: 46,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
  },
  infoBox: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  avater: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 30
  },
  descBox: {
    flex: 1,
  },
  nickname: {
    fontSize: 18
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    color: '#666'
  },
  replayBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  replayAvater: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20
  },
  replaynNickname: {
    color: '#666'
  },
  replayTitle: {
    color: '#666',
    marginTop: 4
  },
  replay: {
    flex: 1
  },
  listHeader: {
    width: width,
    marginTop: 10
  },
  commentBox: {
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    width: width,
  },
  content: {
    paddingLeft: 2,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 14,
    height: 80
  },
  commentArea: {
    width: width,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  submitbtn: {
    width: width - 20,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ee735c',
    borderRadius: 4,
    color: '#ee735c',
    fontSize: 18
  }
})