// 引入必要的 React 和圖表相關套件
import React, { useState } from "react";
import {Chart as ChartJS} from 'chart.js/auto';
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
const leagueAvgPoints = 94.78; // 設定聯盟平均得分

// 定義得分比較的長條圖數據
const scoreComparisonData = {
  labels: [selectedTeams.teamA, selectedTeams.teamB, "聯盟平均"],
  datasets: [
    {
      label: "平均得分",
      data: [84, 92, leagueAvgPoints],
      backgroundColor: [
        "rgba(54, 162, 235, 0.6)", // 第一支隊伍顏色
        "rgba(255, 99, 132, 0.6)", // 第二支隊伍顏色
        "rgba(75, 192, 192, 0.6)", // 聯盟平均顏色
      ],
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
      data: [30, 45, 70], // 示例數據
      backgroundColor: "rgba(54, 162, 235, 0.6)",
    },
    {
      label: selectedTeams.teamB,
      data: [35, 50, 65], // 示例數據
      backgroundColor: "rgba(255, 99, 132, 0.6)",
    },
    {
      label: selectedTeams.teamB,
      data: [35, 50, 65], // 示例數據
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};
// #endregion

// #region 雷達圖數據
const radarLabels = ["進攻籃板", "防守籃板", "助攻", "抄截", "阻攻"];

const radarData = {
    labels: radarLabels,
    datasets: [
      {
        label: selectedTeams.teamA,
        data: [13.3, 35, 19.2, 9.3, 4.0], // 示例數據 for Team A
        backgroundColor: "rgba(220, 20, 60, 0.4)", // 增加透明度以填滿區域顏色
        borderColor: Utils.CHART_COLORS.red, // 邊框顏色
        pointBackgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        pointBorderColor: "rgba(220, 20, 60, 1)",
        pointRadius: 4, // 調整數據點的大小
        pointHoverRadius: 20, // 調整數據點懸停時的大小
        fill: true,
      },
      {
        label: selectedTeams.teamB,
        data: [12.0, 33, 17.5, 8.0, 3.5], // 示例數據 for Team B
        backgroundColor: "rgba(128, 128, 128, 0.4)", // 增加透明度以填滿區域顏色
        borderColor: "rgba(128, 128, 128, 1)", // 邊框顏色
        pointBackgroundColor: "rgba(128, 128, 128, 1)",
        pointBorderColor: "rgba(128, 128, 128, 1)",
        pointRadius: 4, // 調整數據點的大小
        pointHoverRadius: 20, // 調整數據點懸停時的大小
        fill: true,
      },
    ],
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
                    隊伍與聯盟平均得分比較
                  </Typography>
                  <Box sx={chartContainerStyle}>
                    <Bar
                      data={scoreComparisonData}
                      options={{
                        ...commonChartOptions,
                        plugins: {
                          ...commonChartOptions.plugins,
                          legend: { display: false },
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
                    命中率比較
                  </Typography>
                  <Box sx={chartContainerStyle}>
                    <Bar
                      data={shootingPercentageData}
                      options={{
                        ...commonChartOptions,
                        plugins: {
                          ...commonChartOptions.plugins,
                          legend: {
                            ...commonChartOptions.plugins.legend,
                            display: true, // 顯示圖例
                          },
                        },
                      }}
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
                ABILITY GRAPH 能力區分圖
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 2,
                }}
              >
              </Box>
              <Box sx={{ height: "300px" }}>
                <Radar data={radarData} options={radarOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Dashboard;
