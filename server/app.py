# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_marshmallow import Marshmallow
# from flask_cors import CORS


# db = SQLAlchemy()
# migrate = Migrate()
# ma = Marshmallow()
# cors = CORS()

# app = Flask(__name__)

# @app.route("/")
# def hello_world():
#     return "<p>Hello, World!</p>"

# def create_app():
#     """Application-factory pattern"""
#     app = Flask(__name__)
#     app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
#     app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#     db.init_app(app)
#     migrate.init_app(app, db)
#     ma.init_app(app)
#     cors.init_app(app)

#     return app

from flask import Flask, request, make_response, send_from_directory, jsonify
import os
from datetime import datetime
import werkzeug


app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024
UPLOAD_DIR = os.getenv('UPLOAD_DIR_PATH') # ./uploads


@app.route('/uploaded_files', methods=['POST'])
def upload_file():
    if 'file' in request.files:
        return make_response(jsonify({'result':'file is empty.'}))
    file = request.files['file']
    fileName = file.filename
    saveFileName = datetime.now().strftime('%Y%m%d_%H%M%S_') + werkzeug.utils.secure_filename(fileName)
    file.save(os.path.join(UPLOAD_DIR, saveFileName))
    return make_response(jsonify({'access_url':'http://localhost:3000/uploads/' + saveFileName }))


@app.errorhandler(werkzeug.exceptions.RequestEntityTooLarge)
def handle_over_max_file_size(error):
    return make_response(jsonify({'result':'file size is overed.'}))


@app.route('/uploads/<filename>', methods=['GET'])
def show_uploaded_file(filename):
    print(os.getenv('UPLOAD_DIR_PATH'))
    return send_from_directory(os.getenv('UPLOAD_DIR_PATH'), filename)


if __name__ == "__main__":
    app.run(debug=True)
