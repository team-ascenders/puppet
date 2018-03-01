var path = require('path')
var fs = require('fs')
var express = require('express')
var https = require('https')

var certOptions = {
    key: fs.readFileSync(path.resolve('certificate/server.key')),
    cert: fs.readFileSync(path.resolve('certificate/server.crt'))
}

var app = express()

var server = https.createServer(certOptions, app).listen(443)