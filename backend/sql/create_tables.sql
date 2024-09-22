create type SEVERITY as enum ('low', 'moderate', 'critical');


create table if not exists Users
(
id serial primary key,
created_at timestamp default now() not null,
name varchar(100) not null,
phone char(11) not null unique,
password varchar(250) not null,
is_admin boolean not null default false,
is_verified boolean not null default (false),
session char(36) unique
);

create table if not exists CrisisReports
(
id serial primary key,
created_at timestamp default now() not null,
is_resolved boolean default false not null,
location varchar(250) not null,
severity SEVERITY not null default 'low',
name varchar(100),
incident text not null,
user_id int references users (id) 
);

create table if not exists Donations
(
id serial primary key,
created_at timestamp default now() not null,
amount decimal not null,
donor_name varchar(250),
donor_address varchar(250)
);

create table if not exists Inventory
(
id serial primary key,
created_at timestamp default now() not null,
product_name varchar(100) not null,
available_qantity int not null default 0,
unit_price decimal not null
);

create table if not exists purchase_orders
(
id serial primary key,
created_at timestamp default now() not null,
inventory_id int references Inventory(id),
quantity int not null
);

