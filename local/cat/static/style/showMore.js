document.addEventListener("DOMContentLoaded", function () {
  const seasonSelect = document.getElementById("seasonSelect");
  const teamSelect = document.getElementById("teamSelect");
  const tableBody = document.getElementById("tableBody");

  const staticUrl = document
    .querySelector("main")
    .getAttribute("data-static-url");

  const teams = [
    { id: 7, name: "新北中信特攻" },
    { id: 8, name: "台啤永豐雲豹" },
    { id: 9, name: "高雄全家海神" },
    { id: 10, name: "臺北戰神" },
    { id: 11, name: "臺南台鋼獵鷹" },
    { id: 12, name: "臺中太陽" },
    { id: 13, name: "桃園永豐雲豹" },
    { id: 14, name: "台灣啤酒英熊" },
  ];

  teams.forEach((team) => {
    const option = document.createElement("option");
    option.value = team.id;
    option.textContent = team.name;
    teamSelect.appendChild(option);
  });

  updateTable();

  seasonSelect.addEventListener("change", updateTable);
  teamSelect.addEventListener("change", updateTable);

  const columnMapping = {
    球隊: "team",
    得分: "points",
    投籃命中: "All_goals_made",
    投籃出手: "All_goals",
    投籃命中率: "All_goals_pct",
    二分命中: "field_goals_two_made",
    二分出手: "field_goals_two",
    二分命中率: "field_goals_two_pct",
    三分命中: "field_goals_three_made",
    三分出手: "field_goals_three",
    三分命中率: "field_goals_three_pct",
    罰球命中: "free_throws_made",
    罰球出手: "free_throws",
    罰球命中率: "free_throws_pct",
    進攻籃板: "offensive_rebounds",
    防守籃板: "defensive_rebounds",
    籃板: "rebounds",
    助攻: "assists",
    抄截: "steals",
    阻攻: "blocks",
    失誤: "turnovers",
    犯規: "fouls",
  };

  function updateTable() {
    const selectedSeason = seasonSelect.value;
    const selectedTeams = Array.from(teamSelect.selectedOptions).map(
      (option) => option.value
    );

    tableBody.innerHTML = "";

    const jsonUrl = `${staticUrl}${selectedSeason}.json`;

    fetch(jsonUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const filteredData = data.filter((teamData) =>
          selectedTeams.includes(teamData.id.toString())
        );

        filteredData.forEach((teamData) => {
          const row = document.createElement("tr");
          Object.keys(teamData).forEach((key) => {
            if (key === "id") return; // 忽略 teamId 不顯示在網頁上
            const cell = document.createElement("td");
            const columnHeader = columnMapping[key] || key;
            cell.textContent = teamData[columnHeader];
            row.appendChild(cell);
          });
          tableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
});
