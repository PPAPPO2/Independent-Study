// 引入必要的 React 和圖表相關套件
import React, { useState } from "react";
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
  // 使用 useState 管理選擇的隊伍狀態
  const [selectedTeams, setSelectedTeams] = useState({
    teamA: "臺北富邦勇士",
    teamB: "新北國王",
  });

  // 定義所有可選擇的隊伍
  const teams = [
    "臺北富邦勇士",
    "新北國王",
    "高雄鋼鐵人",
    "桃園璞園領航猿",
    "福爾摩沙夢想家",
    "新竹御頂攻城獅",
    "新北中信特攻",
    "台啤永豐雲豹",
    "臺北戰神",
    "高雄全家海神",
    "臺南台鋼獵鷹",
  ];

  // #region 得分數據
  const lineScoreTrendData = {
    labels: ["第1場", "第2場", "第3場", "第4場", "第5場"], // 比賽場次
    datasets: [
      {
        label: selectedTeams.teamA,
        data: [85, 90, 88, 92, 87], // 示例數據 for Team A
        borderColor: "rgba(54, 162, 235, 1)", // 深藍色
        pointBackgroundColor: "rgba(54, 162, 235, 0.8)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
        pointRadius: 6,
        pointHoverRadius: 10,
        borderWidth: 2,
        fill: true,
      },
      {
        label: selectedTeams.teamB,
        data: [80, 83, 85, 78, 82], // 示例數據 for Team B
        borderColor: "rgba(255, 105, 180, 1)", // 深粉紅色
        pointBackgroundColor: "rgba(255, 105, 180, 0.8)",
        pointBorderColor: "rgba(255, 105, 180, 1)",
        pointRadius: 6,
        pointHoverRadius: 10,
        borderWidth: 2,
        fill: true,
      },
    ],
  };
  // #endregion

  // #region 命中率數據
  const shootingPercentageData = {
    labels: ["三分命中率", "兩分命中率", "罰球命中率"],
    datasets: [
      {
        label: selectedTeams.teamA,
        data: [30, 45, 70], // 示例數據 for Team A
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 0.8)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
        pointRadius: 6,
        pointHoverRadius: 30,
        borderWidth: 2,
        fill: true,
      },
      {
        label: selectedTeams.teamB,
        data: [70, 50, 30], // 示例數據 for Team B
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 0.8)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 6,
        pointHoverRadius: 30,
        borderWidth: 2,
        fill: true,
      },
    ],
  };
  // #endregion

  // #region 雷達圖數據
  const radarData = {
    labels: ["進攻籃板", "防守籃板", "助攻", "抄截", "阻攻"],
    datasets: [
      {
        label: selectedTeams.teamA,
        data: [20.3, 45, 30.2, 9.3, 4.0],
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 0.8)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
        pointRadius: 6,
        pointHoverRadius: 30,
        borderWidth: 2,
      },
      {
        label: selectedTeams.teamB,
        data: [12.0, 33, 17.5, 4.0, 10.5],
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 0.8)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 6,
        pointHoverRadius: 30,
        borderWidth: 2,
      },
    ],
  };
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

              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <Select
                  value={selectedTeams.teamB}
                  onChange={(e) =>
                    /* 選隊伍B */
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
                            },
                          },
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
                    命中率比較雷達圖
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
  );
};

export default Dashboard;
