import React, { useEffect, useState } from "react";
import Select from "react-select"; // 引入 react-select
import "../styles/Players.css";

const Players = () => {
  const [pData, setPData] = useState([]);
  const [t1Data, setT1Data] = useState([]);
  const [selectedYear, setSelectedYear] = useState("23_24"); // 預設年份
  const [combinedData, setCombinedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]); // 動態更新的球隊選項

  // 篩選條件
  const [selectedPosition, setSelectedPosition] = useState(""); // 位置
  const [selectedTeams, setSelectedTeams] = useState([]); // 複選球隊
  const [sortColumn, setSortColumn] = useState(""); // 排序欄位
  const [isAscending, setIsAscending] = useState(true); // 升序或降序

  // 分頁相關
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // 根據年份更新球隊選項
  useEffect(() => {
    const teamOptionsByYear = {
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

  useEffect(() => {
    const fetchData = async () => {
      let combinedDataArray = [];

      try {
        const plgResponse = await fetch(
          `/static/Standings/PlayerData/P_Players_performance_${selectedYear}.json`
        );
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
        const t1Response = await fetch(
          `/static/Standings/PlayerData/T1_Players_performance_${selectedYear}.json`
        );
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

      setCombinedData(combinedDataArray); // 更新合併後的資料
      setFilteredData(combinedDataArray); // 初始化篩選後的資料
    };
    fetchData();
  }, [selectedYear]);

  // 篩選資料
  useEffect(() => {
    let filtered = combinedData;

    if (selectedPosition) {
      filtered = filtered.filter(
        (player) => player.position === selectedPosition
      );
    }

    if (selectedTeams.length > 0) {
      filtered = filtered.filter((player) =>
        selectedTeams.some((team) => team.value === player.team)
      );
    }

    setFilteredData(filtered);
  }, [selectedPosition, selectedTeams, combinedData]);

  // 排序資料
  const handleSort = (column) => {
    const sortedData = [...filteredData];
    const isNumber = !isNaN(sortedData[0]?.[columnMapping[column]]);

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
    setIsAscending(!isAscending); // 切換升序/降序
    setSortColumn(column);
  };

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
          ? "PLG 20-21 League Roster"
          : `PLG & T1 ${selectedYear.replace("_", "-")} League Roster`}
      </h2>
      {/* 年份篩選 */}
      <div className="year-selector">
        <select
          id="year-select"
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
        >
          <option value="23_24">2023-24</option>
          <option value="22_23">2022-23</option>
          <option value="21_22">2021-22</option>
          <option value="20_21">2020-21</option>
        </select>
      </div>

      {/* 篩選器 */}
      <div className="position-selector">
        {/* 位置篩選 */}
        <select
          id="position-select"
          onChange={(e) => setSelectedPosition(e.target.value)}
          value={selectedPosition}
        >
          <option value="">所有位置</option>
          <option value="G">G</option>
          <option value="F">F</option>
          <option value="C">C</option>
        </select>

        {/* 球隊篩選器 (react-select 多選) */}
        <div className="team-selector">
          <Select
            options={teamOptions}
            isMulti
            value={selectedTeams}
            onChange={(selected) => setSelectedTeams(selected || [])}
            placeholder="選擇球隊"
            className="team-select"
            classNamePrefix="react-select"
          />
        </div>
      </div>
      <div className="table-container">
        {/* 分頁 & 表格 */}
        <table className="datatable">
          <thead>
            <tr>
              {Object.keys(columnMapping).map((header) => (
                <th key={header} onClick={() => handleSort(header)}>
                  {header}{" "}
                  {sortColumn === header ? (isAscending ? "↑" : "↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((player, index) => (
              <tr key={index}>
                {Object.keys(columnMapping).map((header) => (
                  <td key={header}>{player[columnMapping[header]]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 分頁控件 */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Players;
