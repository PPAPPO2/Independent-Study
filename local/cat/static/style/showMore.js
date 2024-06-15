document.addEventListener("DOMContentLoaded", function () {
  const seasonSelect = document.getElementById("seasonSelect");
  const teamSelectInput = document.getElementById("teamSelectInput");
  const teamSelectDropdown = document.getElementById("teamSelectDropdown");
  const confirmTeamsBtn = document.getElementById("confirmTeamsBtn");
  const tableBody = document.getElementById("tableBody");

  const staticUrl = document
    .querySelector("main")
    .getAttribute("data-static-url");

  const teams = {
    "2023-24": [
      { id: 7, name: "新北中信特攻" },
      { id: 8, name: "台啤永豐雲豹" },
      { id: 9, name: "高雄全家海神" },
      { id: 10, name: "臺北戰神" },
      { id: 11, name: "臺南台鋼獵鷹" },
    ],
    "2022-23": [
      { id: 7, name: "新北中信特攻" },
      { id: 11, name: "臺南台鋼獵鷹" },
      { id: 9, name: "高雄全家海神" },
      { id: 12, name: "臺中太陽" },
      { id: 13, name: "桃園永豐雲豹" },
      { id: 14, name: "台灣啤酒英熊" },
    ],
    "2021-22": [
      { id: 7, name: "新北中信特攻" },
      { id: 11, name: "臺南台鋼獵鷹" },
      { id: 9, name: "高雄全家海神" },
      { id: 12, name: "臺中太陽" },
      { id: 14, name: "台灣啤酒英熊" },
    ],
  };

  let selectedTeams = [];

  populateTeamOptions(seasonSelect.value);

  updateTable();

  seasonSelect.addEventListener("change", function () {
    populateTeamOptions(seasonSelect.value);
    updateTable();
  });

  teamSelectInput.addEventListener("click", function () {
    teamSelectDropdown.style.display =
      teamSelectDropdown.style.display === "none" ? "block" : "none";
  });

  confirmTeamsBtn.addEventListener("click", function () {
    updateTable();
    teamSelectDropdown.style.display = "none";
  });

  const columnMapping = {
    球隊: "team",
    得分: "points",
    投籃命中: "All_goals_made",
    // ... 其他欄位映射
  };

  function populateTeamOptions(season) {
    teamSelectDropdown.innerHTML = "";
    const seasonTeams = teams[season] || [];
    seasonTeams.forEach((team) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = team.id;
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          selectedTeams.push(this.value);
          teamSelectInput.value = selectedTeams
            .map(
              (id) =>
                teams[season].find((team) => team.id === parseInt(id)).name
            )
            .join(", ");
        } else {
          selectedTeams = selectedTeams.filter((id) => id !== this.value);
          teamSelectInput.value = selectedTeams
            .map(
              (id) =>
                teams[season].find((team) => team.id === parseInt(id)).name
            )
            .join(", ");
        }
      });
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(team.name));
      teamSelectDropdown.appendChild(label);
    });
  }

  function updateTable() {
    const selectedSeason = seasonSelect.value;

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
            if (key === "id") return;
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
