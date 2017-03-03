/**
 * Created by Administrator on 2017/3/3.
 */


import  React,{
    Component,
    PropTypes
}from 'react';
import {
    Text,
    View,
    TouchableHighlight ,
    PropTypes
} from 'react-native'

export default class MyScene  extends Component{
    static defaultProps={
        title:PropTypes.string.isRequired,
        onForward:PropTypes.func.isRequired,
        onBack:PropTypes.func.isRequired,
    };
    render(){
        return(
            <View>
                <Text>Hi! My Name is {this.props.title}</Text>
                <TouchableHighlight  onPress={this.props.onForward}></TouchableHighlight>
                <Text>点我进入下一个场景</Text>
                <TouchableHighlight onPress={this.props.onBack}>
                    <Text>点我进入上一个场景</Text>
                </TouchableHighlight>
            </View>
        );
    }
}