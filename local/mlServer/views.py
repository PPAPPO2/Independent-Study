from django.shortcuts import render
from django.http import JsonResponse
from .models import GameRecord
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

MODEL_FILE = 'trained_model.pkl'
clf = None
team_avg_stats = None 
X_columns = None

def train_model():
    global clf, team_avg_stats, X_columns
    if os.path.exists(MODEL_FILE):

        clf = joblib.load(MODEL_FILE)

        team_avg_stats = joblib.load('team_avg_stats.pkl')
        X_columns = joblib.load('X_columns.pkl')
    else:
        queryset = GameRecord.objects.all().values()
        df = pd.DataFrame(list(queryset))
        
        if df.empty:
            raise ValueError('沒有比賽數據。')

        df[['home_team_name', 'away_team_name']] = df['match'].str.split(' vs. ', expand=True)

        df['team_name'] = df.apply(
            lambda row: row['home_team_name'] if row['team'] == 'Home' else row['away_team_name'],
            axis=1
        )

        home_data = df[df['team'] == 'Home'].copy()
        away_data = df[df['team'] == 'Away'].copy()

        home_data = home_data.add_prefix('home_')
        away_data = away_data.add_prefix('away_')

        merged_data = pd.merge(home_data, away_data, left_on='home_match', right_on='away_match')

        merged_data['home_win'] = (merged_data['home_points'] > merged_data['away_points']).astype(int)

        numeric_cols = merged_data.select_dtypes(include=['number']).columns.tolist()
        if 'home_win' in numeric_cols:
            numeric_cols.remove('home_win') 

        X = merged_data[numeric_cols]
        y = merged_data['home_win']

        X_columns = X.columns.tolist()

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        clf = RandomForestClassifier(random_state=42)
        clf.fit(X_train, y_train)

        numeric_cols_df = df.select_dtypes(include=['number']).columns.tolist()
        team_avg_stats = df.groupby('team_name')[numeric_cols_df].mean()

        joblib.dump(clf, MODEL_FILE)
        joblib.dump(team_avg_stats, 'team_avg_stats.pkl')
        joblib.dump(X_columns, 'X_columns.pkl')

train_model()

def predict_win_probability(request):
    if request.method == 'GET':
        global clf, team_avg_stats, X_columns

        team1 = request.GET.get('team1')
        team2 = request.GET.get('team2')
        
        if not team1 or not team2:
            return JsonResponse({'error': '查無此隊伍'}, status=400)
        
        if team1 not in team_avg_stats.index or team2 not in team_avg_stats.index:
            return JsonResponse({'error': '查無數據'}, status=400)

        home_team_stats = team_avg_stats.loc[team1].add_prefix('home_')
        away_team_stats = team_avg_stats.loc[team2].add_prefix('away_')

        game_features = pd.concat([home_team_stats, away_team_stats]).to_frame().T
        game_features = game_features[X_columns] 

        game_features = game_features.fillna(0)

        # prediction = clf.predict(game_features)
        win_prob = clf.predict_proba(game_features)[0][1]
        win_prob_percent = f'{win_prob * 100:.2f}%'

        # if prediction[0] == 1:
        #     result = f'預測結果：主隊 ({team1}) 將獲勝。'
        # else:
        #     result = f'預測結果：客隊 ({team2}) 將獲勝。'

        return JsonResponse({
            # 'prediction': result,
            'win_probability': win_prob_percent
        }, json_dumps_params={'ensure_ascii': False})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
