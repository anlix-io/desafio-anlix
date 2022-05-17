from sqlalchemy import Column, String, Integer, Date, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Pacientes(Base):
	__tablename__ = 'paciente'

	nome = Column(String)
	idade = Column(Integer)
	cpf = Column(String, primary_key=True)
	rg = Column(String)
	data_nasc = Column(Date)
	sexo = Column(String)
	signo = Column(String)
	mae = Column(String)
	pai = Column(String)
	email = Column(String)
	senha = Column(String)
	altura = Column(Float)
	peso = Column(Float)
	tipo_sanguinio = Column(String)
	cor = Column(String)
	telefone_fixo = Column(String)
	telefone = Column(String)
	endereco = relationship("Enderecos")
	endereco = relationship("Indice_Cardiaco")


class Enderecos(Base):
	__tablename__ = 'endereco'

	id = Column(Integer, primary_key=True)
	cpf = Column(String, ForeignKey('paciente.cpf'))
	cep = Column(String)
	endereco = Column(String)
	numero = Column(Integer)
	bairro = Column(String)
	cidade = Column(String)
	estado = Column(String)

class Indice_Cardiaco:
	__tablename__ = 'indice_cardiaco'

	id = Column(Integer, primary_key=True)
	cpf = Column(String, ForeignKey('paciente.cpf'))
	data_hora = Column(DateTime)
	ind_cardiaco = Column(Float)

class Indice_Pulmonar:
	__tablename__ = 'indice_pulmonar'

	id = Column(Integer, primary_key=True)
	cpf = Column(String, ForeignKey('paciente.cpf'))
	data_hora = Column(DateTime)
	ind_pulmonar = Column(Float)
