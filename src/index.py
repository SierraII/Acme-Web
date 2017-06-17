from flask import Flask, request, jsonify
app = Flask(__name__, static_url_path='')


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/accountsList', methods=['GET'])
def view_accounts():
    return 'multiple accounts'


@app.route('/viewAccount', methods=['GET'])
def view_acocunt():
    # jsonify(ob)
    return 'single account'


@app.route('/deposit', methods=['GET'])
def deposit():
    return 'single account'


@app.route('/withdraw', methods=['GET'])
def withdraw():
    return 'single account'
