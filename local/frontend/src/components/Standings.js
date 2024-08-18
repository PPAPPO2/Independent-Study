import React, { useEffect, useState } from "react";
import "../styles/Standings.css";

const Standings = () => {
  const [plgStandings, setPlgStandings] = useState([]);
  const [t1Standings, setT1Standings] = useState([]);

  useEffect(() => {
    fetch("/static/Standings/P_TeamStanding23_24.json")
      .then((response) => {
        console.log("PLG fetch response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("PLG Data:", data);
        setPlgStandings(data);
      })
      .catch((error) => console.error("Error fetching PLG data:", error));

    fetch("/static/Standings/T1_TeamStanding23_24.json")
      .then((response) => {
        console.log("T1 fetch response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("T1 Data:", data);
        setT1Standings(data);
      })
      .catch((error) => console.error("Error fetching T1 data:", error));
  }, []);

  const getTeamIcon = (teamName) => {
    switch (teamName) {
      case "桃園璞園領航猿":
        return `/images/icon/桃園璞園領航猿.png`;
      case "福爾摩沙夢想家":
        return `/images/icon/福爾摩沙夢想家.png`;
      case "新北國王":
        return `/images/icon/新北國王.png`;
      case "新竹御頂攻城獅":
        return `/images/icon/新竹御頂攻城獅.png`;
      case "臺北富邦勇士":
        return `/images/icon/臺北富邦勇士.png`;
      case "高雄17直播鋼鐵人":
        return `/images/icon/高雄17直播鋼鐵人.png`;
      case "新北中信特攻":
        return `/images/icon/新北中信特攻.png`;
      case "台啤永豐雲豹":
        return `/images/icon/台啤永豐雲豹.png`;
      case "高雄全家海神":
        return `/images/icon/高雄全家海神.png`;
      case "臺北戰神":
        return `/images/icon/臺北戰神.png`;
      case "臺南台鋼獵鷹":
        return `/images/icon/臺南台鋼獵鷹.png`;
      default:
        return "";
    }
  };

  const renderTable = (data) => {
    if (!data || data.length === 0) {
      return <p>無資料顯示</p>;
    }

    return (
      <table class="table-body">
        <thead>
          <tr>
            <th>排名</th>
            <th>球隊</th>
            <th>已賽 GP</th>
            <th>勝場 W</th>
            <th>敗場 L</th>
            <th>勝率</th>
            <th>勝差</th>
            <th>連續紀錄</th>
          </tr>
        </thead>
        <tbody>
          {data.map((team) => (
            <tr key={team.id}>
              <td>{team.rank}</td>
              <td class="teams-name">
                <img
                  class="team-logo"
                  src={getTeamIcon(team.team_name)}
                  alt={team.team_name}
                  style={{ width: "30px", marginRight: "10px" }}
                />
                {team.team_name}
              </td>
              <td>{team.games_played}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.pct}</td>
              <td>{team.games_behind}</td>
              <td>{team.wins_losses_streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2 class="standings">RANKINGS</h2>
      <h2 class="table-title">PLG 例行賽</h2>
      <a href="../cat/showmore">showmore⭢</a>
      {renderTable(plgStandings)}
      <h2 class="table-title">T1 例行賽</h2>
      <a href="../cat/showmore">showmore⭢</a>
      {renderTable(t1Standings)}
    </div>
  );
};

export default Standings;
