create type SEVERITY as enum ('low', 'moderate', 'critical');
create type CRISIS_STATUS as enum('reported','checking','responding','resolved')

create table if not exists CrisisReports
(
id serial primary key,
created_at timestamp default now() not null,
status CRISIS_STATUS not null default 'reported',
location varchar(250) not null,
severity SEVERITY not null default 'low',
name varchar(100),
incident text not null
);

create table if not exists Donations
(
id serial primary key,
created_at timestamp default now() not null,
amount decimal not null,
donor_name varchar(250),
donor_address varchar(250)
);

create table if not exists Users
(
id serial primary key,
created_at timestamp default now() not null,
email varchar(250) not null unique,
password varchar(250) not null,
is_admin boolean not null default false
);



 