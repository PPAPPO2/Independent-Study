from django.shortcuts import render
from django.http import JsonResponse
from .models import GameRecord
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

def predict_win_probability(request):
    if request.method == 'GET':
        # 從 GET 請求中獲取隊伍名稱
        team1 = request.GET.get('team1')
        team2 = request.GET.get('team2')
        
        if not team1 or not team2:
            return JsonResponse({'error': '隊伍名稱無效'}, status=400)
        
        # 從資料庫中讀取特定比賽的數據
        queryset = GameRecord.objects.filter(match__in=[f'{team1} vs. {team2}', f'{team2} vs. {team1}']).values()
        dataSet = pd.DataFrame(list(queryset))  # 轉換成 DataFrame

        # 確保數據存在
        if dataSet.empty:
            return JsonResponse({'error': '沒有找到相關的比賽數據'}, status=404)

        # 添加勝負標籤
        dataSet['result'] = np.where(dataSet['team'] == team1, 
                                     (dataSet['points'] > dataSet['points'].shift(-1)), 
                                     (dataSet['points'] < dataSet['points'].shift(1)))

        # 只保留 Home 隊的數據
        dataSet = dataSet[dataSet['team'] == 'Home']

        # 移除不必要的列
        X = dataSet.drop(columns=['team', 'match', 'result'])
        y = dataSet['result']

        # 分割為訓練集和測試集
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

        # 訓練隨機森林模型
        model = RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced')
        model.fit(X_train, y_train)

        # 隨機生成比賽數據
        num_simulations = 1000
        simulated_data = {col: np.random.normal(X[col].mean(), X[col].std(), num_simulations) for col in X.columns}

        simulated_df = pd.DataFrame(simulated_data)

        # 使用模型進行預測
        simulated_predictions = model.predict(simulated_df)

        # 計算隊伍1（主隊）勝利的概率
        win_probability = simulated_predictions.mean()

        return JsonResponse({'win_probability': f'{win_probability * 100:.2f}%'}, json_dumps_params={'ensure_ascii': False})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)