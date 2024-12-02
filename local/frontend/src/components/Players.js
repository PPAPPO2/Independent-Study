import React, { useEffect, useState, useRef } from "react";
import Select from "react-select"; // 引入 react-select
import { useSpring, animated } from "react-spring";
import "../styles/Players.css";

const Players = () => {
  const [pData, setPData] = useState([]);
  const [t1Data, setT1Data] = useState([]);
  const [selectedYear, setSelectedYear] = useState("24_25"); // 預設年份
  const [selectedDataType, setSelectedDataType] = useState("regular"); // 新增：資料類型 (regular: 例行賽, playoff: 季後賽, final: 冠軍賽)
  const [combinedData, setCombinedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]); // 動態更新的球隊選項
  const [animationTrigger, setAnimationTrigger] = useState(false);
  // 篩選條件
  const [searchTerm, setSearchTerm] = useState(""); // 搜尋條件
  const [selectedPosition, setSelectedPosition] = useState(""); // 位置
  const [selectedTeams, setSelectedTeams] = useState([]); // 複選球隊
  const [sortColumn, setSortColumn] = useState(""); // 排序欄位
  const [isAscending, setIsAscending] = useState(false); // 升序或降序
  const isInitialLoad = useRef(true);
  const resetSortState = () => {
    setSortColumn(""); // 重置排序欄位
    setIsAscending(false); // 重置為降序
  };

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
  }, [
    selectedYear,
    selectedDataType,
    selectedPosition,
    selectedTeams,
    searchTerm,
  ]);

  // 分頁相關
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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
    台鋼獵鷹: "臺南台鋼獵鷹.png",
    臺中太陽: "臺中太陽.png",
    台灣啤酒英熊: "台灣啤酒英熊.png",
  };

  const columnMapping = {
    球員: "player",
    背號: "jersey",
    位置: "position",
    球隊: "team",
    出賽: "game_played",
    場均上場時間: "minutes",
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

  // 根據年份更新球隊選項
  useEffect(() => {
    const teamOptionsByYear = {
      "24_25": [
        { value: "臺北富邦勇士", label: "勇士" },
        { value: "新北國王", label: "國王" },
        { value: "高雄鋼鐵人", label: "鋼鐵人" },
        { value: "桃園璞園領航猿", label: "領航猿" },
        { value: "福爾摩沙夢想家", label: "夢想家" },
        { value: "新竹御嵿攻城獅", label: "攻城獅" },
        { value: "新北中信特攻", label: "特攻" },
        { value: "桃園台啤永豐雲豹", label: "雲豹" },
        { value: "臺北台新戰神", label: "戰神" },
        { value: "高雄全家海神", label: "海神" },
        { value: "台鋼獵鷹", label: "獵鷹" },
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
        { value: "桃園領航猿", label: "領航猿" },
        { value: "福爾摩沙台新夢想家", label: "夢想家" },
        { value: "新竹街口攻城獅", label: "攻城獅" },
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
        { value: "高雄17直播鋼鐵人", label: "鋼鐵人" },
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
    };
    setTeamOptions(teamOptionsByYear[selectedYear] || []); // 根據年份設置選項
  }, [selectedYear]);
  // 根據球員名稱取得大頭照圖片
  // 根據球員名稱取得大頭照圖片
  const getPlayerImage = (playerName) => {
    // 使用相對於 public 的路徑
    return `/images/players/${playerName}.png`;
  };
  useEffect(() => {
    const fetchData = async () => {
      let combinedDataArray = [];
      let plgUrl = "";
      let t1Url = "";
      // 根據資料類型決定抓取的 URL
      if (selectedDataType === "regular") {
        plgUrl = `/static/Standings/PlayerData/P_Players_performance_${selectedYear}.json`;
        t1Url = `/static/Standings/PlayerData/T1_Players_performance_${selectedYear}.json`;
      } else if (selectedDataType === "playoff") {
        plgUrl = `/static/Standings/PlayerData/P_Season_Players_Playoff_Performance_${selectedYear}.json`;
        t1Url = `/static/Standings/PlayerData/T1_Season_Playoff_Players_Performance_${selectedYear}.json`;
      } else if (selectedDataType === "final") {
        plgUrl = `/static/Standings/PlayerData/P_Season_Players_Final_Performance_${selectedYear}.json`;
        t1Url = `/static/Standings/PlayerData/T1_Season_Players_Final_Performance_${selectedYear}.json`;
      }
      try {
        const plgResponse = await fetch(plgUrl);
        if (plgResponse.ok) {
          const plgData = await plgResponse.json();
          combinedDataArray = [...combinedDataArray, ...plgData];
        }
      } catch (error) {
        console.error(
          `Error fetching PLG data for year ${selectedYear}:`,
          error
        );
      }

      try {
        const t1Response = await fetch(t1Url);
        if (t1Response.ok) {
          const t1Data = await t1Response.json();
          combinedDataArray = [...combinedDataArray, ...t1Data];
        }
      } catch (error) {
        console.error(
          `Error fetching T1 data for year ${selectedYear}:`,
          error
        );
      }

      setCombinedData(combinedDataArray);
      setFilteredData(combinedDataArray);
    };
    fetchData();
  }, [selectedYear, selectedDataType]);

  // 篩選資料
  useEffect(() => {
    let filtered = combinedData;

    // 搜尋球員名稱
    if (searchTerm) {
      filtered = filtered.filter((player) =>
        player.player.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    //位置
    if (selectedPosition) {
      filtered = filtered.filter(
        (player) => player.position === selectedPosition
      );
    }
    //球隊
    if (selectedTeams.length > 0) {
      filtered = filtered.filter((player) =>
        selectedTeams.some((team) => team.value === player.team)
      );
    }

    setFilteredData(filtered);
  }, [selectedPosition, selectedTeams, combinedData, searchTerm]);

  // 排序資料
  const handleSort = (column, defaultAscending = false) => {
    if (filteredData.length === 0) return; // 若沒有資料則直接返回
    const sortedData = [...filteredData];
    const isNumber = !isNaN(sortedData[0]?.[columnMapping[column]]);
    const ascending = sortColumn === column ? !isAscending : defaultAscending;

    sortedData.sort((a, b) => {
      if (isNumber) {
        return isAscending
          ? a[columnMapping[column]] - b[columnMapping[column]]
          : b[columnMapping[column]] - a[columnMapping[column]];
      }
      return isAscending
        ? a[columnMapping[column]].localeCompare(b[columnMapping[column]])
        : b[columnMapping[column]].localeCompare(a[columnMapping[column]]);
    });

    setFilteredData(sortedData);
    setIsAscending(ascending); // 切換升序/降序
    setSortColumn(column);
  };
  useEffect(() => {
    // 只有在第一次資料載入時進行排序
    if (isInitialLoad.current && filteredData.length > 0) {
      handleSort("得分", false);
      isInitialLoad.current = false; // 更新為已經初始化過
    }
  }, [filteredData]);

  // 分頁處理
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 變更分頁
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="Players">
      <h2>
        {selectedYear === "20_21"
          ? "❰ PLG 20-21 League Roster ❱"
          : `❰ PLG & T1 ${selectedYear.replace("_", "-")} League Roster ❱`}
      </h2>

      <div className="selector">
        {/* 新增資料類型篩選器 */}
        <select
          id="data-type-select"
          onChange={(e) => {
            setSelectedDataType(e.target.value);
            setCurrentPage(1);
            resetSortState(); // 重置排序狀態
          }}
          value={selectedDataType}
        >
          <option value="regular">例行賽</option>
          <option value="playoff">季後賽</option>
          <option value="final">冠軍賽</option>
        </select>

        {/* 年份篩選 */}
        <select
          id="year-select"
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setCurrentPage(1);
            resetSortState(); // 重置排序狀態
          }}
          value={selectedYear}
        >
          <option value="24_25">2024-25</option>
          <option value="23_24">2023-24</option>
          <option value="22_23">2022-23</option>
          <option value="21_22">2021-22</option>
          <option value="20_21">2020-21</option>
        </select>
        {/* 位置篩選 */}
        <select
          id="position-select"
          onChange={(e) => {
            setSelectedPosition(e.target.value);
            setCurrentPage(1); // 每當選擇位置時，重置頁數到第一頁
            resetSortState(); // 重置排序狀態
          }}
          value={selectedPosition}
        >
          <option value="">所有位置</option>
          <option value="G">G</option>
          <option value="F">F</option>
          <option value="C">C</option>
        </select>

        {/* 球隊篩選器 (多選) */}
        <Select
          options={teamOptions}
          isMulti
          value={selectedTeams}
          onChange={(selected) => {
            setSelectedTeams(selected || []);
            setCurrentPage(1); //每當選擇球隊時，重置頁數到第一頁
            resetSortState(); // 重置排序狀態
          }}
          placeholder="選擇球隊"
          className="team-select"
          classNamePrefix="react-select"
        />
        {/* 搜尋球員 */}
        <input
          type="text"
          placeholder="搜尋球員姓名"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value); // 每次輸入都更新搜尋字串
            setCurrentPage(1); // 每次搜尋時重置頁數
          }}
        />
      </div>
      <div className="table-container">
        {/* 如果沒有資料，顯示提示訊息 */}
        {filteredData.length === 0 ? (
          <div className="no-data-message">查無資料</div>
        ) : (
          <animated.div style={tableAnimation}>
            <table className="datatable">
              <thead>
                <tr>
                  {Object.keys(columnMapping).map((header) => (
                    <th key={header} onClick={() => handleSort(header)}>
                      {header}{" "}
                      {sortColumn === header ? (
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
                {currentItems.map((player, index) => (
                  <tr key={index}>
                    {Object.keys(columnMapping).map((header) => {
                      if (header === "球員" && selectedYear === "24_25") {
                        // 如果是球員欄位，加入大頭照和文字
                        return (
                          <td key={header}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {/* 圖片部分 */}
                              <img
                                src={getPlayerImage(
                                  player[columnMapping[header]]
                                )}
                                alt={player[columnMapping[header]]}
                                onError={(e) => {
                                  e.target.src = "/images/players/default.png";
                                }} // 如果圖片加載失敗，使用 default.png
                                style={{
                                  width: "35px",
                                  height: "35px",
                                  marginRight: "10px",
                                  objectFit: "cover", // 圖片填滿容器並保持比例
                                  borderRadius: "50%", // 圖片變成圓形
                                  backgroundColor: "white",
                                }}
                              />
                              {/* 球員姓名 */}
                              {player[columnMapping[header]]}
                            </div>
                          </td>
                        );
                      } else if (header === "球隊") {
                        // 如果是球隊欄位，加入圖片和文字
                        return (
                          <td key={header}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {/* 圖片部分 */}
                              <img
                                src={`/images/icon/${
                                  teamLogoMapping[player[columnMapping[header]]]
                                }`}
                                alt={player[columnMapping[header]]}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  marginRight: "10px",
                                }}
                              />

                              {/* 球隊名稱 */}
                              {player[columnMapping[header]]}
                            </div>
                          </td>
                        );
                      }
                      // 保留其他欄位以及排序功能
                      return (
                        <td key={header}>{player[columnMapping[header]]}</td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </animated.div>
        )}
      </div>
      {/* 分頁控件 */}
      <div className="pagination">
        {/* 最前頁 */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1} // 禁用最前頁按鈕，如果已在第一頁
        >
          {"◀◀"}
        </button>
        {/* 上一頁 */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1} // 禁用上一頁按鈕，如果已在第一頁
        >
          {"◀"}
        </button>

        {/* 計算分頁範圍 */}
        {[...Array(totalPages)].map((_, i) => {
          const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
          const endPage = Math.min(startPage + 4, totalPages); // 顯示五個頁碼，或者到最後一頁
          if (i + 1 >= startPage && i + 1 <= endPage) {
            return (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            );
          }
          return null;
        })}

        {/* 下一頁 */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages} // 禁用下一頁按鈕，如果已在最後一頁
        >
          {"▶"}
        </button>
        {/* 最後頁 */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages} // 禁用最後頁按鈕，如果已在最後一頁
        >
          {"▶▶"}
        </button>
      </div>
    </div>
  );
};

export default Players;
