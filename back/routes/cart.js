var express = require('express');
var router = express.Router();
var db = require('../db');

//카드에 도서등록
router.post('/insert', function(req, res){
    const uid=req.body.uid;
    const bid=req.body.bid;
    let sql='select * from cart where uid=? and bid=?';
    db.get().query(sql, [uid,bid], function(err, rows){
        if(rows.length==0){
            sql='insert into cart(uid, bid) values(?,?)';
            db.get().query(sql, [uid, bid], function(err){
                res.send('0');
            })
        }else{
            sql='update cart set qnt=qnt+1 where uid=? and bid=?';
            db.get().query(sql, [uid, bid], function(err){
                res.send('1');
            });
        }
    });
});

//카트목록
router.get('/list.json', function(req, res){ //localhost:5000/cart/list.json?uid=blud&page=1&size=5
    const uid=req.query.uid;
    const page=req.query.page;
    const size=req.query.size;
    //console.log('...............', uid, page, size);
    const sql='call cart_list(?,?,?)';
    db.get().query(sql, [uid, page, size], function(err, rows){
        res.send({list:rows[0], total:rows[1][0].total});
    });
});

//총합계
router.get("/sum", function(req, res){ //localhost:5000/cart/sum?uid=blue
    const uid=req.query.uid;
    const sql='call cart_sum(?)';
    db.get().query(sql, [uid], function(err, rows){
        res.send(rows[0][0]);
    });
});


//장바구니 삭제
router.post("/delete", function(req, res){
    const cid=req.body.cid;
    const sql='delete from cart where cid=?';
    db.get().query(sql, [cid], function(err){
        if(err){
            res.send('0');
        }else{
            res.send('1');
        }
    })
});

//수량변경
router.post("/update", function(req, res){
    const cid=req.body.cid;
    const qnt=req.body.qnt;
    const sql='update cart set qnt=? where cid=?';
    db.get().query(sql, [qnt, cid], function(err){
        if(err){
            res.send('0');
        }else{
            res.send('1');
        }
    })
});

module.exports = router;