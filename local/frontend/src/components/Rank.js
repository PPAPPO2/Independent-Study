import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSpring, animated } from "react-spring";
import "../styles/Rank.css";

// 球隊名稱對應的圖片檔名
const teamLogoMapping = {
  臺北富邦勇士: "臺北富邦勇士.png",
  新北國王: "新北國王.png",
  高雄17直播鋼鐵人: "高雄17直播鋼鐵人.png",
  高雄鋼鐵人: "高雄17直播鋼鐵人.png",
  桃園璞園領航猿: "桃園璞園領航猿.png",
  桃園領航猿: "桃園璞園領航猿.png",
  福爾摩沙夢想家: "福爾摩沙夢想家.png",
  福爾摩沙台新夢想家: "福爾摩沙夢想家.png",
  新竹御頂攻城獅: "新竹御頂攻城獅.png",
  新竹街口攻城獅: "新竹御頂攻城獅.png",
  新竹攻城獅: "新竹御頂攻城獅.png",
  新北中信特攻: "新北中信特攻.png",
  台啤永豐雲豹: "台啤永豐雲豹.png",
  臺北戰神: "臺北戰神.png",
  高雄全家海神: "高雄全家海神.png",
  臺南台鋼獵鷹: "臺南台鋼獵鷹.png",
  臺中太陽: "臺中太陽.png",
  台灣啤酒英熊: "台灣啤酒英熊.png",
};

const Rank = () => {
  const [season, setSeason] = useState("23-24"); // 預設球季
  const [gameType, setGameType] = useState("regular"); // 預設賽事類型
  const [teamData, setTeamData] = useState([]); // 球隊數據
  const [playerData, setPlayerData] = useState([]); // 球員數據
  const [animationTrigger, setAnimationTrigger] = useState(false); // 動畫觸發
  const [noData, setNoData] = useState(false); // 查無資料

  // 定義動畫效果
  const cardAnimation = useSpring({
    opacity: animationTrigger ? 1 : 0.7,
    transform: animationTrigger ? "translateY(0)" : "translateY(20px)",
    config: { duration: 200 },
  });

  // 檢查選擇的年份與賽事類型是否有資料
  useEffect(() => {
    if (["20-21", "21-22"].includes(season) && gameType !== "regular") {
      setNoData(true);
    } else {
      setNoData(false);
    }
  }, [season, gameType]);

  // 更新動畫
  useEffect(() => {
    setAnimationTrigger(false);
    setTimeout(() => {
      setAnimationTrigger(true);
    }, 350);
  }, [season, gameType, teamData, playerData]);

  // 當球季或賽事類型改變時抓取數據
  useEffect(() => {
    if (noData) {
      // 如果查無資料，則不發出請求
      setTeamData([]);
      setPlayerData([]);
      return;
    }

    const fetchData = async () => {
      let plgTeamUrl = "";
      let t1TeamUrl = "";
      let plgPlayerUrl = "";
      let t1PlayerUrl = "";

      // 根據選擇決定 URL
      if (gameType === "regular") {
        plgTeamUrl = `/static/Standings/TeamData/P_Season_Teams_Performance_${season.replace(
          "-",
          "_"
        )}.json`;
        t1TeamUrl = `/static/Standings/TeamData/T1_Season_Teams_Performance_${season.replace(
          "-",
          "_"
        )}.json`;

        plgPlayerUrl = `/static/Standings/PlayerData/P_Players_performance_${season.replace(
          "-",
          "_"
        )}.json`;
        t1PlayerUrl = `/static/Standings/PlayerData/T1_Players_performance_${season.replace(
          "-",
          "_"
        )}.json`;
      } else if (gameType === "playoff") {
        plgTeamUrl = `/static/Standings/TeamData/P_Season_Teams_Playoff_Performance_${season.replace(
          "-",
          "_"
        )}.json`;
        t1TeamUrl = `/static/Standings/TeamData/T1_Season_Teams_Playoff_Performance_${season.replace(
          "-",
          "_"
        )}.json`;

        plgPlayerUrl = `/static/Standings/PlayerData/P_Season_Players_Playoff_Performance_${season.replace(
          "-",
          "_"
        )}.json`;
        t1PlayerUrl = `/static/Standings/PlayerData/T1_Season_Players_Playoff_Performance_${season.replace(
          "-",
          "_"
        )}.json`;
      } else if (gameType === "final") {
        plgTeamUrl = `/static/Standings/TeamData/P_Season_Teams_Final_Performance_${season.replace(
          "-",
          "_"
        )}.json`;
        t1TeamUrl = `/static/Standings/TeamData/T1_Season_Teams_Final_Performance_${season.replace(
          "-",
          "_"
        )}.json`;

        plgPlayerUrl = `/static/Standings/PlayerData/P_Season_Players_Final_Performance_${season.replace(
          "-",
          "_"
        )}.json`;
        t1PlayerUrl = `/static/Standings/PlayerData/T1_Season_Players_Final_Performance_${season.replace(
          "-",
          "_"
        )}.json`;
      }

      // Fetch PLG 和 T1 資料
      try {
        const [
          plgTeamResponse,
          t1TeamResponse,
          plgPlayerResponse,
          t1PlayerResponse,
        ] = await Promise.all([
          fetch(plgTeamUrl),
          fetch(t1TeamUrl),
          fetch(plgPlayerUrl),
          fetch(t1PlayerUrl),
        ]);

        const plgTeamData = plgTeamResponse.ok
          ? await plgTeamResponse.json()
          : [];
        const t1TeamData = t1TeamResponse.ok ? await t1TeamResponse.json() : [];
        const plgPlayerData = plgPlayerResponse.ok
          ? await plgPlayerResponse.json()
          : [];
        const t1PlayerData = t1PlayerResponse.ok
          ? await t1PlayerResponse.json()
          : [];

        // 合併兩聯盟數據
        setTeamData([...plgTeamData, ...t1TeamData]);
        setPlayerData([...plgPlayerData, ...t1PlayerData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [season, gameType, noData]);

  // 依數據進行排序並取前五名
  const getTopFive = (data, key) => {
    return [...data]
      .sort((a, b) => b[key] - a[key]) // 依據key進行排序
      .slice(0, 5); // 取前五名
  };

  // 使用 teamLogoMapping 顯示球隊圖片
  const getTeamLogo = (teamName) => {
    return teamLogoMapping[teamName] || "default.png"; // 如果沒有匹配的名稱，顯示預設圖片
  };

  // 卡片結構
  // 修改 renderCard 函數來顯示球員所屬的球隊 icon
  const renderCard = (title, data, keyField, valueField, isTeam = false) => {
    const getRankSuffix = (rank) => {
      switch (rank) {
        case 1:
          return "1st";
        case 2:
          return "2nd";
        case 3:
          return "3rd";
        case 4:
          return "4th";
        case 5:
          return "5th";
        default:
          return `${rank}th`;
      }
    };

    return (
      <animated.div style={cardAnimation}>
        <div className="stat-card">
          <div className="No1">
            {/* 顯示卡片標題 */}
            <h4>{title} </h4>
            {isTeam && getTopFive(data, valueField)[0] && (
              <img
                src={`/images/icon/${getTeamLogo(
                  getTopFive(data, valueField)[0][keyField]
                )}`}
                alt={getTopFive(data, valueField)[0][keyField]}
              />
            )}
          </div>
          <div className="card-content">
            <ul className="ranking-list">
              {getTopFive(data, valueField).map((item, index) => (
                <li
                  key={index}
                  className={`stat-item ${index === 0 ? "first" : ""}`}
                >
                  <div className="rank-and-data">
                    <span className="rank">{getRankSuffix(index + 1)}.</span>
                    <span className="team-or-player">
                      {/* 顯示球員所屬球隊或球隊名稱 */}
                      <img
                        src={`/images/icon/${getTeamLogo(
                          item.team || item[keyField]
                        )}`}
                        alt={item[keyField]}
                        className="team-logo"
                      />
                      {item[keyField]}
                    </span>
                  </div>
                  <span className="value">{item[valueField]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </animated.div>
    );
  };

  return (
    <div className="rankings">
      <h2>RANKINGS</h2>
      <div className="filter-section">
        {/* 選擇賽事類型 */}
        <select value={gameType} onChange={(e) => setGameType(e.target.value)}>
          <option value="regular">例行賽</option>
          <option value="playoff">季後賽</option>
          <option value="final">冠軍賽</option>
        </select>

        {/* 選擇球季 */}
        <select value={season} onChange={(e) => setSeason(e.target.value)}>
          <option value="23-24">2023-24</option>
          <option value="22-23">2022-23</option>
          <option value="21-22">2021-22</option>
          <option value="20-21">2020-21</option>
        </select>
      </div>

      {noData ? (
        <div className="no-data-message">查無資料</div>
      ) : (
        <div className="stats-sections">
          {/* 球隊數據卡片 */}
          <div className="team-stats">
            <div className="Leaders">
              <h3>Player Leaders</h3>
              <h4>球員數據排行</h4>
            </div>
            {renderCard("得分", teamData, "team", "points", true)}
            {renderCard("投籃FG%", teamData, "team", "All_goals_pct", true)}
            {renderCard(
              "二分FG%",
              teamData,
              "team",
              "field_goals_two_pct",
              true
            )}
            {renderCard(
              "三分命中",
              teamData,
              "team",
              "field_goals_three_made",
              true
            )}
            {renderCard(
              "三分FG%",
              teamData,
              "team",
              "field_goals_three_pct",
              true
            )}
            {renderCard("罰球FG%", teamData, "team", "free_throws_pct", true)}
            {renderCard("籃板", teamData, "team", "rebounds", true)}
            {renderCard("助攻", teamData, "team", "assists", true)}
            {renderCard("抄截", teamData, "team", "steals", true)}
            {renderCard("阻攻", teamData, "team", "blocks", true)}
            {renderCard("失誤", teamData, "team", "turnovers", true)}
            {renderCard("犯規", teamData, "team", "fouls", true)}
          </div>

          {/* 球員數據卡片 */}
          <div className="player-stats">
            <div className="Leaders">
              <h3>Team Leaders</h3>
              <h4>球隊數據排行</h4>
            </div>
            {renderCard("得分", playerData, "player", "points", false)}
            {renderCard(
              "投籃FG%",
              playerData,
              "player",
              "All_goals_pct",
              false
            )}
            {renderCard(
              "二分FG%",
              playerData,
              "player",
              "field_goals_two_pct",
              false
            )}
            {renderCard(
              "三分命中",
              playerData,
              "player",
              "field_goals_three_made",
              false
            )}
            {renderCard(
              "三分FG%",
              playerData,
              "player",
              "field_goals_three_pct",
              false
            )}
            {renderCard(
              "罰球FG%",
              playerData,
              "player",
              "free_throws_pct",
              false
            )}
            {renderCard("籃板", playerData, "player", "rebounds", false)}
            {renderCard("助攻", playerData, "player", "assists", false)}
            {renderCard("抄截", playerData, "player", "steals", false)}
            {renderCard("阻攻", playerData, "player", "blocks", false)}
            {renderCard("失誤", playerData, "player", "turnovers", false)}
            {renderCard("犯規", playerData, "player", "fouls", false)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rank;
