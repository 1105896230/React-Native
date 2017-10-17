import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  Dimensions,
  RefreshControl,
} from 'react-native';
import request from '../common/netUtils'
import config from '../common/config'
var cacheResults = {
  items: [],
  total: 0,
}
var { height, width } = Dimensions.get('window');
export default class Creation extends Component {
    static navigationOptions = {
  	//标题
    header: false,
     //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
    cardStack: {
            gesturesEnabled: true,
    },
  };
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isRefresh: false
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>列表首页</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          onEndReached={this.loadMore()}
          renderFooter={() => this.renderFooter()}
          showsVerticalScrollIndicator={false}
          renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderRow(rowData, sectionID, rowID, highlightRow,navigate)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefresh}
              onRefresh={this.onRefresh.bind(this)}
              onEndReachedThreshold ={20}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />
          }
        />
      </View>
    )
  }
  onRefresh() {
    console.log('onRefresh')
    this.setState({
      isRefresh:true,
    })
    request.get((config.api.base + config.api.createions), {
      accessToken: '22'
    })
      .then(data => {
        cacheResults.total = data.total
        cacheResults.items = data.data;
        if (data.success) {
          this.setState({
            isRefresh:false,
            dataSource: this.state.dataSource.cloneWithRows(cacheResults.items)
          })
        }
      }).catch((error) => {
        this.setState({
          isRefresh:false,
        })
        console.warn(error)
      })
  }
  renderFooter() {
    if (!this.hasMore() && cacheResults.total !== 0) {
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      )
    }
    return (
      <View style={styles.loadingMore}>
      </View>
    )
  }
  loadMore() {
    if (!this.hasMore()) {
      return
    }
    this._fetchData()
  }
  hasMore() {
    return !cacheResults.items.length === cacheResults.total
  }
  renderRow(rowData, sectionID, rowID, highlightRow,navigate) {
    return (
      <TouchableHighlight onPress={()=>navigate('Detail', { data: rowData })}>
        <View style={styles.item}>
          <Text style={styles.title}>{rowData.title}</Text>
          <Image source={{ uri: rowData.thumb }}
            style={styles.thumb} />
          <Image
            source={require("../source/ic_launcher.png")}
            style={styles.play}
          />
          <View style={styles.itemFooter}>
            <View style={styles.handlerBox}>
              <Image
                source={require("../source/ic_launcher.png")}
                style={[styles.play, styles.up]}
              />
              <Text style={styles.handleText}>喜欢</Text>
            </View>
            <View style={styles.handlerBox}>
              <Image
                source={require("../source/ic_launcher.png")}
                style={[styles.play, styles.commentIcon]}
              />
              <Text style={styles.handleText}>评论</Text>
            </View>
          </View>

        </View>

      </TouchableHighlight>
    )
  }
  componentDidMount() {
    this._fetchData()
  }
  _fetchData() {

    request.get((config.api.base + config.api.createions), {
      accessToken: '22'
    })
      .then(data => {
        cacheResults.total = data.total
        var items = cacheResults.items.slice();
        items = items.concat(data.data)
        cacheResults.items = items;
        if (data.success) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(cacheResults.items)
          })
        }
      }).catch((error) => {
        console.warn(error)
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF'
  },
  header: {
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#ff804a'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },
  item: {
    width: width,
    marginBottom: 10,
    backgroundColor: '#fff'

  },
  thumb: {
    width: width,
    height: width * 0.5,
    resizeMode: 'cover'
  },
  title: {
    padding: 10,
    fontSize: 18,
    color: '#333'
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
  },
  handlerBox: {
    padding: 10,
    flexDirection: 'row',
    width: width / 2 - 0.5,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  play: {
    position: 'absolute',
    bottom: 60,
    right: 14,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
  },
  handleText: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#333'
  },
  up: {
    fontSize: 22,
    color: '#333'
  },
  commentIcon: {
    fontSize: 22,
    color: '#333'
  },
  loadingMore: {
    marginVertical: 20
  },
  loadingText: {
    color: '#777',
    textAlign: 'center'
  }
})