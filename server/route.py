from flask import Blueprint, request, jsonify
from netmiko import ConnectHandler
import re
from telnet import telnetDevice

device = Blueprint('device', __name__)

listDevice = [
    { 
        "ip" : "158.140.190.214",
        "port" : "32906"
    },
    { 
        "ip" : "158.140.190.214",
        "port" : "32907"
    }
]

@device.route('/devices/<string:ip>/<string:port>', methods=['GET'])
def getOneDevice(ip, port):
    try:
        return jsonify(telnetDevice(ip, port)), 200
    except ValueError as error:
        return jsonify({ "message" : error.args}), 400

@device.route('/devices', methods=['GET'])
def getStore():
    return jsonify(listDevice),200