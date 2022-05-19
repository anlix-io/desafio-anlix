from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

class ConnectionDb():
	def __init__(self):
		self.engine = create_engine('postgresql+psycopg2://anlix:1234@db/hospital')
		self.conn = scoped_session(sessionmaker(bind=self.engine))
