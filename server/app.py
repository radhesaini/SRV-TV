from os import access
import subprocess
from flask import Flask, request, jsonify, Response, abort
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from models import Subscribe, User, app
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
        print(e)
        return Response(
        "Invalid User email or password",
        status=404,
        )
    except:
        return Response(
        "Your credentials are not matched",
        status=400,
        )

@app.route('/channels/fetch/<email>', methods=['GET'])
def get_channels(email):
    try:
        res = Subscribe.query.filter_by(email = email).all()
        result = []
        for item in res:
            result.add({c.name: getattr(res, c.name) for c in res.__table__.columns})
        return  jsonify(result)
    except exc.SQLAlchemyError as e:
         return Response(
        "database connectivity error",
        status=502,
        )
    except BaseException as e:
        print(e)
        return Response(
        "Invalid User email or password",
        status=404,
        )
    except:
        return Response(
        "Your credentials are not matched",
        status=400,
        )

@app.route('/channels/fetch_one/<channel_id>', methods=['GET'])
def get_channel(channel_id):
    try:
        res = Subscribe.query.filter_by(channel_id=channel_id).first()
        result = res.toDict()
        if result:
            return {'data': result} 
        else:
            return Response(
        "Invalid chanel id or chanels table is blank",
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

@app.route('/channels/update/<channel_id>', methods=['PUT'])
def update_channels(channel_id):
    try:
        res = Subscribe.query.filter_by(channel_id=channel_id).first()
        result = []
        if res:
            res.data = request.get_json()
            db_session.commit()
            return {'data': request.get_json()} 
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


@app.route('/channels/create', methods=['POST'])
def create_channels():
    try:
        init_db()
    except:
        pass
    data = request.get_json()
    email = data['email']
    channel_id = data['channel_id'] 
    channel_name = data['channel_name']
    owner = data['owner']
    status = data['status'] 
    price = data['price'] 
    u = Subscribe(channel_id=channel_id, email=email, channel_name=channel_name, owner=owner, status=status, price=price)
    try:
        db_session.add(u)
        db_session.commit()
    except Exception as e:
        return Response(
        "A user already registered with this e-mail",
        status=400,
    )
    return Response(u.toDict(), 201)
if __name__ == "__main__":
    app.run(debug=True, port=8000)



