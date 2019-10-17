import os
from flask import Flask, render_template, send_from_directory

# @author Nathan Romriell - 10/15/2019
# @info small flask server for sending static app files to the client

server = Flask(__name__, static_folder='../static/build', template_folder='../static')


@server.route('/')
def index():
    return render_template('index.html')


@server.route('/favicon.ico')
def favicon():
    print(server.static_folder)
    return send_from_directory(server.template_folder, 'favicon.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == "__main__":
    server.run('127.0.0.1', 5000)