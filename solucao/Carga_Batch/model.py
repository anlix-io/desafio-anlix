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
	tel_fixo = Column(String)
	celular = Column(String)
	altura = Column(Float)
	peso = Column(Float)
	tipo_sanguineo = Column(String)
	cor = Column(String)

class Enderecos(Base):
	__tablename__ = 'endereco'

	id = Column(String, primary_key=True , autoincrement=True)
	cpf = Column(String, primary_key=True)
	cep = Column(String)
	endereco = Column(String)
	numero = Column(Integer)
	bairro = Column(String)
	cidade = Column(String)
	estado = Column(String)


