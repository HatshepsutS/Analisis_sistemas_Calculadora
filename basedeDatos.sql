drop database Calculadora_Grafica;
create database Calculadora_Grafica;
use Calculadora_Grafica;

 create table users (
 USERNAME VARCHAR(45) not NULL ,
 PASSWORD VARCHAR(45) NULL ,
 PRIMARY KEY (USERNAME) );
 
   INSERT INTO users (USERNAME, PASSWORD) VALUES ('admin', '1234');
   INSERT INTO users (USERNAME, PASSWORD) VALUES ('Cesar', 'elmalvadotinguiriringui');
   INSERT INTO users (USERNAME, PASSWORD) VALUES ('Hannah', '1234');
   INSERT INTO users (USERNAME, PASSWORD) VALUES ('Nani', '1234');


 create table ejercicios (
 fk_USERNAME VARCHAR(45) not NULL,
 idPregunta int not null auto_increment,
 Nombre_pregunta VARCHAR(100) not NULL,
 R_X INT,
 R_signo varchar (2) , 
 R_Constante INT,
 C_X INT,
 C_Y INT,
 C_XSigno varchar (2) , 
 C_YSigno  varchar (2), 
 C_Constante int ,
 Coordenadas varchar (45),
 primary  KEY (idPregunta),
 constraint fklogin foreign key (fk_USERNAME) references users (USERNAME)
 );

INSERT INTO ejercicios (fk_USERNAME, Nombre_pregunta,R_X,R_signo,R_Constante,C_X, C_Y,C_XSigno,C_YSigno,C_constante,Coordenadas) values('admin','PreguntaP1','2','1','2','3','3','2','1','1','(0,0)' ); 
INSERT INTO ejercicios (fk_USERNAME, Nombre_pregunta,R_X,R_signo,R_Constante,C_X, C_Y,C_XSigno,C_YSigno,C_constante,Coordenadas) values('admin','PreguntaP2','2','1','2','3','3','2','1','1','(0,0)' ); 


select * from  ejercicios;
select idPregunta, Nombre_pregunta, R_X, R_signo,R_Constante, C_X, C_Y, C_XSigno, C_Constante, Coordenadas from ejercicios where fk_USERNAME='admin';
select idPregunta, Nombre_pregunta, R_X, R_signo,R_Constante, C_X, C_Y, C_XSigno, C_Constante, Coordenadas from ejercicios where fk_USERNAME='admin'