/**
 * Created by Administrator on 2017/3/3.
 */
'use strict';
import React, {
    Component
} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    Image,
    ActivityIndicator,

} from 'react-native';
import SearchResult from './SearchResult'

var styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        marginBottom: 10,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    buttonLocation: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    homeImage: {
        height: 138,
        width: 217,
    },
})
function urlForQueryAndPage(key,value,pageNumber){
    var data={
        country:'uk',
        pretty:"1",
        encoding:'json',
        listing_type:'buy',
        action:'search_listings',
        page:pageNumber
    };
    data[key]=value;
    var queryString=Object.keys(data)
        .map(key=>key+'='+encodeURIComponent(data[key]))
        .join('&');
    return 'http://api.nestoria.co.uk/api?' + queryString;
}
export default class SearchPage extends Component {
    constructor(props){
        super(props);
        this.state={
            searchString:'london',
            isLoading:false,
            message:''
        };
    }
    onSearchTextChange(event){
        this.setState({searchString:event.nativeEvent.text});
    }
    onSearchPress(){
       var query=urlForQueryAndPage('place_name',this.state.searchString,1);
       this._executeQuery(query);
    }
    _executeQuery(query){
        console.log(query);
        this.setState({
            isLoading:true
        })
        fetch(query)
            .then(response=>response.json())
            .then(json=>this._handleResponse(json.response))
            .catch(error=>{
                this.setState({
                    isLoading:false,
                    message:'Something bad happend '+error
                })
            })
    }
    _handleResponse = (response) => {
        const {navigator} = this.props;
        this.setState({
            isLoading:false,
            message:''
        });
        console.log(JSON.stringify(response.listings));
        if (response.application_response_code.substr(0,1)==='1'){
            console.log('response.push');
            navigator.push({
                id: 'SearchResult',
                title:'SearchResults',
                component:SearchResult,
                params:{
                    lists:response.listings,
                }
            });
            console.log('response.push_2');
            // console.log('Property Found ' + response.listings.length);
        }else {
            this.setState({
                message:'Location not  recoginized; please try again'
            })
        }
    };

    render() {
        var spinner=this.state.isLoading?(
            <ActivityIndicator size="large"/>
            ):(<View/>);
        console.log('render.lodading:'+this.state.isLoading);

        return (
            <View style={styles.container}>
                <Text style={styles.container}>
                    Search for hourse to buy!
                </Text>
                <Text style={styles.description}>
                    Search by place-name,postcode or search near you location
                </Text>
                <View style={styles.flowRight}>
                    <TextInput style={styles.searchInput}
                               underlineColorAndroid={"#F5FCFF"}
                               placeholder='earch via name or postcode'
                               onChange={this.onSearchTextChange.bind(this)}
                    value={this.state.searchString}/>
                    <TouchableHighlight style={styles.button}
                                        underlayColor={'#99d9f4'}
                                        onPress={this.onSearchPress.bind(this)}
                    >
                        <Text style={styles.buttonText}>Go</Text>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight
                    style={styles.buttonLocation}
                    underlayColor={"#99d9f4"}
                >
                    <Text style={styles.buttonText}>Location</Text>
                </TouchableHighlight>

                {/*<Image style={styles.homeImage} source={require('./img/house.png')}/>*/}

                {spinner}
                <Text style={styles.description}>{this.state.message}   </Text>
            </View>
        )
    }
}
