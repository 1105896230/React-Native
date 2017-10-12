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
} from 'react-native';
import request from '../common/netUtils'
import config from '../common/config'

var {height, width} = Dimensions.get('window');
export default class Creation extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>列表首页</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderRow(rowData, sectionID, rowID, highlightRow)}
        />
      </View>
    )
  }
  renderRow(rowData, sectionID, rowID, highlightRow) {
    return ( 
      <TouchableHighlight>
        <View style={styles.item}>
          <Text  style={styles.title}>{rowData.title}</Text>
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
                style={[styles.play,styles.up]}
              />
              <Text style={styles.handleText}>喜欢</Text>
            </View>
            <View style={styles.handlerBox}>
            <Image
            source={require("../source/ic_launcher.png")}
                style={[styles.play,styles.commentIcon]}
              />
              <Text style={styles.handleText}>评论</Text>
            </View>
          </View>

        </View>

      </TouchableHighlight>
    )
  }
  componentDidMount(){
    request.get((config.api.base+config.api.createions),{
      accessToken:'22'
    })
    .then(data=>{
      if(data.success){
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(data.data)
        })
      }
    }).catch((error)=>{
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
      width:width,
      marginBottom:10,
      backgroundColor:'#fff'
    
  },
  thumb:{
    width:width,
    height:width*0.5,
    resizeMode:'cover'
  },
  title:{
    padding:10,
    fontSize:18,
    color:'#333'
  },
  itemFooter:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#eee'
  },
  handlerBox:{
    padding:10,
    flexDirection:'row',
    width:width/2-0.5,
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  play: {
    position:'absolute',
    bottom:60,
    right:14,
    width:46,
    height:46,
    paddingTop:9,
    paddingLeft:18,
    backgroundColor:'transparent',
    borderColor:'#fff',
    borderWidth:1,
    borderRadius:23,
  },
  handleText:{
    paddingLeft:12,
    fontSize:18,
    color:'#333'
  },
  up:{
    fontSize:22,
    color:'#333'
  },
  commentIcon:{
 fontSize:22,
    color:'#333'
  }
})