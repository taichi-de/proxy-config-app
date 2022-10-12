from flask import Flask, request, jsonify
import os
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)


app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024
UPLOAD_DIR = os.getenv('UPLOAD_DIR_PATH')


@app.route('/restapi/upload', methods = ['POST', 'GET'] )
@cross_origin()
def upload_file():
    file = request.files
    return jsonify(file)


if __name__ == "__main__":
    app.run(debug=True)


# -- Start flask -- 
# . venv/bin/activate
# flask run

# -- dummy IPAdress --
# 111.11.11.111:11

# Afgb2: Imprementation des Befehls der Kocktail rezepte