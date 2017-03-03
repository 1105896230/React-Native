/**
 * Created by Administrator on 2017/3/3.
 */
'use strict';

import React,{
    Component
}from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ListView,
    Text,
}from 'react-native';

import PropertyComponent from './PropertyView'

export  default  class SearchResult extends Component{
    constructor(props){
        super(props);
        var dataSource=new ListView.DataSource(
            {rowHasChanged:(r1,r2)=>r1.guid!==r2.guid});
        this.state={
            dataSource:dataSource.cloneWithRows(this.props.lists)
        }
    }
    renderRow(rowData,sectionId,rowId){
        var price=rowData.price_formatted.split(' ')[0];
        return(
            <TouchableHighlight
                onPress={()=>this.rowPressed(rowData.guid)}
                underlayColor={"#dddddd"}>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={{uri:rowData.img_url}}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.price}>£{price}</Text>
                            <Text style={styles.title}>
                                numberOfLines={1}>{rowData.title}</Text>
                        </View>
                        <View style={styles.separator}/>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    rowPressed(propertyGuid){
        let property = this.props.lists.filter(prop => prop.guid === propertyGuid)[0];
        this.props.navigator.push({
            title:'PropertyComponent',
            component:PropertyComponent,
            params:{
                property:property
            }
        })
    }
    render(){

        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                />
        );
    }
}
var styles=StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    thumb:{
        width:80,
        height:80,
        marginRight:10
    },
    textContainer:{
        flex:1
    },
    separator:{
        height:1,
        backgroundColor:'#dddddd'
    },
    price:{
        fontSize:25,
        fontWeight:'bold',
        color:'#48bbec'
    },
    title:{
        fontSize:20,
        color:'#656565'
    },
    rowContainer:{
        flexDirection:'row',
        padding:10
    }
})