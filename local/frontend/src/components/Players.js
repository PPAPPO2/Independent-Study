import React, { useEffect, useState } from "react";
import "../styles/ShowMore.css";

const staticUrl = "/static/Standings/PlayerData/";
const Players = () => {
  const [pData, setPData] = useState([]);
  const [t1Data, setT1Data] = useState([]);
  const columnMapping = {
    球員: "player",
    背號: "jersey",
    球隊: "team",
    出賽: "game_played",
    上場時間: "minutes",
    得分: "points",
    投籃命中: "All_goals_made",
    投籃出手: "All_goals",
    "投籃FG%": "All_goals_pct",
    二分命中: "field_goals_two_made",
    二分出手: "field_goals_two",
    "二分FG%": "field_goals_two_pct",
    三分命中: "field_goals_three_made",
    三分出手: "field_goals_three",
    "三分FG%": "field_goals_three_pct",
    罰球命中: "free_throws_made",
    罰球出手: "free_throws",
    "罰球FG%": "free_throws_pct",
    進攻籃板: "offensive_rebounds",
    防守籃板: "defensive_rebounds",
    籃板: "rebounds",
    助攻: "assists",
    抄截: "steals",
    阻攻: "blocks",
    失誤: "turnovers",
    犯規: "fouls",
  };
  useEffect(() => {
    // 讀取 P 聯盟的球員資料
    fetch("/static/Standings/PlayerData/P_Players_performance_23_24.json")
      .then((response) => response.json())
      .then((data) => setPData(data))
      .catch((error) => console.error("Error fetching P data:", error));

    // 讀取 T1 聯盟的球員資料
    fetch("/static/Standings/PlayerData/T1_Players_performance_23_24.json")
      .then((response) => response.json())
      .then((data) => setT1Data(data))
      .catch((error) => console.error("Error fetching T1 data:", error));
  }, []);
  return (
    <div>
      <h2>PLG 球員數據</h2>
      <table border="1">
        <thead>
          <tr>
            <th>球員</th>
            <th>背號</th>
            <th>球隊</th>
            <th>場次</th>
            <th>分鐘</th>
            <th>得分</th>
            <th>投籃命中</th>
            <th>投籃出手</th>
            <th>投籃命中率</th>
            <th>助攻</th>
            <th>抄截</th>
            <th>籃板</th>
          </tr>
        </thead>
        <tbody>
          {pData.map((player) => (
            <tr key={player.id}>
              <td>{player.player}</td>
              <td>{player.jersey}</td>
              <td>{player.team}</td>
              <td>{player.game_played}</td>
              <td>{player.minutes}</td>
              <td>{player.points}</td>
              <td>{player.All_goals_made}</td>
              <td>{player.All_goals}</td>
              <td>{player.All_goals_pct}</td>
              <td>{player.assists}</td>
              <td>{player.steals}</td>
              <td>{player.rebounds}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>T1 球員數據</h2>
      <table border="1">
        <thead>
          <tr>
            <th>球員</th>
            <th>背號號碼</th>
            <th>球隊</th>
            <th>場次</th>
            <th>分鐘</th>
            <th>得分</th>
            <th>投籃命中</th>
            <th>投籃出手</th>
            <th>投籃命中率</th>
            <th>助攻</th>
            <th>抄截</th>
            <th>籃板</th>
          </tr>
        </thead>
        <tbody>
          {t1Data.map((player) => (
            <tr key={player.id}>
              <td>{player.player}</td>
              <td>{player.jersey}</td>
              <td>{player.team}</td>
              <td>{player.game_played}</td>
              <td>{player.minutes}</td>
              <td>{player.points}</td>
              <td>{player.All_goals_made}</td>
              <td>{player.All_goals}</td>
              <td>{player.All_goals_pct}</td>
              <td>{player.assists}</td>
              <td>{player.steals}</td>
              <td>{player.rebounds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Players;
