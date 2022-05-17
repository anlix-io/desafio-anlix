from sqlalchemy import create_engine, Column, String, Integer, Date, DateTime, Float
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class Pacientes(Base):
	__tablename__ = 'pacientes'

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

class ConnectionDb():
	def __init__(self):
		self.engine = create_engine('postgresql+psycopg2://michel:1234@c_teste/hospital')
		self.conn = scoped_session(sessionmaker(bind=self.engine))


	def insert_patient(self, patient):
		self.conn.execute(Pacientes.insert(), patient)


	def insert_all_patient(list_patient):
		map(insert_patient, list_patient)
