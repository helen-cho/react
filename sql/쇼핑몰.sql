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
