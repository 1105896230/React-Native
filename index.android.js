/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Image,
    ListView,
    Navigator,
    TouchableHighlight,
    Animated,
} from 'react-native';
import MyScene from './MyScene';

import PressDemo from './PressDemo';
import PanDemo from './PanDemo';
export default class AwesomeProject extends Component {
    static defaultProps = {
        title: 'MyScene'
    };

    render(){
        return(
            <TouchableHighlight>
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}
                style={styles.touchable}
                <View styel={styles.button}>
                    <Text style={styles.welcome}>
                        {this.state.pressing?'EEK':'PUSH ME'}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    // render() {
    //     return (
    //         <View>
    //             <Text style={{width: 50, height: 50, backgroundColor: 'powderblue'}} >
    //                 Hi! My name is {this.props.title}.
    //             </Text>
    //             <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
    //             <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
    //         </View>
    //     );
    // }
    // render() {
    //     return (
    //         <Navigator
    //             initialRoute={{ title: 'My Initial Scene', index: 0 }}
    //             renderScene={(route, navigator) => {
    //                 return <MyScene title={route.title} />
    //             }}
    //         />
    //     );
    // }
}

class ImageDemo extends Component{
    render(){
        return(
            <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                   style={{width: 400, height: 400}} />
        );
    }
}
class MyButton extends Component {
    _onPressButton() {
        console.log("You tapped the button!");
    }
    test(){
        console.log("test!");
    }

    render() {
        return (
            <TouchableHighlight onPress={this.test}>
                <Text>Button</Text>
            </TouchableHighlight>
        );
    }
}

class Playground extends React.Component {
    //noinspection JSAnnotator
    constructor(props: any) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0),
        };
    }
    //noinspection JSAnnotator
    render(): ReactElement {
        return (
            <Animated.Image                         // 可选的基本组件类型: Image, Text, View
                source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
                style={{
                    flex: 1,
                    transform: [                        // `transform`是一个有序数组（动画按顺序执行）
                        {scale: this.state.bounceValue},  // 将`bounceValue`赋值给 `scale`
                    ]
                }}
            />
        );
    }
    componentDidMount() {
        this.state.bounceValue.setValue(1.5);     // 设置一个较大的初始值
        Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
            this.state.bounceValue,                 // 将`bounceValue`值动画化
            {
                toValue: 0.8,                         // 将其值以动画的形式改到一个较小值
                friction: 1,                          // Bouncier spring
            }
        ).start();                                // 开始执行动画
    }
}
var styles1=StyleSheet.create({
     bold:{
         fontWeight:"bold",
     },
    italic:{
        fontStyle:"italic"
    }
});
// var Strong=StyleSheet.create({
//    render:function () {
//        return(
//            <Text style={styles1.bold}>{this.props.children}</Text>
//        );
//    }
// });
// var En=StyleSheet.create({
//    render:function () {
//        return(
//            <Text style={styles1.italic}>{this.props.children}</Text>
//        );
//    }
// });
class FixedDimensionsBasics extends Component {
    render() {
        return (
            <View>
                <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
                <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
            </View>
        );
    }
};
class FlexDimensionsBasics extends Component {
    render() {
        return (
            // 试试去掉父View中的`flex: 1`。
            // 则父View不再具有尺寸，因此子组件也无法再撑开。
            // 然后再用`height: 300`来代替父View的`flex: 1`试试看？
            <View style={{flex: 1}}>
                <View style={{flex: 1, backgroundColor: 'powderblue'}} />
                <View style={{flex: 2, backgroundColor: 'skyblue'}} />
                <View style={{flex: 3, backgroundColor: 'steelblue'}} />
            </View>
        );
    }
};
class FlexDirectionBasics extends Component {
    render() {
        return (
            // 尝试把`flexDirection`改为`column`看看
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
            </View>
        );
    }
};
class JustifyContentBasics extends Component {
    render() {
        return (
            // 尝试把`justifyContent`改为`center`看看
            // 尝试把`flexDirection`改为`row`看看
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
            </View>
        );
    }
};
class AlignItemsBasics extends Component {
    render() {
        return (
            // 尝试把`alignItems`改为`flex-start`看看
            // 尝试把`justifyContent`改为`flex-end`看看
            // 尝试把`flexDirection`改为`row`看看
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
            </View>
        );
    }
};
class PizzaTranslator extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <TextInput
                    style={{height: 40}}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({text})}
                />
                <Text style={{padding: 10, fontSize: 42}}>
                    {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width:400,
        height:200,
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
class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return(
            <ScrollView>

                <Text style={{fontSize:96}}>Scroll me plz</Text>
                <Image source={pic} style={{width: 193, height: 110}} />
                <Text style={{fontSize:96}}>If you like</Text>

                <Text style={{fontSize:96}}>Scrolling down</Text>

                <Text style={{fontSize:96}}>What's the best</Text>

                <Text style={{fontSize:96}}>Framework around?</Text>

                <Text style={{fontSize:80}}>React Native</Text>
            </ScrollView>
        );
    }
}

class ListViewBasics extends Component {
    // 初始化模拟数据
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
        };

    }

    render() {
        return (
            <View style={{flex: 1, paddingTop: 22}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData}</Text>}
                />
            </View>
        );
    }
}
class SimpleNavigationApp extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{ title: 'My Initial Scene', index: 0 }}
                renderScene={(route, navigator) =>
                    <MyScene
                        title={route.title}

                        // Function to call when a new scene should be displayed
                        onForward={ () => {
                            const nextIndex = route.index + 1;
                            navigator.push({
                                title: 'Scene ' + nextIndex,
                                index: nextIndex,
                            });
                        }}

                        // Function to call to go back to the previous scene
                        onBack={() => {
                            if (route.index > 0) {
                                navigator.pop();
                            }
                        }}
                    />
                }
            />
        )
    }
}



AppRegistry.registerComponent('AwesomeProject', () => PanDemo);
