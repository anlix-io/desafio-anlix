CREATE DATABASE hospital;
\c hospital;

CREATE TABLE paciente(
	nome char(100),
	idade int,
	cpf char(14) NOT NULL,
	rg char(12),
	data_nasc date,
	sexo char(30),
	signo char(30),
	mae char(100),
	pai char(100),
	email char(100),
	senha char(100),
	altura float,
	peso float,
	tipo_sanguinio char(3),
	cor char(30),
	telefone_fixo char(30),
	telefone char(30),
	PRIMARY KEY(cpf)
);

CREATE TABLE endereco(
	id serial,
	cpf char(14) NOT NULL,
	cep char(20) ,
	endereco char(200),
	numero int,
	bairro char(100),
	cidade char(100),
	estado char(2),
	PRIMARY KEY(id),
	FOREIGN KEY(cpf) REFERENCES paciente(cpf)
);

CREATE TABLE indice_cardiaco(
	id serial,
	cpf char(14) NOT NULL,
	data_hora timestamp,
	ind_cardiaco float,
	PRIMARY KEY(id),
	FOREIGN KEY(cpf) REFERENCES paciente(cpf)
);

CREATE TABLE indice_pulmonar(
	id serial,
	cpf char(14) NOT NULL,
	data_hora timestamp,
	ind_pulmonar float,
	PRIMARY KEY(id),
	FOREIGN KEY(cpf) REFERENCES paciente(cpf)
);