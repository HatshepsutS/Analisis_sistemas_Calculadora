create database Calculadora_Grafica;
 use Calculadora_Grafica;
 
 create table users (
 idLOGIN INT NOT NULL AUTO_INCREMENT,
 USERNAME VARCHAR(45) NULL ,
 PASSWORD VARCHAR(45) NULL ,
 PRIMARY KEY (idLOGIN) );
 
   INSERT INTO users (USERNAME, PASSWORD) VALUES ('admin', '1234');
   INSERT INTO users (USERNAME, PASSWORD) VALUES ('Cesar', 'elmalvadotinguiriringui');
   INSERT INTO users (USERNAME, PASSWORD) VALUES ('Hannah', '1234');
   INSERT INTO users (USERNAME, PASSWORD) VALUES ('Nani', '1234');
 
 select * from users; 
 
 
 create table ejercicios (
 fk_idLOGIN INT,
 idPregunta int not null auto_increment,
 R_X INT,
 R_signo varchar (2) , 
 R_Constante INT,
 C_X INT,
 C_Y INT,
 C_XSigno varchar (2) , 
 C_YSigno  varchar (2), 
 C_Constante int ,
 primary  KEY (idPregunta),
 constraint fklogin foreign key (fk_idLOGIN) references users (idLOGIN)
 );
 
 
 