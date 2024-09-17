create type SEVERITY as enum ('low', 'moderate', 'critical');


create table if not exists CrisisReports
(
id serial primary key,
created_at timestamp default now() not null,
location varchar(250) not null,
severity SEVERITY not null default 'low',
name varchar(100),
incident text not null
);
