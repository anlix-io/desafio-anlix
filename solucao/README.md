# Visão geral sobre os micro serviços do desafio

- Um banco de dados com foco em consultas.
- Um serviço que alimenta o banco de dados com novos dados e forma automática. 
- Um serviço para a API. Recebe as requisições, faz as consultas no Banco e devolve os dados.
- Um serviço front end.

## Banco de dados
### Motivo:
 É o banco de dados que eu tenho mais familiaridade.
 
### Estrutura:
O Banco vai possuir 4 colunas.
- Paciente
- endereço
- indice_cardiaco 
- indice_pulmonar

Um paciente possui um único endereço.
Um paciente possui muitos índices cardíacos.
Um paciente possui muitos índices pulmonares.
Um endereço pertence a apenas uma paciente.
Um índice cardíaco pertence a apenas um paciente.
Um índice pulmonar pertence a apenas um paciente.

## Tabelas:
	paciente:
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
	
	endereco:
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

	indice_cardiaco:
	id serial,
	cpf char(14) NOT NULL,
	data_hora timestamp,
	ind_cardiaco float,
	PRIMARY KEY(id),
	FOREIGN KEY(cpf) REFERENCES paciente(cpf)

	indice_pulmonar:
	id serial,
	cpf char(14) NOT NULL,
	data_hora timestamp,
	ind_pulmonar float,
	PRIMARY KEY(id),
	FOREIGN KEY(cpf) REFERENCES paciente(cpf)
