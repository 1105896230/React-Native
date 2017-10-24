
'use strict'

var koa=require('koa')
var logger=require('koa-logger')
var session=require('koa-session')
var Route=require('./config/routes')

var bodyParser=require('koa-bodyparser')
var app=new koa()
var route=Route()

app.keys=['imoc']
app.use(logger())
app.use(session(app))
app.use(bodyParser())
app.use(route.route())
.use(route.allowedMethods())

app.listen(1234)
console.log('Listener:1234')
