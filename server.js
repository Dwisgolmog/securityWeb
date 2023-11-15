const express = require('express')
const app = express()
const path = require('path')

//dotenv
require('dotenv').config();

//cors 설정
app.use(express.json());
var cors = require('cors');
app.use(cors());

// mongodb 연결
let connectDB = require("./db.js");

connectDB.connect().then((client)=>{
    console.log("DB 연결 성공!!");
    app.listen(8080,function(){
        console.log('listening on 8080')
    })
}).catch((err)=>{console.log("MogoDB연결 에러 발생:"+err)});
var db = connectDB.db('SecurityWeb');
//mongoDB 연결 끝



app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'/client/build/index.html'));
})

//회원추가
app.post('/Members-Management/User-SignUp',async (req,res)=>{
    try{
        await db.collection('Members Management').insertOne({email:req.body.email, password:req.body.password, name:req.body.name});
        console.log("/Members-Management/User-SinUp : 200");
        res.send(200);
    } catch(e){
        console.log("/Members-Management/User-SignUp 에서 에러 발생:"+e);
        res.send("/Members-Management/User-SignUp 에서 에러 발생:"+e);
    }
})


app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'/client/build/index.html'));
})

//배포하는법
//https://velog.io/@kcj_dev96/%ED%94%84%EB%A1%A0%ED%8A%B8-%EB%B0%B0%ED%8F%AC-%EB%B0%A9%EB%B2%95-1%ED%8E%B8AWS-EC2-with-React-Express-%ED%99%98%EA%B2%BD 