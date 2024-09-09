import React, { useEffect, useState } from "react";
import "../styles/Players.css";

const staticUrl = "/static/Standings/PlayerData/";
const Players = () => {
  //const [pData, setPData] = useState([]);
  //const [t1Data, setT1Data] = useState([]);
  const [selectedYear, setSelectedYear] = useState("23_24"); // 預設年份
  const [combinedData, setCombinedData] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      let combinedDataArray = [];

      try {
        // 試著讀取 PLG 資料
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
        // 試著讀取 T1 資料
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
    };
    fetchData();
  }, [selectedYear]);

  // 獲取表頭 (排除掉id)
  const tableHeaders = Object.keys(columnMapping);

  // 處理年份選擇變更
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="Players">
      <div className="table-container">
        <h2>
          {selectedYear === "20_21"
            ? "PLG 20-21 League Roster"
            : `PLG & T1 ${selectedYear.replace("_", "-")} League Roster`}
        </h2>
        <h1></h1>
        <div className="year-selector">
          <select
            id="year-select"
            onChange={handleYearChange}
            value={selectedYear}
          >
            <option value="23_24">2023-24</option>
            <option value="22_23">2022-23</option>
            <option value="21_22">2021-22</option>
            <option value="20_21">2020-21</option>
          </select>
        </div>
        <table className="datatable">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {combinedData.map((player, index) => (
              <tr key={index}>
                {tableHeaders.map((header) => (
                  <td key={header}>{player[columnMapping[header]]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Players;
