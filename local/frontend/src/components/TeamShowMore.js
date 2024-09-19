import React, { useEffect, useState } from "react";
import "../styles/ShowMore.css";

const staticUrl = "/static/Standings/TeamData/";

const ShowMore = () => {
  const [season, setSeason] = useState("2023-24");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [data, setData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [currentSortColumn, setCurrentSortColumn] = useState(null);

  const teams = {
    "2023-24": [
      { id: 1, name: "臺北富邦勇士" },
      { id: 2, name: "桃園璞園領航猿" },
      { id: 3, name: "福爾摩沙夢想家" },
      { id: 4, name: "新竹御頂攻城獅" },
      { id: 5, name: "新北國王" },
      { id: 6, name: "高雄17直播鋼鐵人" },
      { id: 7, name: "新北中信特攻" },
      { id: 8, name: "台啤永豐雲豹" },
      { id: 9, name: "高雄全家海神" },
      { id: 10, name: "臺北戰神" },
      { id: 11, name: "臺南台鋼獵鷹" },
    ],
    "2022-23": [
      { id: 1, name: "臺北富邦勇士" },
      { id: 2, name: "桃園璞園領航猿" },
      { id: 3, name: "福爾摩沙夢想家" },
      { id: 19, name: "新竹攻城獅" },
      { id: 5, name: "新北國王" },
      { id: 6, name: "高雄17直播鋼鐵人" },
      { id: 7, name: "新北中信特攻" },
      { id: 11, name: "臺南台鋼獵鷹" },
      { id: 9, name: "高雄全家海神" },
      { id: 12, name: "臺中太陽" },
      { id: 13, name: "桃園永豐雲豹" },
      { id: 14, name: "台灣啤酒英熊" },
    ],
    "2021-22": [
      { id: 1, name: "臺北富邦勇士" },
      { id: 15, name: "桃園領航猿" },
      { id: 17, name: "福爾摩沙台新夢想家" },
      { id: 16, name: "新竹街口攻城獅" },
      { id: 5, name: "新北國王" },
      { id: 18, name: "高雄鋼鐵人" },
      { id: 7, name: "新北中信特攻" },
      { id: 11, name: "臺南台鋼獵鷹" },
      { id: 9, name: "高雄全家海神" },
      { id: 12, name: "臺中太陽" },
      { id: 14, name: "台灣啤酒英熊" },
    ],
    "2020-21": [
      { id: 1, name: "臺北富邦勇士" },
      { id: 15, name: "桃園領航猿" },
      { id: 17, name: "福爾摩沙台新夢想家" },
      { id: 16, name: "新竹街口攻城獅" },
    ],
  };

  const columnMapping = {
    球隊: "team",
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
    updateTable();
  }, [season, selectedTeams]);

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
    setSelectedTeams([]);
  };

  const handleTeamSelectChange = (teamId) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const updateTable = () => {
    const jsonUrl = `${staticUrl}${season}.json`;
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((teamData) =>
          selectedTeams.includes(teamData.id.toString())
        );
        setData(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

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
        {season === "20_21"
          ? "PLG 20-21 League Roster"
          : `PLG & T1 ${season.replace("20", "")} League Roster`}
      </h2>
      <div className="season-team-select">
        <select
          value={season}
          onChange={handleSeasonChange}
          className="season-select"
        >
          <option value="2023-24">2023-24</option>
          <option value="2022-23">2022-23</option>
          <option value="2021-22">2021-22</option>
          <option value="2020-21">2020-21</option>
        </select>

        <div className="team-select-container">
          {teams[season].map((team) => (
            <label key={team.id}>
              <input
                type="checkbox"
                value={team.id}
                checked={selectedTeams.includes(team.id.toString())}
                onChange={() => handleTeamSelectChange(team.id.toString())}
                className="team-select"
              />
              {team.name}
            </label>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="showMoreTable">
          <thead>
            <tr>
              {Object.keys(columnMapping).map((key) => (
                <th key={key} onClick={() => sortTable(columnMapping[key])}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((teamData, index) => (
              <tr key={index}>
                {Object.keys(columnMapping).map((key) => (
                  <td key={key}>{teamData[columnMapping[key]]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowMore;
