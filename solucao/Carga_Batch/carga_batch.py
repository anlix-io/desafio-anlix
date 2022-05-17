import os
import json
import connection
import model
from datetime import datetime

PATH_PACIENTES = '/input_data/pacientes.json'
PATH_CARGA_BATCH = os.getcwd()
def insert_record(path_records)
	with open(path_records, 'r') as registros:
	    registros = json.loads(registros.read())
	conn = connection.ConnectionDb()
	for registro in registros:
		paciente = model.Pacientes(
			nome = registro['nome'],
			idade = registro['idade'],
			cpf = registro['cpf'],
			rg = registro['rg'],
			data_nasc = datetime.strptime(registro['data_nasc'],
			 "%d/%m/%Y").strftime("%Y-%m-%d"),
			sexo = registro['sexo'],
			signo = registro['signo'],
			mae = registro['mae'],
			pai = registro['pai'],
			email = registro['email'],
			senha = registro['senha'],
			altura = float(registro['altura'].replace(',','.')),
			peso = registro['peso'],
			tipo_sanguinio = registro['tipo_sanguineo'],
			cor = registro['cor'],
			telefone_fixo = registro['telefone_fixo'],
			telefone = registro['celular']
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
		conn.conn.add(paciente)
		conn.conn.add(endereco)
	conn.conn.commit()
	

