var express = require('express');
var router = express.Router();
var db = require('../db');
var multer = require('multer');

//사진업로드
var upload = multer({
    storage: multer.diskStorage({
        destination:(req, file, done)=>{
            done(null, './public/upload/photo')
        },
        filename:(req, file, done)=>{
            var fileName=Date.now() + '.jpg';
            done(null, fileName);
        }
    })
}); 
//사진업로드
router.post('/update/photo', upload.single('file'), function(req, res){
    const filename='/upload/photo/' + req.file.filename;
    const uid=req.body.uid;
    const sql='update users set photo=? where uid=?';
    db.get().query(sql, [filename, uid], function(err){
        if(err){
            res.send('0');
        }else{
            res.send('1');
        }
    });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


//로그인 체크
router.post('/login', function (req, res) {
    const uid = req.body.uid;
    const upass = req.body.upass;
    const sql = 'select * from users where uid=?';
    db.get().query(sql, [uid], function (err, rows) {
        if(rows.length > 0) {
            if(rows[0].upass == upass){
                res.send('1');
            }else{
                res.send('2');
            }
        }else{
            res.send('0');
        }
    });
});


//사용자정보읽기 REST API
router.get('/read/:uid', function(req, res){ //localhost:5000/users/read/blue
    const uid=req.params.uid;
    const sql='select *, date_format(regdate,"%Y-%m-%d %T") fmtdate, date_format(modidate,"%Y-%m-%d %T") fmtmodi from users where uid=?';
    db.get().query(sql, [uid], function(err, rows){
        res.send(rows[0]);
    });
});

//사용자정보수정
router.post('/update', function(req, res){
    const uname=req.body.uname;
    const phone=req.body.phone;
    const address1=req.body.address1;
    const address2=req.body.address2;
    const uid=req.body.uid;
    const sql='update users set uname=?,phone=?,address1=?,address2=?,modidate=now() where uid=?';
    db.get().query(sql,[uname,phone,address1,address2,uid], function(err){
        if(err) {
            res.send('0');
        }else{
            res.send('1');
        }
    });
});

module.exports = router;
