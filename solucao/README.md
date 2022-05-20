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

## Carga Batch
### Objetivo
Criar um sistema automático de apoio para carregar o banco de dados.

### Utilização
Dentro da pasta Carga batch, existe uma pasta chamada input_data, dentro da pasta deve ser adicionado um arquivo json com os pacientes, uma pasta com os arquivos com os dados cardíacos e uma pasta com os arquivos com dados pulmonares.

## EndPoints:
### GET ‘/’
Informa se a API está online.
#### URL
 http://localhost:21262/

### GET ‘/HeartFeature’
Retorna o índice cardíaco mais recente para um paciente.
#### URL
 http://localhost:21262/HeartFeature/:cpf
#### Parâmetros
CPF: CPF do paciente.

## GET ‘/LungFeature’
Retorna o índice pulmonar mais recente para um paciente.
### URL
 http://localhost:21262/LungFeature/:cpf
### Parâmetros
CPF: CPF do paciente. 

## GET ‘/AllLastFeatures’
Retorna o índice cardíaco e o índice pulmonar mais recente para um paciente.
### URL
 http://localhost:21262/AllLastFeatures/:cpf
### Parâmetros
CPF: CPF do paciente. 

## GET ‘/allIndicesForData’
Retorna todas as características de todos os pacientes para um determinado dia (dd-mm-yyyy).
### URL
 http://localhost:21262/allIndicesForData
### Parâmetros
data: Um dia no formato dd-mm-yyyy.

## GET ‘/CharacteristicBetweenDates’
Retorna todos os registros de uma característica  para um dado paciente em um intervalo de tempo específico. 
### URL
 http://localhost:21262/CharacteristicBetweenDates
### Body
{“cpf”: “cpf_paciente”,
“caracteristica”: "cardiaco" ou “pulmonar”,
“data_inicial”: “dd-mm-yyyy”,
“data_final”: “dd-mm-yyyy”
}


## GET ‘/allIndicesForData’
Retorna todas as características de todos os pacientes para um determinado dia (dd-mm-yyyy).
### URL
 http://localhost:21262/allIndicesForData
### Parâmetros
data: Um dia no formato dd-mm-yyyy.

## GET ‘/LastCharacteristicBetweenDates’
Retorna  o último registro de uma característica  para um dado paciente em um intervalo de tempo específico. 
### URL
 http://localhost:21262/CharacteristicBetweenDates
### Body
{“cpf”: “cpf_paciente”,
“caracteristica”: "cardiaco" ou “pulmonar”,
“data_inicial”: “dd-mm-yyyy”,
“data_final”: “dd-mm-yyyy”
}


## GET ‘/ConsultPatientByName’
Retorna todos os pacientes que contenham um nome ou parte de um nome.
### URL
 http://localhost:21262/ConsultPatientByName
### Body
{
“nome”: “nome”
}

