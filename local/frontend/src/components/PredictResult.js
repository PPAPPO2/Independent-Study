import React, { useState, useEffect } from 'react';

function PredictResult() {
    const [winProbability, setWinProbability] = useState(null);

    useEffect(() => {
        fetch('/cat/predict/')
            .then(response => response.json())
            .then(data => {
                setWinProbability(data.win_probability);
            })
            .catch(error => console.error('Error fetching prediction:', error));
    }, []);

    return (
        <div>
            <h1>預測結果</h1>
            {winProbability ? (
                <p>新北國王的勝利預測概率為: {winProbability}</p>
            ) : (
                <p>正在加載預測結果...</p>
            )}
        </div>
    );
}

export default PredictResult;
