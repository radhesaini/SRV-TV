from flask import Flask
# from app import db
from sqlalchemy import Column, Integer, String, DateTime, inspection
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.sql import func
from database import db_session, Base
from dotenv import load_dotenv
import pymysql
pymysql.install_as_MySQLdb()
load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
DB_HOST = os.getenv('HOST')
DB_USER = os.getenv('USER')
DB_PASSWD = os.getenv('PASSWORD')
DB_DNAME = os.getenv("DATABASE")

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://'+ DB_USER + ':' + DB_PASSWD + '@' + DB_HOST + '/' + DB_DNAME
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    __tablename__ = 'users'
    email = Column(String(255), unique=True, nullable=False, primary_key=True)
    first_name = Column(String(30), nullable=False)
    last_name = Column(String(30), nullable=False)
    dob = Column(DateTime, nullable=False, default=func.now())
    address = Column(String(5000), nullable=False)
    contect = Column(String(15), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    created_on = Column(DateTime, server_default=func.now())
    updated_on = Column(DateTime, onupdate=func.now(), server_default=func.now())

    def __init__(self, first_name, last_name, email, dob, address, contect, password):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.address = address
        self.contect = contect
        self.password = password
        self.dob = dob   
        
    def toList(self):
        return [{c.name: getattr(self, c.name)} for c in self.__table__.columns if c.name !='password']

    def toDict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns  if c.name !='password'}

class Subscribe(db.Model):
    __tablename__ = 'channels'
    channel_id = Column(Integer(), unique=True, nullable=False, primary_key=True)
    email = Column(String(255), nullable=False)
    channel_name = Column(String(30), nullable=False)
    owner = Column(String(30), nullable=False)
    price =  Column(Integer(), nullable=False)
    paused_on = Column(String(30), nullable=True ,server_default=None)
    status = Column(String(30), nullable=True ,server_default=None)
    subcribed_on = Column(String(30), nullable=True ,server_default=None)
    unsubscribed_on = Column(String(30), server_default=None, nullable=True)

    def __init__(self, channel_id, email, channel_name, owner, price):
        self.channel_id = channel_id
        self.email = email
        self.channel_name = channel_name
        self.owner = owner
        self.status = None
        self.price = price
        self.paused_on = None
        self.subcribed_on = None
        self.unsubscribed_on = None

    def toList(self):
        return [{c.name: getattr(self, c.name)} for c in self.__table__.columns ]

    def toDict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}