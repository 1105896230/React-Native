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
}from 'react-native';
var MOCKED_MOVIES_DATA = [
    {title: '标题', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
var REQUEST_URL ='https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
class NetMovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2)=>row1!==row2,
            }),
            loader:false,
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
                    dataSource:this.state.dataSource.cloneWithRows(responseData.movies),
                    loader:true,
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

    renderMovieList(){
        return(
        <ListView  dataSource={this.state.dataSource}
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
    listView:{
        paddingTop:20,
        backgroundColor:'#F5FCFF',
    },
});
AppRegistry.registerComponent("AwesomeProject", () => NetMovieList);

