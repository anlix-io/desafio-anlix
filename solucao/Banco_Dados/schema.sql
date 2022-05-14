CREATE DATABASE hospital;
\c hospital;

CREATE TABLE paciente(
	nome char(80),
	idade int,
	cpf char(14) NOT NULL,
	rg char(12),
	data_nasc date,
	sexo char(20),
	signo char(20),
	mae char(80),
	pai char(80),
	email char(100),
	senha char(100),
	peso float,
	tipo_sanguinio char(3),
	cor char(20),
	telefone_fixo char(20),
	telefone char(20),
	PRIMARY KEY(cpf)
);

CREATE TABLE endereco(
	cpf char(14) NOT NULL,
	cep char(9) ,
	endereco char(200),
	numero int,
	bairro char(20),
	cidade char(20),
	estado char(2),
	FOREIGN KEY(cpf) REFERENCES paciente(cpf)
);

CREATE TABLE indice_cardiaco(
	cpf char(14) NOT NULL,
	data_hora timestamp,
	ind_cardiaco float,
	FOREIGN KEY(cpf) REFERENCES paciente(cpf)
);

CREATE TABLE indice_pulmonar(
	cpf char(14) NOT NULL,
	data_hora timestamp,
	ind_pulmonar float,
	FOREIGN KEY(cpf) REFERENCES paciente(cpf)
);