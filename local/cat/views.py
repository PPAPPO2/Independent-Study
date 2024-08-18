import os
import pandas as pd
import numpy as np
from django.shortcuts import render
import joblib
from django.http import JsonResponse

def index(request):
    return render(request, "index.html")

# 加載模型
model_path = os.path.join(os.path.dirname(__file__), 'models', 'random_forest_model.pkl')
model = joblib.load(model_path)

def predict_win_probability(request):
    if request.method == 'GET':
        # 讀取數據
        file_path = os.path.join(os.path.dirname(__file__), 'models', 'combined_data.csv')
        data = pd.read_csv(file_path)

        # 分割資料集，將資料集分為特徵 X 和標籤 y
        data['result'] = (data['points'] > data['points'].shift(-1)).astype(int)
        X = data.drop(columns=['result'])

        # 隨機生成 1000 份比賽數據
        num_simulations = 1000
        simulated_data = {
            'points': np.random.normal(X['points'].mean(), X['points'].std(), num_simulations),
            'turnover': np.random.normal(X['turnover'].mean(), X['turnover'].std(), num_simulations),
            'ast': np.random.normal(X['ast'].mean(), X['ast'].std(), num_simulations),
            'blk': np.random.normal(X['blk'].mean(), X['blk'].std(), num_simulations),
            'reb_d': np.random.normal(X['reb_d'].mean(), X['reb_d'].std(), num_simulations),
            'reb_o': np.random.normal(X['reb_o'].mean(), X['reb_o'].std(), num_simulations),
            'pfoul': np.random.normal(X['pfoul'].mean(), X['pfoul'].std(), num_simulations),
            'stl': np.random.normal(X['stl'].mean(), X['stl'].std(), num_simulations),
            'reb': np.random.normal(X['reb'].mean(), X['reb'].std(), num_simulations),
            'two': np.random.normal(X['two'].mean(), X['two'].std(), num_simulations),
            'two_m_two': np.random.normal(X['two_m_two'].mean(), X['two_m_two'].std(), num_simulations),
            'twop': np.random.normal(X['twop'].mean(), X['twop'].std(), num_simulations),
            'trey': np.random.normal(X['trey'].mean(), X['trey'].std(), num_simulations),
            'treyp': np.random.normal(X['treyp'].mean(), X['treyp'].std(), num_simulations),
            'ft': np.random.normal(X['ft'].mean(), X['ft'].std(), num_simulations),
            'ftp': np.random.normal(X['ftp'].mean(), X['ftp'].std(), num_simulations),
            'two_m': np.random.normal(X['two_m'].mean(), X['two_m'].std(), num_simulations),
            'trey_m': np.random.normal(X['trey_m'].mean(), X['trey_m'].std(), num_simulations),
            'ft_m': np.random.normal(X['ft_m'].mean(), X['ft_m'].std(), num_simulations)
        }

        simulated_df = pd.DataFrame(simulated_data)

        # 使用模型進行預測
        simulated_predictions = model.predict(simulated_df)

        # 計算新北國王勝利的概率
        win_probability = simulated_predictions.mean()

        # 返回 JSON 響應
        return JsonResponse({'win_probability': f'{win_probability * 100:.2f}%'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
