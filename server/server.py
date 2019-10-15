from flask import Flask, render_template

server = Flask(__name__, static_folder='../static/build', template_folder='../static')


@server.route('/')
def index():
    return render_template('index.html')


if __name__ == "__main__":
    server.run('127.0.0.1', 5000)