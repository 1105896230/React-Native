/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {
    Component,
} from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    TextInput,
    ScrollView,
    Navigator
}from 'react-native';
// import MyScene from './MyScene';
import MovieList from './movie';
var MOCKED_MOVIES_DATA = [
    {title: '标题', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
class NetMovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loader: false,
        };

        this.fetchData = this.fetchData.bind(this);
    }

    render() {
        if (!this.state.loader) {
            return this.renderLoadingView();
        }
        // var movie = this.state.movies[0];
        // return this.renderMovie(movie);
        return this.renderMovieList();
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loader: true,
                });
            });
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>正在加载电影数据</Text>
            </View>
        );
    }

    renderMovie(movie) {
        return (
            <View style={styles.container}>
                <Image source={{uri:movie.posters.thumbnail}}
                       style={styles.thumbnail}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                </View>
            </View>
        );
    }

    renderMovieList() {
        return (
            <ListView dataSource={this.state.dataSource}
                      renderRow={this.renderMovie}
                      style={styles.listView}/>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    rightContainer: {},
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});

class ImageDemo extends Component {
    render() {
        let pic = {
            uri: 'http://p2.ifengimg.com/haina/2017_09/7c7aeba6cf16bad_w600_h337.jpg'
        };
        return (
            <Image source={pic} style={{width :193,height:110}}/>
        );
    }
}


class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: true,
            text: '12212121'
        }

        //每1000毫秒对showText进行取反
        setInterval(() => {
            this.setState({showText: !this.state.showText});
        }, 1000)
    }

    render() {
        let display = this.state.showText ? '21212' : '';
        return (
            <Text style={{backgroundColor:'red',width:300,height: 300}}>{display}</Text>
        );
    }
}

class FixDimensionBasics extends Component {
    render() {
        return (
            <View>
                <View style={{width:50,height:50,backgroundColor:'powderblue'}}/>
                <View style={{width:100,height:100,backgroundColor:'skyblue'}}/>
                <View style={{width:150,height:150,backgroundColor:'steelblue'}}/>
            </View>
        );
    }
}

class FlexDimensionBasic extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1,backgroundColor:'powderblue'}}/>
                <View style={{flex:2,backgroundColor:'skyblue'}}/>
                <View style={{flex:3,backgroundColor:'steelblue'}}/>
            </View>
        );
    }
}

class FlexDirectionBasics extends Component {
    render() {
        return (
            //flexDirction 水平布局
            <View style={{flex:1,flexDirection:'row'}}>
                <View style={{width:50,height:50,backgroundColor:'powderblue'}}/>
                <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}}/>
                <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}/>
            </View>
        );
    }
}

class JustifyContentBasics extends Component {
    render() {
        return (
            //justifyContent 和layout-grativy有点类似
            <View style={{ flex:1,flexDirection:'column',justifyContent:'center',}}>
                <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}/>
                <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}}/>
                <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}/>
            </View>
        );
    }
}

class AlignItemsBasics extends Component {
    render() {
        return (
            // 尝试把`alignItems`改为`flex-start`看看
            // 尝试把`justifyContent`改为`flex-end`看看
            // 尝试把`flexDirection`改为`row`看看
            <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        //决定次轴的分布，如果主轴是数值，这个就是水平
        alignItems: 'flex-end',
      }}>
                <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}/>
                <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}}/>
                <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}/>
            </View>
        );
    }
}
;

class PizzaTranslator extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''}
    }

    render() {
        return (
            <View style={{padding:10}}>
                <TextInput style={{height:40}}
                           placeholder="Type here to translate!"
                           onChangeText={(text)=>this.setState({text})}/>
                <Text style={{padding:10,fontSize:42}}>
                    {this.state.text.split(' ').map((word) => word && '@').join(' ')}
                </Text>
            </View>
        );
    }
}

class IScrolledDownLoad extends Component {
    render() {
        return (
            <ScrollView>
                <Text style={{fontSize:96}}>scroll me plz</Text>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
                <Image source={require('./img/qd_logo@2x.png')}/>
            </ScrollView>
        );
    }
}
class ListViewBasics extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
        };
    }

    render() {
        return (
            <View style={{flex:1,paddingTop:2}}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={(rowData)=><Text>{rowData}</Text>}/>
            </View>
        );
    }
}

//return 可以导出其他Component
class YoDawgApp extends Component {
    render() {
        return (
            <MyScene/>
        );
    }
}

class NavitApp extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{title:'My Initial Scene',index:0}}
                renderScene={(route,navigator)=>
                  <MyScene
                   title={route.title}
                   onForward={
                       ()=>{
                           const nextIndex=route.index+1;
                           navigator.push({
                               title:'Scene '+nextIndex,
                               index:nextIndex,
                           });
                       }}
                       onBack={()=>{
                           if(route.index>0){
                               navigator.pop();
                           }
                       }}
                  />
                }
            />
        )
    }
}

class MovieDemo extends Component{
    render(){
        return (
            <MovieList/>
        );
    }
}

AppRegistry.registerComponent("AwesomeProject", () => MovieDemo);

