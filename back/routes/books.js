var express = require('express');
var router = express.Router();
var db = require('../db');
var multer = require('multer');

//도서이미지 업로드
var upload = multer({
    storage: multer.diskStorage({
        destination:(req, file, done)=>{
            done(null, './public/upload/book')
        },
        filename:(req, file, done)=>{
            var fileName=Date.now() + '.jpg';
            done(null, fileName);
        }
    })
}); 

//도서이미지업로드
router.post('/update/image', upload.single('file'), function(req, res){
    const filename='/upload/book/' + req.file.filename;
    const bid=req.body.bid;
    const sql='update books set image=?, regdate=now() where bid=?';
    db.get().query(sql, [filename, bid], function(err){
        if(err){
            res.send('0');
        }else{
            res.send('1');
        }
    });
});

//도서목록
router.get('/list.json', function(req, res){ //localhost:5000/books/list.json?query=&page=1&size=5
    const query=req.query.query;
    const page=parseInt(req.query.page);
    const size=parseInt(req.query.size);
    const uid = req.query.uid ? req.query.uid : '';
    const sql ='call book_list(?,?,?,?)';
    db.get().query(sql, [query, page, size, uid], function(err, rows){
        if(err) {
            console.log('도서목록 오류: ', err)
        }else {
            //console.log(rows);
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
        if(err) console.log('err1............', err);
        if(rows.length > 0) {
            res.send('1');
        }else{
            sql='insert into books(title,price,authors,contents,publisher,image,isbn) values(?,?,?,?,?,?,?)';
            db.get().query(sql, [title,price,authors,contents,publisher,image,isbn], function(err){
                if(err) console.log('err2................', err);
                res.send('0');
            });
        }
    });
});

//도서삭제
router.post('/delete', function(req, res){
    const bid = req.body.bid;
    const sql='delete from books where bid=?';
    db.get().query(sql, [bid], function(err){
        if(err){
            res.send('0');
        }else{
            res.send('1');
        }
    })
});

//도서정보
router.get('/read/:bid', function(req, res) { //localhost:5000/books/read/166
    const bid=req.params.bid;
    const sql='call book_read(?)';
    db.get().query(sql, [bid], function(err, rows){
        res.send(rows[0][0]);
    });
});

//도서정보수정
router.post('/update', function(req, res){
    const bid=req.body.bid;
    const title=req.body.title;
    const price=req.body.price;
    const authors=req.body.authors;
    const publisher=req.body.publisher;
    const contents=req.body.contents;
    const sql='update books set title=?,price=?,authors=?,publisher=?,contents=?,regdate=now() where bid=?';
    db.get().query(sql,[title,price,authors,publisher,contents,bid],function(err){
        if(err){
            res.send('0');
        }else{
            res.send('1');
        }
    });
})
module.exports = router;