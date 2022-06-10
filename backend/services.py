from flask import Flask, request, jsonify
import pandas as pd
import joblib
import os
from flask_cors import CORS, cross_origin
import json

# Your API definition
app = Flask(__name__)
CORS(app)

fullpathModelMLP = os.path.abspath('model_mlp_renzo_2022.pkl')
fullpathDecisionTree = os.path.abspath('decision_tree_model.pkl')
fullpathModelRandForest = os.path.abspath('rand_forest.pkl')
path_svm = os.path.abspath('model_svm.pkl')
fullpathKNN = os.path.abspath('knn_model.pkl')
fullpathLogReg = os.path.abspath('logistic_regression.pkl')

fullpathColumns = os.path.abspath('columns.pkl')


@app.route("/predict/<string:model>", methods=['GET', 'POST'])  # use decorator pattern for the route
def predict(**kwargs):
    model = kwargs.get('model', '')
    model = trained_models[model]

    try:
        json_ = request.json
        query = pd.DataFrame(json_, columns=joblib.load(fullpathColumns))
        prediction = list(model.predict(query))
        res = jsonify({'prediction': str(prediction)})
        res.headers.add('Access-Control-Allow-Origin', '*')
        return res

    except Exception as e:
        return jsonify({
            'error': e})


if __name__ == '__main__':

    trained_models = {
        "multi-layer-perceptron": joblib.load(fullpathModelMLP),
        "decision-tree": joblib.load(fullpathDecisionTree),
        "rand_forest": joblib.load(fullpathModelRandForest),
        "svm": joblib.load(path_svm),
        "knn": joblib.load(fullpathKNN),
        "logistic_regression": joblib.load(fullpathLogReg)
    }

    app.run(port=12345, debug=True)
