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
	nome: char(80)
	idade: int
	cpf : char(14) Primary Key
	rg: char(12)
	data_nasc: date
	sexo: char(20)
	signo: char(20)
	mãe: char(80)
	pai: char(80)
	email: char(100)
	senha: char(100)
	peso: float
	tipo_sanguinio: char(3)
	cor: char(20)
	telefone_fixo: char(20)
	telefone: char(20)
	
	endereco:
	cpf: Primarey Key
	cep: char(9)
	endereco: char(200)
	numero: int
	bairro: char(20)
	cidade: char(20)
	estado: char(2)

	indice_cardiaco:
	cpf: Primarey Key
	data_hora: timestemp
	ind_pulm: float

	indice_pulmonar:
	cpf: Primarey Key
	data_hora: timestemp
	ind_pulm: float
