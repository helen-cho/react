create table users(
	uid varchar(20) not null primary key,
    upass varchar(200) not null,
    uname varchar(20) not null,
    address1 varchar(500),
    address2 varchar(500),
    phone varchar(20),
    photo varchar(200),
    regDate datetime default now()
);

insert into users(uid, upass, uname)
values('blue','pass','이블루');
insert into users(uid, upass, uname)
values('red','pass','김레드');
insert into users(uid, upass, uname)
values('green','pass','최그린');

select * from users;

update users 
set phone='010-2020-3030', 
address1='인천 서구 경서동 동문아파트',
address2 ='516-1801' 
where uid='green';


update users set photo=null where uid >'';

drop table books;
create table books(
	bid int auto_increment primary key,
    title varchar(500) not null,
    price int default 0,
    contents text,
    isbn varchar(100),
    publisher varchar(100),
    image varchar(200),
    author varchar(200),
    regDate datetime default now()
);

desc books;

select * from books order by bid desc;
select count(*) from books;

select *,date_format(regdate,'%Y-%m-%d') fmtdate,format(price,0) fmtprice
from books
order by bid desc
limit 0, 5;

alter table books add column updateDate datetime;
alter table books add column bigimage varchar(200);

desc books;

create table likes(
	uid varchar(20) not null,
    bid int not null,
    regDate datetime default now(),
    primary key(uid, bid),
    foreign key(uid) references users(uid),
    foreign key(bid) references books(bid)
);

select * from likes;

select *,date_format(regdate,'%Y-%m-%d') fmtdate,format(price,0) fmtprice,
(select count(*) from likes where books.bid=likes.bid) lcnt,
(select count(*) from likes where books.bid=likes.bid and uid='green') ucnt
from books
where bid=112;


create table review(
	rid int auto_increment primary key,
    bid int not null,
    uid varchar(20) not null,
    contents text not null,
    regdate datetime default now(),
    foreign key(bid) references books(bid),
    foreign key(uid) references users(uid)
);

desc review;

select * from review;
select * from users;

drop view view_review;
create view view_review as
select r.*, u.uname, u.photo, date_format(r.regdate,'%Y-%m-%d %T') fmtdate
from review r, users u
where r.uid=u.uid;

select * from view_review
where bid=113
order by rid desc
limit 0, 3;

select *,date_format(regdate,'%Y-%m-%d') fmtdate,format(price,0) fmtprice,
(select count(*) from likes where books.bid=likes.bid) lcnt,
(select count(*) from likes where books.bid=likes.bid and uid='green') ucnt,
(select count(*) from review where books.bid=review.bid) rcnt
from books
order by bid desc
limit 0, 6;


drop table cart;
create table cart(
	uid varchar(20) not null,
    bid int not null,
    qnt int default 1,
    regDate datetime default now(),
    primary key(uid, bid),
    foreign key(uid) references users(uid),
    foreign key(bid) references books(bid)
);

desc cart;

drop view view_cart;
create view view_cart as
select c.*, b.title, b.image , b.price, format(b.price,0) fmtprice
from cart c, books b
where c.bid=b.bid;

select * from view_cart;

/*주문자 정보*/
create table purchase( 
	pid char(13) not null primary key,
    uid varchar(20) not null,
    uname varchar(20) not null,
    phone varchar(20) not null,
    address1 varchar(500) not null,
    address2 varchar(500) not null,
    pdate datetime default now(),
    sum int default 0,
    status int default 0, /*0:결제대기,1:결제확인,2:배송준비,3:배송완료, 4.주문완료*/
    foreign key(uid) references users(uid)
);

/*주문상품 정보*/
create table orders(
	pid char(13) not null,
    bid int not null,
    price int default 0,
    qnt int default 0,
    primary key(pid, bid),
    foreign key(pid) references purchase(pid),
    foreign key(bid) references books(bid)
);

select *,date_format(pdate,'%Y-%m-%d %T') as fmtdate,
format(sum,0) fmtsum
from purchase where uid='green';

select o.*, b.title, b.image 
from orders o, books b
where o.bid=b.bid and pid='00ba8e59-cdcc';

select * from users;
insert into users(uid, upass, uname)
values('admin', 'pass', '관리자');
 
 
select *, 
date_format(pdate,'%Y-%m-%d %T') as fmtdate,
format(sum,0) fmtsum
from purchase
where uname like '%최%'
order by pdate desc
limit 0, 5;


select * from users where uid='red';
select *, date_format(regdate,'%Y-%m-%d %T') as fmtdate from users;

select *,date_format(regdate,'%Y년%m월%d일 %T') as fmtdate 
from users
where uid='hong';

desc users;

insert into users(uid,upass,uname)
values('hong','pass','홍길동');



update users
set uname='박병준',address1='인천',address2='213-1104',phone='010-1010-1010'
where uid='kim';


delete from users
where uid='hong';

desc users;


select count(*) as total from users;
select * from users
where address1 like concat('%', '', '%');

create table bbs(
	bid int auto_increment primary key,
    title varchar(500) not null,
    contents text,
    uid varchar(20) not null,
    regDate datetime default now(),
    foreign key(uid) references users(uid)
);

desc bbs;
insert into bbs(title, uid)
values('Spring의 이유와 목적 그리고 필요성에 대한 이야기','red');
insert into bbs(title, uid)
values('Spring이란 무엇인가?','red');
insert into bbs(title, uid)
values('Spring은 어떻게 탄생했을까?','red');
insert into bbs(title, uid)
values('Spring은 어떤 기능을 제공할까?','red');
insert into bbs(title, uid)
values('Spring에서 DI나 AOP와 같은 핵심 요소는 무엇이 있을까?','blue');
insert into bbs(title, uid)
values('Spring은 어떻게 동작하는 걸까?','green');
insert into bbs(title, uid)
values('Spring(스프링)을 한 줄로 정의한다면?','blue');


insert into bbs(title, uid)
select title,uid from bbs;

select count(*) from bbs;

drop view view_bbs;
create view view_bbs as
select b.*, u.uname, u.photo
from bbs b, users u
where b.uid=u.uid;

select *,date_format(regdate,'%Y년%m월%d일 %T') as fmtdate 
from view_bbs
where uname like '%레드%'
order by bid desc
limit 0, 5;

select * from users;
update bbs
set contents='내용입니다.'
where bid>0;
select * from view_bbs;

alter table bbs
add column viewcnt int default 0;

desc bbs;


select bid, viewcnt from bbs where bid=250;

create table reply(
	rid int auto_increment primary key,
    bid int not null,
    uid varchar(20) not null,
    regDate datetime default now(),
    contents text,
    foreign key(bid) references bbs(bid),
    foreign key(uid) references users(uid)
);

desc reply;

select * from reply;

insert into reply(bid, uid, contents)
select bid, uid, contents from reply;

select count(*) from reply;

drop view view_reply;

drop view view_reply;

create view view_reply as
select r.*,u.uname, u.photo, 
date_format(r.regdate,'%Y년%m월%d일 %T') as fmtdate,
date_format(r.updatedate,'%Y년%m월%d일 %T') as fmtupdate
from reply r, users u
where r.uid=u.uid;

select * from view_reply
where bid=252
order by rid desc
limit 0, 5;

alter table reply
add column updateDate datetime;

desc reply;
desc view_reply;

desc bbs;

alter table bbs
add column replycnt int default 0;

update bbs
set replycnt=(select count(*) from reply where bbs.bid=reply.bid)
where bid > 0;

alter table reply
add column rating int default 0;

desc reply;
desc view_reply;

update reply
set rating=3
where bid>0;

select rid, rating from reply order by rid desc;




select * from users;
update users
set photo=null
where uid > '';


select * from users where uid='red';

update users
set photo='/upload/photo/a01.png'
where uid='red';

desc users;

create table messages(
	mid int auto_increment primary key,
    sender varchar(20) not null,
    receiver varchar(20) not null,
    message text,
    sendDate datetime default now(),
    readDate datetime,
    foreign key(sender) references users(uid),
    foreign key(receiver) references users(uid)
);

desc messages;

desc users;

alter table users
add column point int default 0;

select * from messages;
select uid, point from users
where uid='red';



/*보낸메시지*/
select m.*, u.uname, u.photo
from messages m, users u
where m.receiver=u.uid and mid=1;

/*받은메시지*/
select m.*, u.uname, u.photo
from messages m, users u
where m.sender=u.uid and mid=1;

select * from messages;



/*보낸메시지목록*/
select m.*, u.uname
from messages m, users u
where sender='blue' and u.uid=m.receiver
order by mid desc; 

/*받은메시지목록*/
select m.*, u.uname
from messages m, users u
where receiver='red' and u.uid=m.sender
order by mid desc; 

select * from users;
desc messages;

alter table messages
add column sendDelete int default 0;

alter table messages
add column receiveDelete int default 0;

select * from messages
where (sender='red' and sendDelete=1)
or (receiver='red' and receiveDelete=1);


create table account(
	ano char(4) primary key not null,
    uid varchar(20),
    openDate datetime default now(),
    balance double default 0,
    foreign key(uid) references users(uid)
);
desc account;

create table trade(
	tid int auto_increment primary key,
	ano char(4) not null,
    tno char(4) not null,
    amount double,
    tradeDate datetime default now(),
    type int default 1, /*1:입금 -1:출금 */
    foreign key(ano) references account(ano),
    foreign key(tno) references account(ano)
);






