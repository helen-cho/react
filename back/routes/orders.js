var express = require('express');
var router = express.Router();
var db = require('../db');

//주문자정보 저장
router.post("/insert/purchase", function(req, res){
    const uid=req.body.uid;
    const rname=req.body.uname;
    const rphone=req.body.phone;
    const raddress1=req.body.address1;
    const raddress2=req.body.address2;
    const sum=req.body.sum;
    let sql='insert into purchase(uid,rname,rphone,raddress1,raddress2,sum) values(?,?,?,?,?,?)';
    db.get().query(sql, [uid,rname,rphone,raddress1,raddress2,sum],function(err){
        if(!err){
            let sql= 'select last_insert_id() last from purchase';
            db.get().query(sql, function(err, rows){
                //console.log('.............', rows[0].last);
                res.send(rows[0].last.toString());
            });
        }else {
            res.send('0');
        }
    });
});

module.exports = router;