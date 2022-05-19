import os
import json
import connection
import model
from datetime import datetime

PATH_PACIENTES = '/input_data/pacientes.json'
PATH_CARDIACOS = '/input_data/indice_cardiaco/'
PATH_PULMONAR = '/input_data/indice_pulmonar/'
PATH_CARGA_BATCH = os.getcwd()


def insert_record(path_records, connection):
	with open(path_records, 'r') as registros:
	    registros = json.loads(registros.read())
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
		conn.conn.commit()
		conn.conn.add(endereco)
		conn.conn.commit()


def insert_cardiaco(path_Cardiaco, connection):
	for i in os.listdir(path_Cardiaco):
		with open(path_Cardiaco+i, 'r') as registros:
		    registros = registros.read().split()
		    for indice in range(1,int(len(registros)/3)):
		    	indice = indice*3
		    	dados = registros[indice: indice+3]
		    	registro = model.Indice_Cardiaco(
		    		cpf = dados[0],
		    		data_hora = datetime.fromtimestamp(int(dados[1])).
		    							strftime('%Y-%m-%d %H:%M:%S'),
		    		ind_cardiaco = float(dados[2])
		    		)
		    	conn.conn.add(registro)
		    conn.conn.commit()


def insert_pulmonar(path_Pulmonar, connection):
	for i in os.listdir(path_Pulmonar):
		with open(path_Pulmonar+i, 'r') as registros:
		    registros = registros.read().split()
		    for indice in range(1,int(len(registros)/3)):
		    	indice = indice*3
		    	dados = registros[indice: indice+3]
		    	registro = model.Indice_Pulmonar(
		    		cpf = dados[0],
		    		data_hora = datetime.fromtimestamp(int(dados[1])).
		    							strftime('%Y-%m-%d %H:%M:%S'),
		    		ind_pulmonar = float(dados[2])
		    		)
		    	conn.conn.add(registro)
		    conn.conn.commit()

conn = connection.ConnectionDb()
insert_record(PATH_CARGA_BATCH+PATH_PACIENTES, conn)
insert_cardiaco(PATH_CARGA_BATCH+PATH_CARDIACOS, conn)
insert_pulmonar(PATH_CARGA_BATCH+PATH_PULMONAR, conn)

