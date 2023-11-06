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
            console.log('오류....', err);
            res.send('0');
        }
    });
});

//주문상품등록
router.post("/insert", function(req, res){
    const cid = req.body.cid;
    const pid = req.body.pid;
    const bid = req.body.bid;
    const qnt = req.body.qnt;
    const price = req.body.price;
    let sql="insert into orders(pid, bid, qnt, price) values(?,?,?,?)";
    db.get().query(sql, [pid,bid,qnt,price], function(err){
        if(!err){
            sql='delete from cart where cid=?';
            db.get().query(sql, [cid], function(err){
                res.send('1');
            });
        }else{
            res.send('0');
        }
    });    
});

//주문목록
router.get('/list/purchase.json', function(req, res){ //localhost:5000/orders/list/purchase.json?uid=blue
    const uid=req.query.uid;
    const page=req.query.page ? req.query.page: 1;
    const size=req.query.size ? req.query.size: 5;
    const sql='call purchase_list(?,?,?)';
    db.get().query(sql, [uid, page, size], function(err, rows){
        res.send({list:rows[0], total:rows[1][0].total});
    });
})
module.exports = router;