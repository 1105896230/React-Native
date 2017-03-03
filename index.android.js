/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    ListView,
    View
} from 'react-native';
var MOCKED_MOVIES_DATA = [
    {title: '标题', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
export default class movielists extends Component {
    constructor(props){
        super(props);
        this.state={
            dataSoucre:new ListView.DataSource({
                rowHasChanged:(row1,row2)=>row1!==row2,
            }),
            loaded:false,
        };
        this.fetchData=this.fetchData.bind(this);
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData(){
        fetch(REQUEST_URL)
            .then((response)=>response.json())
            .then((responseData)=>{
            this.setState({
                dataSource:this.state.dataSoucre.cloneWithRows(responseData.movies),
                loaded:true,
            });
            });
    }
    render() {
          if (!this.state.loaded){
              return this.renderLoadingView();
          }
          return  <ListView
              dataSource={this.state.dataSource}
              renderRow={this.rederMovie}
              style={styles.listView}
          />;
    }
    renderLoadingView(){
        return(
            <View style={styles.container}>
                <Text>
                    正在加载电影数据...
                </Text>
            </View>
        );
    }
    rederMovie(movie){
        return(
            <View style={styles.container}>
                <Image source={{uri:movie.posters.thumbnail}}
                       style={styles.thunbnail}
                       />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    thunbnail: {
        width: 53,
        height: 81,
    },
    rightContainer:{
        flex: 1,
    },
    title:{
        fontSize:20,
        marginBottom:8,
        textAlign:'center',
    },
    year:{
        textAlign:'center',
    },
    listView:{
        paddingTop:20,
        backgroundColor:'#F5FCFF'
    }
});

AppRegistry.registerComponent('movielists', () => movielists);
