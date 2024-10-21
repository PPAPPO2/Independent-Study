import React, { useEffect, useState } from "react";
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
  const [season, setSeason] = useState("23_24"); // 預設球季
  const [gameType, setGameType] = useState("regular"); // 預設賽事類型
  const [combinedTeamData, setCombinedTeamData] = useState([]); // 球隊數據
  const [combinedPlayerData, setCombinedPlayerData] = useState([]); // 球員數據
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
    if (["20_21", "21_22"].includes(season) && gameType !== "regular") {
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
  }, [season, gameType, combinedTeamData, combinedPlayerData]);

  // 當球季或賽事類型改變時抓取數據
  useEffect(() => {
    if (noData) {
      setCombinedTeamData([]);
      setCombinedPlayerData([]);
      return;
    }

    const fetchData = async () => {
      let plgTeamUrl = "";
      let t1TeamUrl = "";
      let plgPlayerUrl = "";
      let t1PlayerUrl = "";
      let combinedTeamDataArray = [];
      let combinedPlayerDataArray = [];

      // 根據選擇決定 URL
      if (gameType === "regular") {
        plgTeamUrl = `/static/Standings/TeamData/P_Season_Teams_Performance_${season}.json`;
        t1TeamUrl = `/static/Standings/TeamData/T1_Season_Teams_Performance_${season}.json`;
        plgPlayerUrl = `/static/Standings/PlayerData/P_Players_performance_${season}.json`;
        t1PlayerUrl = `/static/Standings/PlayerData/T1_Players_performance_${season}.json`;
      } else if (gameType === "playoff") {
        plgTeamUrl = `/static/Standings/TeamData/P_Season_Teams_Playoff_Performance_${season}.json`;
        t1TeamUrl = `/static/Standings/TeamData/T1_Season_Teams_Playoff_Performance_${season}.json`;
        plgPlayerUrl = `/static/Standings/PlayerData/P_Season_Players_Playoff_Performance_${season}.json`;
        t1PlayerUrl = `/static/Standings/PlayerData/T1_Season_Playoff_Players_Performance_${season}.json`;
      } else if (gameType === "final") {
        plgTeamUrl = `/static/Standings/TeamData/P_Season_Teams_Final_Performance_${season}.json`;
        t1TeamUrl = `/static/Standings/TeamData/T1_Season_Teams_Final_Performance_${season}.json`;
        plgPlayerUrl = `/static/Standings/PlayerData/P_Season_Players_Final_Performance_${season}.json`;
        t1PlayerUrl = `/static/Standings/PlayerData/T1_Season_Players_Final_Performance_${season}.json`;
      }

      // Fetch PLG 資料
      try {
        const plgTeamResponse = await fetch(plgTeamUrl);
        if (plgTeamResponse.ok) {
          const plgTeamData = await plgTeamResponse.json();
          combinedTeamDataArray = [...combinedTeamDataArray, ...plgTeamData];
        }
      } catch (error) {
        console.error(`Error fetching PLG team data for ${season}:`, error);
      }

      try {
        const plgPlayerResponse = await fetch(plgPlayerUrl);
        if (plgPlayerResponse.ok) {
          const plgPlayerData = await plgPlayerResponse.json();
          combinedPlayerDataArray = [
            ...combinedPlayerDataArray,
            ...plgPlayerData,
          ];
        }
      } catch (error) {
        console.error(`Error fetching PLG player data for ${season}:`, error);
      }

      // Fetch T1 資料
      try {
        const t1TeamResponse = await fetch(t1TeamUrl);
        if (t1TeamResponse.ok) {
          const t1TeamData = await t1TeamResponse.json();
          combinedTeamDataArray = [...combinedTeamDataArray, ...t1TeamData];
        }
      } catch (error) {
        console.warn(`No T1 team data for ${season}.`);
      }

      try {
        const t1PlayerResponse = await fetch(t1PlayerUrl);
        if (t1PlayerResponse.ok) {
          const t1PlayerData = await t1PlayerResponse.json();
          combinedPlayerDataArray = [
            ...combinedPlayerDataArray,
            ...t1PlayerData,
          ];
        }
      } catch (error) {
        console.warn(`No T1 player data for ${season}.`);
      }

      // 更新資料
      setCombinedTeamData(combinedTeamDataArray);
      setCombinedPlayerData(combinedPlayerDataArray);
    };

    fetchData();
  }, [season, gameType, noData]);

  // 依數據進行排序並取前五名
  const getTopFive = (data, key) => {
    return [...data]
      .sort((a, b) => b[key] - a[key]) // 依據key進行排序
      .slice(0, 5); // 取前五名
  };
  // 過濾場均上場時間超過 10 分鐘的球員 且出賽超過10場
  const filterPlayersByMinutes = (data) => {
    return data.filter(
      (player) =>
        player.minutes > "00:10:00" && // 確保時間格式正確
        player.game_played > 10 // 直接比較數字
    );
  };

  // 使用 teamLogoMapping 顯示球隊圖片
  const getTeamLogo = (teamName) => {
    return teamLogoMapping[teamName] || "default.png"; // 如果沒有匹配的名稱，顯示預設圖片
  };

  // 卡片結構
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
          <option value="23_24">2023-24</option>
          <option value="22_23">2022-23</option>
          <option value="21_22">2021-22</option>
          <option value="20_21">2020-21</option>
        </select>
      </div>

      {noData ? (
        <div className="no-data-message">查無資料</div>
      ) : (
        <div className="stats-sections">
          {/* 球隊數據卡片 */}
          <div className="team-stats">
            <div className="Leaders">
              <h3>Team Leaders</h3>
              <h4>球隊數據排行</h4>
            </div>
            {renderCard("得分", combinedTeamData, "team", "points", true)}

            {renderCard(
              "二分FG%",
              combinedTeamData,
              "team",
              "field_goals_two_pct",
              true
            )}
            {renderCard(
              "三分命中",
              combinedTeamData,
              "team",
              "field_goals_three_made",
              true
            )}
            {renderCard(
              "三分FG%",
              combinedTeamData,
              "team",
              "field_goals_three_pct",
              true
            )}
            {renderCard(
              "罰球FG%",
              combinedTeamData,
              "team",
              "free_throws_pct",
              true
            )}
            {renderCard("籃板", combinedTeamData, "team", "rebounds", true)}
            {renderCard("助攻", combinedTeamData, "team", "assists", true)}
            {renderCard("抄截", combinedTeamData, "team", "steals", true)}
            {renderCard("阻攻", combinedTeamData, "team", "blocks", true)}
            {renderCard("失誤", combinedTeamData, "team", "turnovers", true)}
            {renderCard("犯規", combinedTeamData, "team", "fouls", true)}
          </div>

          {/* 球員數據卡片 */}
          <div className="player-stats">
            <div className="Leaders">
              <h3>Player Leaders</h3>
              <h4>球員數據排行 </h4>
            </div>
            {renderCard(
              "得分",
              filterPlayersByMinutes(combinedPlayerData),
              "player",
              "points",
              false
            )}
            {renderCard(
              "二分FG%",
              filterPlayersByMinutes(combinedPlayerData),
              "player",
              "field_goals_two_pct",
              false
            )}
            {renderCard(
              "三分命中",
              filterPlayersByMinutes(combinedPlayerData),
              "player",
              "field_goals_three_made",
              false
            )}
            {renderCard(
              "三分FG%",
              filterPlayersByMinutes(combinedPlayerData),
              "player",
              "field_goals_three_pct",
              false
            )}
            {renderCard(
              "罰球FG%",
              filterPlayersByMinutes(combinedPlayerData),
              "player",
              "free_throws_pct",
              false
            )}
            {renderCard(
              "籃板",
              filterPlayersByMinutes(combinedPlayerData),
              "player",
              "rebounds",
              false
            )}
            {renderCard(
              "助攻",
              filterPlayersByMinutes(combinedPlayerData),
              "player",
              "assists",
              false
            )}
            {renderCard(
              "抄截",
              filterPlayersByMinutes(combinedPlayerData),
              "player",
              "steals",
              false
            )}
            {renderCard(
              "阻攻",
              filterPlayersByMinutes(combinedPlayerData),
              "player",
              "blocks",
              false
            )}
            {renderCard(
              "失誤",
              filterPlayersByMinutes(combinedPlayerData),
              "player",
              "turnovers",
              false
            )}
            {renderCard(
              "犯規",
              filterPlayersByMinutes(combinedPlayerData),
              "player",
              "fouls",
              false
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rank;
