from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
import pymysql
pymysql.install_as_MySQLdb()
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv('HOST')
DB_USER = os.getenv('USER')
DB_PASSWD = os.getenv('PASSWORD')
DB_DNAME = os.getenv("DATABASE")

# 'mysql://username:password@localhost/db_name'
engine = create_engine('mysql://'+ DB_USER + ':' + DB_PASSWD + '@' + DB_HOST + '/' + DB_DNAME)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    import models
    Base.metadata.create_all(bind=engine)

