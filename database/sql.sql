create database travel_agency charset latin1 collate latin1_spanish_ci;
use travel_agency;
create table users (id int auto_increment not null, usuario varchar(45) not null, email varchar(45) not null, password varchar(80) not null, hash varchar(80), primary key(id));
