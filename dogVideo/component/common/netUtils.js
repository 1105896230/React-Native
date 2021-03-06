import queryString from 'query-string';
import lodash from 'lodash'
import config from './config'
import Mock from 'mockjs'

var request ={

}
request.get=function(url,params){
    if(params){
         url+='?'+queryString.stringify(params);
    }
    return fetch(url)
    .then((response)=>response.json())
    .then((response)=>Mock.mock(response))
}
request.post=function(url,body){
    var options=lodash.extend(config.header,{
        body:JSON.stringify(body)
    })
    return fetch(url)
    .then((response)=>response.json())
    .then((response)=>Mock.mock(response))
}

module.exports=request;