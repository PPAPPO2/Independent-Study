// 引入必要的 React 和圖表相關套件
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Radar, Pie } from "react-chartjs-2";
import {
  Box,
  Card,
  Grid2,
  CardContent,
  Typography,
  Container,
  FormControl,
  Select,
  MenuItem,
  ButtonGroup,
  Button,
} from "@mui/material";
import "../styles/Predict.css";
import {
  cardStyle,
  titleStyle,
  chartContainerStyle,
  radarOptions,
  commonChartOptions,
  radarData,
  scoreComparisonData,
  shootingPercentageData,
  transparentize,
} from "./PredictConfig.js";

// 註冊必要的圖表元件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // 狀態管理
  const [teamType, setTeamType] = useState({
    teamA: "home",
    teamB: "away",
  });

  const [selectedTeams, setSelectedTeams] = useState({
    teamA: "臺北富邦勇士",
    teamB: "新北國王",
  });
  const [stats, setStats] = useState({ homeTeam: [], awayTeam: [] });

  // 定義所有可選擇的隊伍
  const teams = [
    "臺北富邦勇士",
    "新北國王",
    "高雄鋼鐵人",
    "桃園璞園領航猿",
    "福爾摩沙夢想家",
    "新竹御嵿攻城獅",
    "新北中信特攻",
    "台啤永豐雲豹",
    "臺北戰神",
    "高雄全家海神",
    "台鋼獵鷹",
  ];

  // 處理主客場切換
  const handleTeamTypeChange = (team, type) => {
    setTeamType((prev) => ({
      ...prev,
      [team]: type,
      [team === "teamA" ? "teamB" : "teamA"]: type === "home" ? "away" : "home",
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const homeTeam =
        teamType.teamA === "home" ? selectedTeams.teamA : selectedTeams.teamB;
      const awayTeam =
        teamType.teamA === "home" ? selectedTeams.teamB : selectedTeams.teamA;
  
      if (!homeTeam || !awayTeam) {
        console.error("未選擇完整的主客隊伍");
        return;
      }
  
      try {
        // API 請求
        const response = await fetch(
          `http://127.0.0.1:8000/cat/api/home-away-stats/?homeTeam=${encodeURIComponent(
            homeTeam
          )}&awayTeam=${encodeURIComponent(awayTeam)}`
        );
        const data = await response.json();
  
        if (!response.ok) {
          console.error("API 回傳錯誤：", data.error);
          return;
        }
  
        // 排序數據，根據 game_id 降序
        const sortedHomeTeam = data.homeTeam.sort((b, a) => b.game_id - a.game_id);
        const sortedAwayTeam = data.awayTeam.sort((b, a) => b.game_id - a.game_id);
  
        // 計算最近五場平均值函數
        const calculateAverage = (data, key) => {
          const validValues = data
            .slice(0, 5)
            .map((game) => game[key])
            .filter((v) => v !== null && v !== undefined);
          const sum = validValues.reduce((acc, value) => acc + value, 0);
          return validValues.length > 0 ? (sum / validValues.length).toFixed(2) : 0;
        };
  
        // 取得最近五場的得分
        const homeTeamScores = sortedHomeTeam.slice(0, 5).map((game) => game.points || 0);
        const awayTeamScores = sortedAwayTeam.slice(0, 5).map((game) => game.points || 0);
  
        // 計算命中率數據
        const homeTeamShootingData = [
          calculateAverage(sortedHomeTeam, "treyp"),
          calculateAverage(sortedHomeTeam, "twop"),
          calculateAverage(sortedHomeTeam, "ftp"),
        ];
  
        const awayTeamShootingData = [
          calculateAverage(sortedAwayTeam, "treyp"),
          calculateAverage(sortedAwayTeam, "twop"),
          calculateAverage(sortedAwayTeam, "ftp"),
        ];
  
        // 提取雷達圖數據
        const homeTeamRadarData = [
          calculateAverage(sortedHomeTeam, "reb_o"),
          calculateAverage(sortedHomeTeam, "reb_d"),
          calculateAverage(sortedHomeTeam, "ast"),
          calculateAverage(sortedHomeTeam, "stl"),
          calculateAverage(sortedHomeTeam, "blk"),
        ];
  
        const awayTeamRadarData = [
          calculateAverage(sortedAwayTeam, "reb_o"),
          calculateAverage(sortedAwayTeam, "reb_d"),
          calculateAverage(sortedAwayTeam, "ast"),
          calculateAverage(sortedAwayTeam, "stl"),
          calculateAverage(sortedAwayTeam, "blk"),
        ];
  
        // 動態設定顏色
        const homeTeamColor =
          teamType.teamA === "home" ? "rgba(54, 162, 235, 1)" : "rgba(255, 105, 180, 1)";
        const homeTeamPointColor =
          teamType.teamA === "home" ? "rgba(54, 162, 235, 0.8)" : "rgba(255, 105, 180, 0.8)";
        const awayTeamColor =
          teamType.teamB === "home" ? "rgba(54, 162, 235, 1)" : "rgba(255, 105, 180, 1)";
        const awayTeamPointColor =
          teamType.teamB === "home" ? "rgba(54, 162, 235, 0.8)" : "rgba(255, 105, 180, 0.8)";
  
        // 更新得分折線圖數據
        setLineScoreTrendData({
          labels: ["近5場", "近4場", "近3場", "近2場", "近1場"],
          datasets: [
            {
              label: selectedTeams.teamA,
              data: homeTeamScores,
              borderColor: homeTeamColor,
              pointBackgroundColor: homeTeamPointColor,
              pointBorderColor: homeTeamColor,
              pointRadius: 6,
              pointHoverRadius: 10,
              borderWidth: 2,
              fill: true,
            },
            {
              label: selectedTeams.teamB,
              data: awayTeamScores,
              borderColor: awayTeamColor,
              pointBackgroundColor: awayTeamPointColor,
              pointBorderColor: awayTeamColor,
              pointRadius: 6,
              pointHoverRadius: 10,
              borderWidth: 2,
              fill: true,
            },
          ],
        });
  
        // 更新命中率雷達圖數據
        setShootingPercentageData({
          labels: ["三分命中率", "兩分命中率", "罰球命中率"],
          datasets: [
            {
              label: selectedTeams.teamA,
              data: homeTeamShootingData,
              borderColor: homeTeamColor,
              pointBackgroundColor: homeTeamPointColor,
              pointBorderColor: homeTeamColor,
              pointRadius: 4,
              pointHoverRadius: 30,
              borderWidth: 2,
              fill: true,
            },
            {
              label: selectedTeams.teamB,
              data: awayTeamShootingData,
              borderColor: awayTeamColor,
              pointBackgroundColor: awayTeamPointColor,
              pointBorderColor: awayTeamColor,
              pointRadius: 4,
              pointHoverRadius: 30,
              borderWidth: 2,
              fill: true,
            },
          ],
        });
  
        // 更新傳統數據雷達圖
        setRadarData({
          labels: ["進攻籃板", "防守籃板", "助攻", "抄截", "阻攻"],
          datasets: [
            {
              label: selectedTeams.teamA,
              data: homeTeamRadarData,
              fill: true,
              borderColor: homeTeamColor,
              pointBackgroundColor: homeTeamPointColor,
              pointRadius: 4,
              pointHoverRadius: 30,
              borderWidth: 2,
            },
            {
              label: selectedTeams.teamB,
              data: awayTeamRadarData,
              fill: true,
              borderColor: awayTeamColor,
              pointBackgroundColor: awayTeamPointColor,
              pointRadius: 4,
              pointHoverRadius: 30,
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("API 請求失敗：", error);
      }
    };
  
    fetchData();
  }, [selectedTeams, teamType]);
  
  

  // 初始化 lineScoreTrendData 狀態
  const [lineScoreTrendData, setLineScoreTrendData] = useState({
    labels: ["近1場", "近2場", "近3場", "近4場", "近5場"],
    datasets: [
      {
        label: "隊伍 A",
        data: [],
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 0.8)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
        pointRadius: 6,
        pointHoverRadius: 10,
        borderWidth: 2,
        fill: true,
      },
      {
        label: "隊伍 B",
        data: [],
        borderColor: "rgba(255, 105, 180, 1)",
        pointBackgroundColor: "rgba(255, 105, 180, 0.8)",
        pointBorderColor: "rgba(255, 105, 180, 1)",
        pointRadius: 6,
        pointHoverRadius: 10,
        borderWidth: 2,
        fill: true,
      },
    ],
  });

  // #region 命中率數據
  const [shootingPercentageData, setShootingPercentageData] = useState({
    labels: ["三分命中率", "兩分命中率", "罰球命中率"],
    datasets: [
      {
        label: "隊伍 A",
        data: [],
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 0.8)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
        pointRadius: 6,
        pointHoverRadius: 30,
        borderWidth: 2,
        fill: true,
      },
      {
        label: "隊伍 B",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 0.8)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 6,
        pointHoverRadius: 30,
        borderWidth: 2,
        fill: true,
      },
    ],
  });
  // #endregion

  // #region 雷達圖數據
  const [radarData, setRadarData] = useState({
    labels: ["進攻籃板", "防守籃板", "助攻", "抄截", "阻攻"],
    datasets: [
      {
        label: "隊伍 A",
        data: [],
        fill: true,
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 0.8)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
        pointRadius: 6,
        pointHoverRadius: 30,
        borderWidth: 2,
      },
      {
        label: "隊伍 B",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 0.8)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 6,
        pointHoverRadius: 30,
        borderWidth: 2,
      },
    ],
  });
  // #endregion

  // #region keypalyer
  const playerAData = {
    name: "林書豪",
    // photo: "/images/player-photo.png", // 照片路徑
    stats: {
      scores: [30],
      rebounds: [10],
      assists: [5],
      steals: [2],
      blocks: [1],
    },
  };

  const playerBData = {
    name: "阿國",
    photo: "/images/player-photo.png", // 照片路徑
    stats: {
      scores: [30],
      rebounds: [10],
      assists: [5],
      steals: [2],
      blocks: [1],
    },
  };
  // #endregion

  return (
<<<<<<< HEAD
    <Box className="dashboard-background">
      <Container>
        <Grid2 container spacing={3}>
          {/* 比較選單區域 */}
          <Grid2 item xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* 第一隊選擇區域 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ButtonGroup variant="contained" sx={{ minWidth: 200 }}>
                  <Button
                    onClick={() => handleTeamTypeChange("teamA", "home")}
                    sx={{
                      flex: 1,
                      bgcolor:
                        teamType.teamA === "home" ? "primary.main" : "#e0e0e0",
                      color: teamType.teamA === "home" ? "#fff" : "#333", // 文字顏色調整
                    }}
                  >
                    主場
                  </Button>
                  <Button
                    onClick={() => handleTeamTypeChange("teamA", "away")}
                    sx={{
                      flex: 1,
                      bgcolor:
                        teamType.teamA === "away"
                          ? "rgba(255, 99, 132, 0.8)"
                          : "#e0e0e0",
                      color: teamType.teamA === "away" ? "#fff" : "#333", // 文字顏色調整
                    }}
                  >
                    客場
                  </Button>
                </ButtonGroup>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <Select
                    value={selectedTeams.teamA}
                    onChange={(e) =>
=======
    <div className="Predict">
      <Box className="dashboard-background">
        <Container>
          <Grid2 container spacing={3}>
            {/* 比較選單區域 */}
            <Grid2 item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControl
                  fullWidth
                  sx={{ minWidth: 200, marginBottom: 0.000001 }}
                >
                  <Select
                    value={selectedTeams.teamA}
                    onChange={(e) =>
                      /* 選隊伍A */
>>>>>>> 17bdd2a535006f3ee606103721c0db7c11bee1bd
                      setSelectedTeams((prev) => ({
                        ...prev,
                        teamA: e.target.value,
                      }))
                    }
                  >
                    {teams.map((team) => (
                      <MenuItem key={team} value={team}>
                        {team}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
<<<<<<< HEAD
              </Box>

              {/* 第二隊選擇區域 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ButtonGroup variant="contained" sx={{ minWidth: 200 }}>
                  <Button
                    onClick={() => handleTeamTypeChange("teamB", "home")}
                    sx={{
                      flex: 1,
                      bgcolor:
                        teamType.teamB === "home" ? "primary.main" : "#e0e0e0",
                      color: teamType.teamB === "home" ? "#fff" : "#333", // 文字顏色調整
                    }}
                  >
                    主場
                  </Button>
                  <Button
                    onClick={() => handleTeamTypeChange("teamB", "away")}
                    sx={{
                      flex: 1,
                      bgcolor:
                        teamType.teamB === "away"
                          ? "rgba(255, 99, 132, 0.8)"
                          : "#e0e0e0",
                      color: teamType.teamB === "away" ? "#fff" : "#333", // 文字顏色調整
                    }}
                  >
                    客場
                  </Button>
                </ButtonGroup>
=======

>>>>>>> 17bdd2a535006f3ee606103721c0db7c11bee1bd
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <Select
                    value={selectedTeams.teamB}
                    onChange={(e) =>
<<<<<<< HEAD
=======
                      /* 選隊伍B */
>>>>>>> 17bdd2a535006f3ee606103721c0db7c11bee1bd
                      setSelectedTeams((prev) => ({
                        ...prev,
                        teamB: e.target.value,
                      }))
                    }
                  >
                    {teams.map((team) => (
                      <MenuItem key={team} value={team}>
                        {team}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
<<<<<<< HEAD
            </Box>
          </Grid2>
          {/* 並排的圖表區域 */}
          <Grid2 container item spacing={3}>
            {/* 得分比較圖表 */}
            <Grid2 item xs={12} md={6}>
              <Card sx={cardStyle}>
                <CardContent>
                  <Typography variant="h100" gutterBottom sx={titleStyle}>
                    近五場比賽得分走勢
                  </Typography>
                  <Box sx={chartContainerStyle}>
                    <Line
                      data={lineScoreTrendData}
                      options={{
                        ...commonChartOptions,
                        plugins: {
                          ...commonChartOptions.plugins,
                          legend: {
                            display: true,
                            position: "top", // 設置圖例在上方
                            labels: {
                              usePointStyle: true, // 使用點狀圖例
                              boxWidth: 20,
                              padding: 15,
                              font: {
                                size: 12,
                                // weight: "bold",
=======
            </Grid2>
            {/* 並排的圖表區域 */}
            <Grid2 container item spacing={3}>
              {/* 得分比較圖表 */}
              <Grid2 item xs={12} md={6}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <Typography variant="h100" gutterBottom sx={titleStyle}>
                      近五場比賽得分走勢
                    </Typography>
                    <Box sx={chartContainerStyle}>
                      <Line
                        data={lineScoreTrendData}
                        options={{
                          ...commonChartOptions,
                          plugins: {
                            ...commonChartOptions.plugins,
                            legend: {
                              display: true,
                              position: "top", // 設置圖例在上方
                              labels: {
                                usePointStyle: true, // 使用點狀圖例
                                boxWidth: 20,
                                padding: 15,
                                font: {
                                  size: 12,
                                  // weight: "bold",
                                },
                                color: "#333", // 圖例文字顏色
                                borderRadius: 5, // 增加邊框圓角
                                borderColor: "rgba(0, 0, 0, 0.1)", // 圖例邊框顏色
                                borderWidth: 2, // 圖例邊框寬度
>>>>>>> 17bdd2a535006f3ee606103721c0db7c11bee1bd
                              },
                            },
                          },
<<<<<<< HEAD
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
            {/* 命中率比較圖表 */}
            <Grid2 item xs={12} md={6}>
              <Card sx={cardStyle}>
                <CardContent>
                  <Typography variant="h100" gutterBottom sx={titleStyle}>
                  近五場命中率比較
                  </Typography>
                  <Box sx={chartContainerStyle}>
                    <Radar
                      data={shootingPercentageData}
                      options={radarOptions}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          </Grid2>
          {/* 雷達圖 */}
          <Card sx={cardStyle}>
            <CardContent>
              <Typography
                variant="h100"
                gutterBottom
                sx={titleStyle}
              >
                近五場傳統數據比較
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 2,
                }}
              ></Box>
              <Box sx={{ height: "300px" }}>
                <Radar data={radarData} options={radarOptions} />
              </Box>
            </CardContent>
          </Card>
          <Grid2 container item spacing={3}>
            {/* Key Player A */}
            <Grid2 item xs={12} md={6}>
              <Card sx={{ boxShadow: 3, borderRadius: 3, padding: 2 }}>
                <CardContent>
                  <Typography
                    variant="h100"
                    gutterBottom
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    Key Player: {playerAData.name} ({selectedTeams.teamA})
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={playerAData.photo}
                      alt={playerAData.name}
                      style={{
                        width: "150px",
                        height: "200px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    />
                    <Typography variant="h6" gutterBottom>
                      近五場平均數據
=======
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>
              {/* 命中率比較圖表 */}
              <Grid2 item xs={12} md={6}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <Typography variant="h100" gutterBottom sx={titleStyle}>
                      命中率比較雷達圖
>>>>>>> 17bdd2a535006f3ee606103721c0db7c11bee1bd
                    </Typography>
                    <Box sx={chartContainerStyle}>
                      <Radar
                        data={shootingPercentageData}
                        options={radarOptions}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>
            </Grid2>
            {/* 雷達圖 */}
            <Card sx={{ boxShadow: 3, borderRadius: 3, padding: 2 }}>
              <CardContent>
                <Typography
                  variant="h100"
                  gutterBottom
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
                  傳統數據比較雷達圖
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 2,
                  }}
                ></Box>
                <Box sx={{ height: "300px" }}>
                  <Radar data={radarData} options={radarOptions} />
                </Box>
              </CardContent>
            </Card>
            <Grid2 container item spacing={3}>
              {/* Key Player A */}
              <Grid2 item xs={12} md={6}>
                <Card sx={{ boxShadow: 3, borderRadius: 3, padding: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h100"
                      gutterBottom
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      Key Player: {playerAData.name} ({selectedTeams.teamA})
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={playerAData.photo}
                        alt={playerAData.name}
                        style={{
                          width: "150px",
                          height: "200px",
                          borderRadius: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <Typography variant="h6" gutterBottom>
                        近五場平均數據
                      </Typography>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        <li>得分: {playerAData.stats.scores}</li>
                        <li>籃板: {playerAData.stats.rebounds}</li>
                        <li>助攻: {playerAData.stats.assists}</li>
                        <li>抄截: {playerAData.stats.steals}</li>
                        <li>阻攻: {playerAData.stats.blocks}</li>
                      </ul>
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>

              {/* Key Player B */}
              <Grid2 item xs={12} md={6}>
                <Card sx={{ boxShadow: 3, borderRadius: 3, padding: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h100"
                      gutterBottom
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      Key Player: {playerBData.name} ({selectedTeams.teamB})
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={playerBData.photo}
                        alt={playerBData.name}
                        style={{
                          width: "150px",
                          height: "200px",
                          borderRadius: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <Typography variant="h6" gutterBottom>
                        近五場平均數據
                      </Typography>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        <li>得分: {playerBData.stats.scores}</li>
                        <li>籃板: {playerBData.stats.rebounds}</li>
                        <li>助攻: {playerBData.stats.assists}</li>
                        <li>抄截: {playerBData.stats.steals}</li>
                        <li>阻攻: {playerBData.stats.blocks}</li>
                      </ul>
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </div>
  );
};

export default Dashboard;
