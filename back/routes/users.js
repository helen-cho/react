var express = require('express');
var router = express.Router();
var db = require('../db');

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
    const sql='select *, date_format(regdate,"%Y-%m-%d %T") fmtdate from users where uid=?';
    db.get().query(sql, [uid], function(err, rows){
        res.send(rows[0]);
    });
});

module.exports = router;
