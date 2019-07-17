from flask import Flask, jsonify, request
from telnetlib import Telnet
from route import device
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(device)
app.run(port=3000, debug=True)