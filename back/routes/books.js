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

//도서등록
router.post('/insert', function(req, res){
    const title=req.body.title;
    const price=req.body.price;
    const authors=req.body.authors;
    const contents=req.body.contents;
    const publisher=req.body.publisher;
    const image = req.body.thumbnail;
    const isbn=req.body.isbn;
    let sql='select * from books where isbn=?';
    db.get().query(sql, [isbn], function(err, rows){
        if(rows.length > 0) {
            res.send('1');
        }else{
            sql='insert into books(title,price,authors,contents,publisher,image,isbn) values(?,?,?,?,?,?,?)';
            db.get().query(sql, [title,price,authors,contents,publisher,image,isbn], function(err){
                res.send('0');
            });
        }
    });
});

module.exports = router;