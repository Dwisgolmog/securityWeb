const express = require('express')
const app = express()
const path = require('path')

const cookieParser = require('cookie-parser');
app.use(cookieParser('암호화에 쓸 비번'));

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


//passport 
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local');

app.use(session({
  secret: '암호화에 쓸 비번',
  resave : false,
  saveUninitialized : true,
  cookie : { maxAge : 60 * 60 * 1000 }
}))
app.use(passport.initialize())
app.use(passport.session()) 

//쿠키를 유저에게 보내기
passport.serializeUser((user, done) => {
    process.nextTick(() => {
      done(null, { id : user._id, name : user.name })
    })
})

//유저가 보낸 쿠키 검사
passport.deserializeUser(async(user, done) => {
    try {
        let result = await db.collection('Members Management').findOne({ _id: new Object(user.id) })
        delete result.password
        process.nextTick(() => {
          return done(null, result)
        })
      } catch (e) {
        console.log('deserializeUser 에러 발생!!');
        console.log(e);
        done(e, null);
      }
})

//Login 검사
passport.use(new LocalStrategy(async (inputEmail, inputPWD, cb) => {
    try{
        let result = await db.collection('Members Management').findOne({ email : inputEmail})
        if (!result) {
          return cb(null, false, { message: '유효하지 않는 아이디 입니다.' })
        }
        if (result.password == inputPWD) {
          return cb(null, result)
        } else {
          return cb(null, false, { message: '비번불일치 합니다.' });
        }
    } catch(e){
        console.log('Login 검사 에러 발생!!');
        console.log(e);
    }
}))



//passport 끝



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

//로그인하기
app.post('/Members-Management/User-logIn', async (req,res,next)=>{
    passport.authenticate('local',(error,user,info)=>{
        if(error) return res.status(500).json(error)
        if(!user) return res.status(401).json(info.message)
        req.logIn(user,(err)=>{
            if(err) return next(err)
            console.log(req.session);
            res.cookie('connect.sid', req.sessionID, { signed: true, httpOnly: true });
            res.json(req.user);
        })
    })(req,res,next)
})

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'/client/build/index.html'));
})

//배포하는법
//https://velog.io/@kcj_dev96/%ED%94%84%EB%A1%A0%ED%8A%B8-%EB%B0%B0%ED%8F%AC-%EB%B0%A9%EB%B2%95-1%ED%8E%B8AWS-EC2-with-React-Express-%ED%99%98%EA%B2%BD 