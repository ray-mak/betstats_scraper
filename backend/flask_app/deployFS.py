from pymongo import MongoClient
from flask import Flask, jsonify
from flask_cors import CORS

client = MongoClient("mongodb://localhost:27017/")
db = client["fighter_stats"]
collection = db["fighter_roi"]

app = Flask(__name__)
CORS(app)

@app.route('/data', methods=['GET'])
def get_data():
    data = list(collection.find({}))
    for document in data:
        document['_id'] = str(document['_id'])
    return jsonify(data)

if (__name__) == '__main__':
    app.run(debug=True)