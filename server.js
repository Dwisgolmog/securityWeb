const express = require('express')
const app = express()
const path = require('path')

//dotenv
require('dotenv').config();

// mongodb 연결
const { MongoClient, ServerApiVersion  } = require('mongodb');
const uri = `mongodb+srv://dwisgolmog:${process.env.DB_PWD}@cluster0.vhwu9v6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

client.connect().then((client)=>{
    console.log("DB 연결 성공!!");
    app.listen(8080,function(){
        console.log('listening on 8080')
    })
}).catch((err)=>{console.log("MogoDB연결 에러 발생:"+err)});
//mongoDB 연결 끝



app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'/client/build/index.html'));
})




app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'/client/build/index.html'));
})