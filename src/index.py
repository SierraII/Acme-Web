import json

from flask import Flask, request, jsonify

app = Flask(__name__, static_url_path='')


accounts = []

account = {}
account['number'] = 1234
account['created_date'] = 1234
account['type'] = 'current'
account['balance'] = 5678.44
account['overdraft_limit'] = 1000

accounts.append(account)


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/my-account/')
def my_acocunt():
    return app.send_static_file('my-account.html')


@app.route('/accountsList', methods=['GET'])
def view_accounts():
    return 'multiple accounts'


@app.route('/viewAccount', methods=['GET'])
def view_acocunt():
    # jsonify(ob)
    return json.dumps(accounts)


@app.route('/deposit', methods=['GET'])
def deposit():
    return 'single account'


@app.route('/withdraw', methods=['GET'])
def withdraw():
    return 'single account'
