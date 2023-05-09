"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Role, Comment, Song, Project
from api.utils import generate_sitemap, APIException
from api.firebase.firebase import Bucket

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

    #Comieza mis endpoints


@api.route("/user", methods=["POST"])
def register():
    body = request.json
    username = body.get("username", None)
    artist_name = body.get("artist_name", None)
    email = body.get("email", None)
    password = body.get("password", None)
    role = body.get("role", None)   
    is_active = True
    print("*****")
    print(body)
    if username is None or artist_name is None or email is None or password is None or role is None:
        return {"error": "todos los campos son requeridos"}, 400    

    if role not in Role.__members__:
        return {"error": f"{role} No existe en los roles disponibles"}

    user_hash = generate_password_hash(password)
        
    new_user = User(username=username,  artist_name=artist_name, email=email, password=user_hash, role=role, is_active=is_active)
    db.session.add(new_user)
    try:
        db.session.commit()
        return jsonify({"msg": "Usuario creado"})
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": error})     


@api.route("/user/login", methods=["POST"])
def login():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)
    print(email, password)
    if email is None or password is None:
        return {"error": "Todos los campos son requeridos"}, 400

    login_user = User.query.filter_by(email=email).first()

    if not login_user:
        return {"error": "Usuario no encontrado"}, 401

    if check_password_hash(login_user.password, password):
        token = create_access_token({"id": login_user.id})
        print(token)
        return jsonify({"access_token": token, "artist_name": login_user.artist_name})
    else:
        return jsonify({"error": "Contrasena incorrecta"}), 401


@api.route("/change-password", methods=["PUT"])
def change_password():
    body = request.json
    email = body.get("email", None)
    new_password = body.get("new_password", None)
    old_password = body.get("old_password", None)

    if not email or not old_password or not new_password:
        return {"error": "Todos los campos son requeridos"}

    update_user = User.query.filter_by(email=email).first()

    if not update_user:
        return {"error": "usuario no encontrado"}, 404

    if check_password_hash(update_user.password, old_password):
        hash_password = generate_password_hash(new_password)
        update_user.password = hash_password
        db.session.commit()
        return "cambiando contrasena"
    
    return {"error": "Contrasena invalida"}



@api.route("/projects", methods=["POST"])
@jwt_required()
def create_project():
    body = request.json
    title = body.get("title", None)
    version = body.get("version", None)
    user_data = get_jwt_identity()
    user_id = user_data["id"]

    project = Project(title=title, version=version, user_id=user_id)
    db.session.add(project)
    try:

        db.session.commit()
        return jsonify(project.serialize())
    except Exception as error: 
        db.session.rollback()
        return jsonify({"msg": "error"}), 400



@api.route("/comments/<int:song_id>")
@jwt_required()
def get_comments(song_id):
    comments = Comment.query.filter_by(song_id=song_id).all()
 
    return jsonify([comment.serialize() for comment in comments])



@api.route("/comments/<int:song_id>", methods=["POST"])
@jwt_required()
def create_comment(song_id):
    body = request.json
    content = body.get("content", None)
    start_date = body.get("start_date", None)
    user_id = get_jwt_identity()
    print(user_id)
    print(body)
    
    if content is None: 
        return jsonify({"error": "Es necesario un contenido"}), 400
    comment = Comment(content=content, user_id=user_id["id"], start_date=start_date, song_id=song_id)

    db.session.add(comment)
    try:

        db.session.commit()
        print(comment.serialize())
        return jsonify({"msg": "Se agrego comentario"})
    except Exception as error: 
        db.session.rollback()
        return jsonify({"msg": error.args[0]}), 400



@api.route("/comments/<int:song_id>/<int:comment_id>", methods=["PUT"])
@jwt_required()
def update_comment(song_id, comment_id):
    comment = Comment.query.filter_by(song_id=song_id, id=comment_id).first()

    if comment:
        body = request.json
        content = body.get("content", None)
        comment.content = content

        try:
            db.session.commit()
            return jsonify(comment.serialize())
        except Exception as error: 
            db.session.rollback()
            return jsonify({"msg": error.args[0]}), 500
            
    else:
        return jsonify({"error": "Comment not found"}), 404



@api.route("/comments/<int:song_id>/<int:comment_id>", methods=["DELETE"])
@jwt_required()
def delete_comment(song_id, comment_id):
    comment = Comment.query.filter_by(song_id=song_id, id=comment_id).first()

    if comment:
        db.session.delete(comment)
        db.session.commit()

        return jsonify({"message": "Comment deleted"})
    else:
        return jsonify({"error": "Comment not found"})




@api.route("/songs/<int:project_id>", methods=["POST", "GET"]) 
@jwt_required()
def create_song(project_id):
    if request.method == "POST":
        form = request.form
        files = request.files 
        title = form.get("title")
        gender = form.get("gender")
        artist = form.get("artist")
        version_date = form.get("version_date")
        song = files.get("song")
        cover = files.get("cover")
        user_data = get_jwt_identity()
        user_id = user_data["id"]
        print(title, gender, song, version_date)
        song_url = Bucket.upload_file(song, song.filename)
        cover_url = Bucket.upload_file(cover, cover.filename)
        new_song = Song(artist=artist, title=title, gender=gender, version_date=version_date, song_url=song_url, cover_url=cover_url, user_id=user_id, project_id=project_id)
    
        db.session.add(new_song)
        try:

            db.session.commit()
            return jsonify(new_song.serialize())
        except Exception as error: 
            db.session.rollback()
            return jsonify({"msg": "error"}), 500
    elif request.method == "GET":
        songs = [song.serialize() for song in Song.query.all()]
        print(songs)
        return jsonify({"songs": songs}), 200



@api.route("/cover/<int:project_id>", methods=["POST"]) 
@jwt_required()
def create_cover(project_id):
    form = request.form
    files = request.files 
    title = form.get("title")
    artist = form.get("artist")
    cover = files.get("cover")
    user_data = get_jwt_identity()
    user_id = user_data["id"]
    print(title, cover, artist)
    url = Bucket.upload_file(cover, cover.filename)
    new_cover = Cover(artist=artist, title=title, url=url, user_id=user_id, project_id=project_id)
   
    db.session.add(new_cover)
    try:

        db.session.commit()
        return jsonify(new_cover.serialize())
    except Exception as error: 
        db.session.rollback()
        return jsonify({"msg": "error"}), 400

