from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# ১. মডেল এবং স্ক্যালার লোড করা
with open('cancer_model.pkl', 'rb') as f:
    saved_content = pickle.load(f)

model = saved_content['model']
scaler = saved_content['scaler']
important_indices = saved_content['important_indices']
all_means = saved_content['all_means']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        # ৫টি ইনপুট নেওয়া
        user_inputs = [
            float(data['radius']), float(data['texture']), 
            float(data['smoothness']), float(data['compactness']), 
            float(data['concavity'])
        ]
        
        # ২. ৩০টি ফিচারের সেট তৈরি করা
        full_features = np.copy(all_means)
        for i, val in enumerate(user_inputs):
            full_features[important_indices[i]] = val
        
        # ৩. সবচেয়ে গুরুত্বপূর্ণ ধাপ: ইনপুট ডাটাকে স্কেল করা
        # মডেল যেভাবে ট্রেইন হয়েছে ঠিক সেভাবে ডাটাকে রূপান্তর করা
        full_features_reshaped = full_features.reshape(1, -1)
        scaled_features = scaler.transform(full_features_reshaped)
            
        # ৪. প্রেডিকশন
        prediction = model.predict(scaled_features)[0]
        
        return jsonify({'result': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)