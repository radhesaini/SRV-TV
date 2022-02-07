from os import access
import subprocess
from flask import Flask, request, jsonify, Response, abort
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from models import User, app
from database import db_session, init_db
from sqlalchemy import exc

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'secret'

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route("/users/register", methods=['POST'])
def register():
    try:
        init_db()
    except:
        pass
    data = request.get_json()["data"]
    email = data['email']
    first_name = data['first_name']
    last_name = data['last_name']
    address = data['address']
    contect = data['contect']
    password = bcrypt.generate_password_hash(data['password'])
    dob = data['dob'] 
    u = User(first_name, last_name, email, dob, address, contect, password)
    try:
        db_session.add(u)
        db_session.commit()
    except Exception as e:
        return Response(
        "A user already registered with this e-mail",
        status=400,
    )
    return Response(u.toDict(), 201)

@app.route('/users/login', methods=['POST'])
def login():
    data = request.get_json()
    result=''
    try:
        res=User.query.filter_by(email=str(data["email"])).first()
        result = res.toDict()
        if bcrypt.check_password_hash(res.password, data['password']):
            return {"user_token": create_access_token(identity=result), 'data': result}
        else:
            return Response(
        "Invalid User email or password",
        status=404,
        )
    except exc.SQLAlchemyError as e:
         return Response(
        "database connectivity error",
        status=502,
        )
    except BaseException as e:
        return Response(
        "Invalid User email or password",
        status=404,
        )
    except:
        return Response(
        "Your credentials are not matched",
        status=400,
        )

if __name__ == "__main__":
    app.run(debug=True, port=8000)



