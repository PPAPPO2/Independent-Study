document.addEventListener("DOMContentLoaded", function () {
  const seasonSelect = document.getElementById("seasonSelect");
  const teamSelectInput = document.getElementById("teamSelectInput");
  const teamSelectDropdown = document.getElementById("teamSelectDropdown");
  const confirmTeamsBtn = document.getElementById("confirmTeamsBtn");
  const tableBody = document.getElementById("tableBody");

  const staticUrl = document
    .querySelector("main")
    .getAttribute("data-static-url");

  //選取球隊id與球隊名稱
  const teams = {
    "2023-24": [
      { id: 1, name: "臺北富邦勇士" },
      { id: 2, name: "桃園璞園領航員" },
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
      { id: 2, name: "桃園璞園領航員" },
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
      { id: 15, name: "桃園領航員" },
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
      { id: 15, name: "桃園領航員" },
      { id: 17, name: "福爾摩沙台新夢想家" },
      { id: 16, name: "新竹街口攻城獅" },
    ],
  };

  let selectedTeams = [];
  let currentSortColumn = null;
  let isAscending = true;
  populateTeamOptions(seasonSelect.value);

  updateTable(); //初始化表格

  //監聽設置
  //選擇賽季時，清空選擇球隊
  seasonSelect.addEventListener("change", function () {
    populateTeamOptions(seasonSelect.value);
    selectedTeams = [];
    teamSelectInput.value = "";
    updateTable();
  });
  //選擇球隊輸入框的下拉式選單
  teamSelectInput.addEventListener("click", function () {
    teamSelectDropdown.style.display =
      teamSelectDropdown.style.display === "none" ? "block" : "none";
  });
  //確認選擇後關閉下拉選單。
  confirmTeamsBtn.addEventListener("click", function () {
    updateTable();
    teamSelectDropdown.style.display = "none";
  });

  //中文列名映射到json中的鍵名
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

  //根據選擇的賽季而抓取當賽季的球隊資料
  //避免選擇賽季後出現已解散或合併的球隊資料
  function populateTeamOptions(season) {
    teamSelectDropdown.innerHTML = ""; // 清空下拉選單的內容
    const seasonTeams = teams[season] || []; // 獲取該賽季的球隊數據，如果沒有設置為空數組
    seasonTeams.forEach((team) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox"; // 設置複選框的類型為 checkbox
      checkbox.value = team.id;
      checkbox.addEventListener("change", function () {
        // 為複選框添加變更事件監聽器
        if (this.checked) {
          //複選框被選中
          selectedTeams.push(this.value); // 將球隊的 id 添加到 selectedTeams 數組中
          teamSelectInput.value = selectedTeams
            .map(
              (id) =>
                teams[season].find((team) => team.id === parseInt(id)).name
            )
            .join(", "); // 將選中的球隊名稱顯示在 teamSelectInput 中
        } else {
          // 如果複選框被取消選中
          selectedTeams = selectedTeams.filter((id) => id !== this.value);
          teamSelectInput.value = selectedTeams
            .map(
              (id) =>
                teams[season].find((team) => team.id === parseInt(id)).name
            )
            .join(", "); // 更新 teamSelectInput 中顯示的球隊名稱
        }
      });
      label.appendChild(checkbox); // 將複選框添加到標籤中
      label.appendChild(document.createTextNode(team.name)); // 將球隊名稱添加到標籤中
      teamSelectDropdown.appendChild(label); // 將標籤添加到下拉選單中
    });
  }
  //更新表格內容
  function updateTable() {
    const selectedSeason = seasonSelect.value; //獲得選取賽季
    tableBody.innerHTML = "";
    const jsonUrl = `${staticUrl}${selectedSeason}.json`; //根據選擇的賽季生成相應的JSON URL

    fetch(jsonUrl)
      .then((response) => {
        if (!response.ok) {
          //請求失敗的話
          throw new Error("Network response was not ok " + response.statusText); //錯誤訊息
        }
        return response.json();
      })
      .then((data) => {
        //請求成功後
        const filteredData = data.filter((teamData) =>
          selectedTeams.includes(teamData.id.toString())
        ); //只保留選中的球隊數據

        // 添加表頭點擊事件
        const tableHeader = document.querySelector("thead tr");
        tableHeader.innerHTML = "";
        Object.keys(columnMapping).forEach((key) => {
          const th = document.createElement("th"); // 創建新的表頭單元格
          th.textContent = key; // 設置th=key
          th.addEventListener("click", () =>
            sortTable(columnMapping[key], filteredData)
          ); //點擊事件，增加排序功能
          tableHeader.appendChild(th);
        });

        renderTableBody(filteredData); //渲染表格
      })
      .catch((error) => {
        console.error("Error fetching data:", error); //錯誤訊息
      });
  }

  function renderTableBody(data) {
    //渲染表格
    tableBody.innerHTML = "";
    data.forEach((teamData) => {
      const row = document.createElement("tr"); //新的表格行
      Object.keys(columnMapping).forEach((key) => {
        const cell = document.createElement("td"); //新的表格列
        const columnHeader = columnMapping[key]; //獲得對應的key
        cell.textContent = teamData[columnHeader]; //對應文本數據
        row.appendChild(cell); //添加資料
      });
      tableBody.appendChild(row); //添加資料
    });
  }

  function sortTable(column, data) {
    //排序功能
    if (currentSortColumn === column) {
      isAscending = !isAscending; // 如果當前排序的列與點擊的列相同，則切換排序順序（升序或降序）
    } else {
      isAscending = true; //預設為升序排列
    }
    currentSortColumn = column; // 更新當前排序的列

    data.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      // 處理百分比
      if (typeof aValue === "string" && aValue.includes("%")) {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      // 處理數字字符串
      else if (typeof aValue === "string" && !isNaN(aValue)) {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      if (!isNaN(aValue) && !isNaN(bValue)) {
        return isAscending ? aValue - bValue : bValue - aValue; // 根據排序順序進行數字比較
      } else {
        return isAscending
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue); // 根據排序順序進行字符串比較
      }
    });

    renderTableBody(data); // 使用排序後的數據重新渲染表格
  }
});
