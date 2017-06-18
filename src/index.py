import json

from flask import Flask, request, jsonify, Response

app = Flask(__name__, static_url_path='')


accounts = []

# current account
current_account = {}
current_account['account_number'] = 1234
current_account['created_date'] = 1234
current_account['type'] = 'current'
current_account['balance'] = -5678.44
current_account['overdraft_limit'] = 1000

# savings account
savings_accont = {}
savings_accont['account_number'] = 1234
savings_accont['created_date'] = 1234
savings_accont['type'] = 'savings'
savings_accont['balance'] = 5678.44

accounts.append(current_account)
accounts.append(savings_accont)


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
    return Response(json.dumps(accounts),  mimetype='application/json')
    # return json.dumps(accounts)


@app.route('/deposit', methods=['GET'])
def deposit():
    return 'single account'


@app.route('/withdraw', methods=['GET'])
def withdraw():
    return 'single account'
