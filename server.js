const express = require('express')
const app = express()
const path = require('path')

// mongodb 연결
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://dwisgolmog:${}@cluster0.vhwu9v6.mongodb.net/?retryWrites=true&w=majority`;

app.listen(8080,function(){
    console.log('listening on 8080')
})

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'/client/build/index.html'));
})

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'/client/build/index.html'));
})