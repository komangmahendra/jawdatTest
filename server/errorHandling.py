from flask import Blueprint, jsonify
from app import app

@app.errorhandler(404)
def page_not_found(e):
    return jsonify(error=404, text=str(e)), 404

@app.errorhandler(500)
def internal_server_error(e):
    return jsonify(error=500, text=str('internal server error')), 500