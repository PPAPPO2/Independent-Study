import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import Select from "react-select";
import "../styles/ShowMore.css";

const ShowMore = () => {
  const [season, setSeason] = useState("24-25"); // 預設年分
  const [gameType, setGameType] = useState("regular"); // 預設資料類型：例行賽、季後賽或冠軍賽
  const [selectedTeams, setSelectedTeams] = useState([]); // 預設全選
  const [data, setData] = useState([]); // 預設為空陣列
  const [isAscending, setIsAscending] = useState(true);
  const [currentSortColumn, setCurrentSortColumn] = useState(null);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  // 定義動畫效果，隨著資料變化觸發
  const tableAnimation = useSpring({
    opacity: animationTrigger ? 1 : 0.7, // 當動畫觸發器為 true，表格淡入
    transform: animationTrigger ? "translateY(0)" : "translateY(0)", // 下滑動畫
    config: { duration: 200 },
  });
  // 每次篩選條件或資料改變時重置動畫
  useEffect(() => {
    setAnimationTrigger(false); // 關閉動畫
    setTimeout(() => {
      setAnimationTrigger(true); // 啟動動畫
    }, 350); // 設置一個短暫的延遲，重置動畫
  }, [season, gameType, selectedTeams]);

  // 統一管理球隊和資料類型的選項
  const config = {
    seasons: {
      "24_25": [
        { value: "臺北富邦勇士", label: "勇士" },
        { value: "新北國王", label: "國王" },
        { value: "高雄17直播鋼鐵人", label: "鋼鐵人" },
        { value: "桃園璞園領航猿", label: "領航猿" },
        { value: "福爾摩沙夢想家", label: "夢想家" },
        { value: "新竹御嵿攻城獅", label: "攻城獅" },
        { value: "新北中信特攻", label: "特攻" },
        { value: "桃園台啤永豐雲豹", label: "雲豹" },
        { value: "臺北台新戰神", label: "戰神" },
        { value: "高雄全家海神", label: "海神" },
        { value: "臺南台鋼獵鷹", label: "獵鷹" },
      ],
      "23_24": [
        { value: "臺北富邦勇士", label: "勇士" },
        { value: "新北國王", label: "國王" },
        { value: "高雄17直播鋼鐵人", label: "鋼鐵人" },
        { value: "桃園璞園領航猿", label: "領航猿" },
        { value: "福爾摩沙夢想家", label: "夢想家" },
        { value: "新竹御頂攻城獅", label: "攻城獅" },
        { value: "新北中信特攻", label: "特攻" },
        { value: "台啤永豐雲豹", label: "雲豹" },
        { value: "臺北戰神", label: "戰神" },
        { value: "高雄全家海神", label: "海神" },
        { value: "臺南台鋼獵鷹", label: "獵鷹" },
      ],
      "22_23": [
        { value: "臺北富邦勇士", label: "勇士" },
        { value: "桃園璞園領航猿", label: "領航猿" },
        { value: "福爾摩沙夢想家", label: "夢想家" },
        { value: "新竹攻城獅", label: "攻城獅" },
        { value: "新北國王", label: "國王" },
        { value: "高雄17直播鋼鐵人", label: "鋼鐵人" },
        { value: "新北中信特攻", label: "特攻" },
        { value: "臺南台鋼獵鷹", label: "獵鷹" },
        { value: "臺中太陽", label: "太陽" },
        { value: "高雄全家海神", label: "海神" },
        { value: "台啤永豐雲豹", label: "雲豹" },
        { value: "台灣啤酒英熊", label: "英熊" },
      ],
      "21_22": [
        { value: "臺北富邦勇士", label: "勇士" },
        { value: "桃園領航猿", label: "領航猿" },
        { value: "福爾摩沙台新夢想家", label: "夢想家" },
        { value: "新竹街口攻城獅", label: "攻城獅" },
        { value: "新北國王", label: "國王" },
        { value: "高雄鋼鐵人", label: "鋼鐵人" },
        { value: "新北中信特攻", label: "特攻" },
        { value: "台灣啤酒英熊", label: "英熊" },
        { value: "臺中太陽", label: "太陽" },
        { value: "高雄全家海神", label: "海神" },
        { value: "臺南台鋼獵鷹", label: "獵鷹" },
      ],
      "20_21": [
        { value: "臺北富邦勇士", label: "勇士" },
        { value: "桃園領航猿", label: "領航猿" },
        { value: "福爾摩沙台新夢想家", label: "夢想家" },
        { value: "新竹街口攻城獅", label: "攻城獅" },
      ],
    },
    dataTypes: {
      regular: "Performance",
      playoff: "Playoff_Performance",
      final: "Final_Performance",
    },
  };
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
    新竹御嵿攻城獅: "新竹御頂攻城獅.png",
    新竹攻城獅: "新竹御頂攻城獅.png",
    新北中信特攻: "新北中信特攻.png",
    台啤永豐雲豹: "台啤永豐雲豹.png",
    桃園台啤永豐雲豹: "台啤永豐雲豹.png",
    臺北戰神: "臺北戰神.png",
    臺北台新戰神: "臺北戰神.png",
    高雄全家海神: "高雄全家海神.png",
    臺南台鋼獵鷹: "臺南台鋼獵鷹.png",
    臺中太陽: "臺中太陽.png",
    台灣啤酒英熊: "台灣啤酒英熊.png",
  };

  const columnMapping = {
    球隊: "team",
    得分: "points",
    投籃命中: "All_goals_made",
    投籃出手: "All_goals",
    投籃FG: "All_goals_pct",
    二分命中: "field_goals_two_made",
    二分出手: "field_goals_two",
    二分FG: "field_goals_two_pct",
    三分命中: "field_goals_three_made",
    三分出手: "field_goals_three",
    三分FG: "field_goals_three_pct",
    罰球命中: "free_throws_made",
    罰球出手: "free_throws",
    罰球FG: "free_throws_pct",
    進攻籃板: "offensive_rebounds",
    防守籃板: "defensive_rebounds",
    籃板: "rebounds",
    助攻: "assists",
    抄截: "steals",
    阻攻: "blocks",
    失誤: "turnovers",
    犯規: "fouls",
  };
  // 預設進入頁面時自動全選球隊
  useEffect(() => {
    setSeason("24-25");
    setGameType("regular");
    setSelectedTeams(config.seasons["24_25"].map((team) => team.value));
  }, []);
  // 抓取資料並更新表格
  useEffect(() => {
    const fetchData = async () => {
      let combinedDataArray = [];
      let plgUrl = "";
      let t1Url = "";

      // 根據 gameType 和 season 決定 URL
      if (gameType === "regular") {
        plgUrl = `/static/Standings/TeamData/P_Season_Teams_Performance_${season.replace(
          "-",
          "_"
        )}.json`;
        t1Url = `/static/Standings/TeamData/T1_Season_Teams_Performance_${season.replace(
          "-",
          "_"
        )}.json`;
      } else if (gameType === "playoff") {
        plgUrl = `/static/Standings/TeamData/P_Season_Teams_Playoff_Performance_${season.replace(
          "-",
          "_"
        )}.json`;
        t1Url = `/static/Standings/TeamData/T1_Season_Teams_Playoff_Performance_${season.replace(
          "-",
          "_"
        )}.json`;
      } else if (gameType === "final") {
        plgUrl = `/static/Standings/TeamData/P_Season_Teams_Final_Performance_${season.replace(
          "-",
          "_"
        )}.json`;
        t1Url = `/static/Standings/TeamData/T1_Season_Teams_Final_Performance_${season.replace(
          "-",
          "_"
        )}.json`;
      }

      // Fetch PLG 資料
      try {
        const plgResponse = await fetch(plgUrl);
        if (plgResponse.ok) {
          const plgData = await plgResponse.json();
          combinedDataArray = [...combinedDataArray, ...plgData];
        }
      } catch (error) {
        console.error(`Error fetching PLG data for ${season}:`, error);
      }

      // Fetch T1 資料
      try {
        const t1Response = await fetch(t1Url);
        if (t1Response.ok) {
          const t1Data = await t1Response.json();
          combinedDataArray = [...combinedDataArray, ...t1Data];
        }
      } catch (error) {
        console.error(`Error fetching T1 data for ${season}:`, error);
      }

      const filteredData = Array.isArray(combinedDataArray)
        ? combinedDataArray.filter((teamData) =>
            selectedTeams.includes(teamData.team)
          )
        : [];

      setData(filteredData); // 更新資料
    };

    fetchData();
  }, [season, gameType, selectedTeams]);

  // 排序資料
  const sortTable = (column) => {
    setIsAscending((prev) => (currentSortColumn === column ? !prev : true));
    setCurrentSortColumn(column);

    const sortedData = [...data].sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      if (typeof aValue === "string" && aValue.includes("%")) {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (typeof aValue === "string" && !isNaN(aValue)) {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      return isAscending ? aValue - bValue : bValue - aValue;
    });

    setData(sortedData);
  };

  return (
    <div className="show-more-container">
      <h2>
        {season === "20-21"
          ? "❰ PLG 20-21 Teams Stats ❱"
          : `❰ PLG & T1 ${season.replace("20", "")} Teams Stats ❱`}
      </h2>

      <div className="season-team-select">
        {/* 賽事類型篩選器 */}
        <select value={gameType} onChange={(e) => setGameType(e.target.value)}>
          <option value="regular">例行賽</option>
          <option value="playoff">季後賽</option>
          <option value="final">冠軍賽</option>
        </select>

        <select
          value={season}
          onChange={(e) => {
            setSeason(e.target.value);
            setSelectedTeams(
              config.seasons[e.target.value.replace("-", "_")].map(
                (team) => team.value
              )
            );
          }}
        >
          {Object.keys(config.seasons).map((seasonKey) => (
            <option key={seasonKey} value={seasonKey.replace("_", "-")}>
              {"20" + seasonKey.replace("_", "-")}
            </option>
          ))}
        </select>

        {/* 使用 react-select 來實現多選球隊功能 */}
        <Select
          options={[
            { label: "全選球隊", value: "all" }, // 新增 "全選球隊" 選項
            ...(config.seasons[season.replace("-", "_")] || []),
          ]}
          isMulti
          value={
            selectedTeams.length ===
            config.seasons[season.replace("-", "_")].length
              ? [{ label: "全選球隊", value: "all" }]
              : (config.seasons[season.replace("-", "_")] || []).filter(
                  (team) => selectedTeams.includes(team.value)
                )
          }
          onChange={(selected) => {
            if (selected && selected.some((team) => team.value === "all")) {
              // 如果選擇了 "全選球隊"，全選所有球隊
              setSelectedTeams(
                config.seasons[season.replace("-", "_")].map(
                  (team) => team.value
                )
              );
            } else {
              setSelectedTeams(
                selected ? selected.map((team) => team.value) : []
              );
            }
          }}
          placeholder="選擇球隊"
          className="team-select"
          classNamePrefix="react-select"
        />
      </div>

      <div className="table-container">
        {/* 如果沒有資料，顯示提示訊息 */}
        {data.length === 0 ? (
          <div className="no-data-message">查無資料</div>
        ) : (
          <animated.div style={tableAnimation}>
            <table className="showMoreTable">
              <thead>
                <tr>
                  {Object.keys(columnMapping).map((key) => (
                    <th key={key} onClick={() => sortTable(columnMapping[key])}>
                      {key}{" "}
                      {currentSortColumn === columnMapping[key] ? (
                        isAscending ? (
                          <span className="sort-arrow">▲</span>
                        ) : (
                          <span className="sort-arrow">▼</span>
                        )
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((teamData, index) => (
                  <tr key={index}>
                    {Object.keys(columnMapping).map((key) => {
                      if (key === "球隊") {
                        // 如果是球隊欄位，加入Logo圖片
                        return (
                          <td key={key}>
                            <img
                              src={`/images/icon/${
                                teamLogoMapping[teamData.team]
                              }`}
                              alt={teamData.team}
                              style={{
                                width: "30px",
                                height: "30px",
                                marginRight: "10px",
                              }}
                            />
                            {teamData[columnMapping[key]]}
                          </td>
                        );
                      } else {
                        // 其他欄位保持不變
                        return (
                          <td key={key}>{teamData[columnMapping[key]]}</td>
                        );
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </animated.div>
        )}{" "}
      </div>
    </div>
  );
};

export default ShowMore;
