
-- ALTER table employee RENAME column "userName" to username ;


-- TRUNCATE table employee CASCADE ;


insert into employee (phonenumber, name ,username)
VALUES ('123456789','ihesami','ihesami'),
('012345678','MM80','MM80')
;


-- select * from employee;

-- alter table freelancer RENAME column "userName" to username;


insert into freelancer (name,phonenumber,username) VALUES
('Rey','234567890','Morrallow')
;

-- select * from freelancer;

-- alter table project add column title varchar(60) ;

insert into project (employeeid,title) VALUES
(5,'React App'),
(6,'Ai Project');

