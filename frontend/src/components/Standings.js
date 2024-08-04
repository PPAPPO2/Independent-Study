import React, { useEffect, useState } from "react";
import "../styles/Standings.css";
const Standings = () => {
  //useState 使用初始值來初始化狀態變量。
  const [plgStandings, setPlgStandings] = useState([]);
  const [t1Standings, setT1Standings] = useState([]);

  useEffect(() => {
    fetch("/api/Standings/P_TeamStanding23_24.json")
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
      //catch 用於捕獲和處理請求過程中的錯誤。
      .catch((error) => console.error("Error fetching PLG data:", error));
    //兩個 fetch 請求分別獲取 PLG 和 T1 聯賽的數據。
    //fetch 成功後，通過 setPlgStandings 和 setT1Standings 函數更新對應的狀態變量。
    fetch("/api/Standings/T1_TeamStanding23_24.json")
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
    //定義getTeamIcon函數
    switch (teamName) {
      case "桃園璞園領航猿":
        return "/images/icon/桃園璞園領航猿.png";
      case "福爾摩沙夢想家":
        return "/images/icon/福爾摩沙夢想家.png";
      case "新北國王":
        return "/images/icon/新北國王.png";
      case "新竹御頂攻城獅":
        return "/images/icon/新竹御頂攻城獅.png";
      case "臺北富邦勇士":
        return "/images/icon/臺北富邦勇士.png";
      case "高雄17直播鋼鐵人":
        return "/images/icon/高雄17直播鋼鐵人.png";
      case "新北中信特攻":
        return "/images/icon/新北中信特攻.png";
      case "台啤永豐雲豹":
        return "/images/icon/台啤永豐雲豹.png";
      case "高雄全家海神":
        return "/images/icon/高雄全家海神.png";
      case "臺北戰神":
        return "/images/icon/臺北戰神.png";
      case "臺南台鋼獵鷹":
        return "/images/icon/臺南台鋼獵鷹.png";
      default:
        return "";
    }
  };

  const renderTable = (data) => {
    //定義renderTable函數
    if (!data || data.length === 0) {
      //如果沒有data或是data長度為0
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
            //data.map為每一個球隊生成一個行
            <tr
              key={team.id}
              //  key屬性用於唯一 標示每個表格行
            >
              <td>{team.rank}</td>
              <td class="teams-name">
                <img
                  class="team-logo"
                  src={getTeamIcon(team.team_name)}
                  //getTeamIcon函示 前面已經定義了。
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
      <a href="{% url 'showMore' %}">show more⭢</a>
      {renderTable(plgStandings)}
      <h2 class="table-title">T1 例行賽</h2>
      <a href="{% url 'showMore' %}">show more⭢</a>
      {renderTable(t1Standings)}
    </div>
  );
};

export default Standings;
