import React, { useState } from "react";
import "../styles/Predict.css";

function PredictWinProbability() {
  const [team1, setTeam1] = useState("新北國王");
  const [team2, setTeam2] = useState("桃園璞園領航猿");
  const [result, setResult] = useState("點擊上方按鈕以預測勝率");

  const teams = [
    "新北國王",
    "桃園璞園領航猿",
    "臺北富邦勇士",
    "福爾摩沙夢想家",
    "新竹御頂攻城獅",
    "高雄17直播鋼鐵人",
  ];

  const handlePredict = () => {
    fetch(`/mlServer/predict/?team1=${team1}&team2=${team2}`)
      .then((response) => response.json())
      .then((data) => {
        setResult(`主隊 ${team1} 的勝率為：${data.win_probability}`);
      })
      .catch((error) => {
        setResult("預測失敗，請稍後重試。");
      });
  };

  const handleTeam1Change = (e) => {
    const selectedTeam = e.target.value;
    setTeam1(selectedTeam);

    // 如果選擇的主隊與當前客隊相同，則重置客隊
    if (selectedTeam === team2) {
      setTeam2(teams.find((team) => team !== selectedTeam));
    }
  };

  return (
    <div class="predict">
      <h1>比賽勝率預測超派測試</h1>
      <form>
        <label htmlFor="team1">選擇主隊:</label>
        <select id="team1" value={team1} onChange={handleTeam1Change}>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="team2">選擇客隊:</label>
        <select
          id="team2"
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
        >
          {teams
            .filter((team) => team !== team1)
            .map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
        </select>
        <br />

        <button type="button" onClick={handlePredict}>
          預測勝率
        </button>
      </form>

      <p>{result}</p>
    </div>
  );
}

export default PredictWinProbability;
