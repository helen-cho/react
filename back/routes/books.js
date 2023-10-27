var express = require('express');
var router = express.Router();
var db = require('../db');

//도서목록
router.get('/list.json', function(req, res){ //localhost:5000/books/list.json?query=&page=1&size=5
    const query=req.query.query;
    const page=parseInt(req.query.page);
    const size=parseInt(req.query.size);
    const sql ='call books(?,?,?)';
    db.get().query(sql, [query, page, size], function(err, rows){
        if(err) {
            console.log('도서목록 오류: ', err)
        }else {
            console.log(rows);
            res.send({list: rows[0], total:rows[1][0].total});
        }
    });
});

module.exports = router;