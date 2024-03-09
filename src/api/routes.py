"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

# Crear la blueprint para la API
api = Blueprint('api', __name__)

# Permitir solicitudes CORS a esta API
CORS(api)


#-------------------------------- Metodo POST para crear usuarios ---------------------------------------------------------------#
@api.route("/signup", methods=["POST"])
def create_user():

    request_data = request.get_json()

    if not 'email' in request_data:
        return jsonify({"error": "The email is not present"}), 400
    
    if not('password' in request_data):
        return jsonify({"error": "The password is not present"}), 400

    email = request_data['email']
    password = request_data['password']
    
    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit() 

    response_body = {
        "message": "The user was created without problem "
    }

    return jsonify(response_body), 200
#------------------------------------------------------------------------------------------------------------------------------#

#-------------------------------- Metodo POST para crear TOKEN ---------------------------------------------------------------#
#Fragmento de codigo para generar token 
@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).first()  # Consultar la base de datos por el nombre de usuario y la contraseña

    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401 # el usuario no se encontró en la base de datos
    
    
    access_token = create_access_token(identity=user.id) # Crear un nuevo token con el id de usuario dentro
    return jsonify({ "token": access_token, "user_id": user.id })
#------------------------------------------------------------------------------------------------------------------------------#


@api.route("/private", methods=["GET"]) # Protege una ruta con jwt_required, bloquea las peticiones sin un JWT válido
@jwt_required()
def protected():
    
    current_user_id = get_jwt_identity() # Accede a la identidad del usuario actual con get_jwt_identity
    user = User.query.get(current_user_id)
    if user is None: 
        raise APIException("Usuario no encontrado", status_code= 404)
    return jsonify("Usuario autenticado"), 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


app.register_blueprint(api, url_prefix='/api')



if __name__ == '__main__':
    app.run()

