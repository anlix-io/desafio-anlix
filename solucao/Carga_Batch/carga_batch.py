import os
import json
import connection
import model

PATH_PACIENTES = '/input_data/pacientes.json'
PATH_CARGA_BATCH = os.getcwd()

with open(PATH_CARGA_BATCH+PATH_PACIENTES, 'r') as registros:
    registros = json.loads(registros.read())
conn = connection.ConnectionDb()
for registro in registros:
	paciente = model.Pacientes(
		nome = registro['nome'],
		idade = registro['idade'],
		cpf = registro['cpf'],
		rg = registro['rg'],
		data_nasc = registro['data_nasc'],
		sexo = registro['sexo'],
		signo = registro['signo'],
		mae = registro['mae'],
		pai = registro['pai'],
		email = registro['email'],
		senha = registro['senha'],
		tel_fixo = registro['telefone_fixo'],
		celular = registro['celular'],
		altura = registro['altura'],
		peso = registro['peso'],
		tipo_sanguineo = registro['tipo_sanguineo'],
		cor = registro['cor']
		)
	
	endereco = model.Enderecos(
		cpf = registro['cpf'],
		cep = registro['cep'],
		endereco = registro['endereco'],
		numero = registro['numero'],
		bairro = registro['bairro'],
		cidade = registro['cidade'],
		estado = registro['estado']
	)
	print(endereco)

