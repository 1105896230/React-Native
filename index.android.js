/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, Navigator,
} from 'react-native';

import SearchPage from './SearchPage';
import SearchResult from './SearchResult'
export default class homeList extends Component {
    render() {
        return (
            <View style={styles.container}
            >
                <Navigator
                    initialRoute={{title:'Property Finder',component:SearchPage,}}
                    renderScene={(route,navigator)=>{
                        let MyComponent = route.component;
                        if(MyComponent){
                            return (<MyComponent {...route.params} title={route.title} navigator={navigator}/>);
                        }
                    }
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('homeList', () => homeList);
