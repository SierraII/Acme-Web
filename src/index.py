import json
import datetime
from time import gmtime, strftime

from flask import Flask, request, jsonify, Response

app = Flask(__name__, static_url_path='')


accounts = []

# current account
current_account = {}
current_account['account_number'] = 1234
current_account['created_date'] = strftime("%Y-%m-%d %H:%M:%S", gmtime())
current_account['type'] = 'current'
current_account['balance'] = 5000
current_account['overdraft_limit'] = 25000
current_account['transactions'] = []

current_account2 = {}
current_account2['account_number'] = 91011
current_account2['created_date'] = strftime("%Y-%m-%d %H:%M:%S", gmtime())
current_account2['type'] = 'current'
current_account2['balance'] = -3000
current_account2['overdraft_limit'] = 20000
current_account2['transactions'] = []


# savings account
savings_accont = {}
savings_accont['account_number'] = 5678
savings_accont['created_date'] = strftime("%Y-%m-%d %H:%M:%S", gmtime())
savings_accont['type'] = 'savings'
savings_accont['balance'] = 5678.44
savings_accont['transactions'] = []

accounts.append(current_account)
accounts.append(current_account2)
accounts.append(savings_accont)


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/my-account/')
def my_acocunt():
    return app.send_static_file('my-account.html')


@app.route('/viewAccount', methods=['GET'])
def view_acocunt():
    return Response(json.dumps(accounts),  mimetype='application/json')


@app.route('/deposit', methods=['PUT'])
def deposit():
    amount = int(request.form['amount'])
    account_number = int(request.form['account_number'])
    acc = {};

    for account in accounts:
        if account['account_number'] == account_number:

            account['balance'] += amount

            transaction = {}
            transaction['amount'] = amount
            transaction['type'] = 'deposit'

            # add transaction
            account['transactions'].append(transaction)

            acc = account

            break

    return Response(json.dumps(acc),  mimetype='application/json')


@app.route('/withdraw', methods=['PUT'])
def withdraw():
    amount = int(request.form['amount'])
    account_number = int(request.form['account_number'])
    acc = {};

    for account in accounts:
        if account['account_number'] == account_number:

            account['balance'] -= amount

            transaction = {}
            transaction['amount'] = amount
            transaction['type'] = 'deposit'

            # add transaction
            account['transactions'].append(transaction)

            acc = account

            break

    return Response(json.dumps(acc),  mimetype='application/json')
