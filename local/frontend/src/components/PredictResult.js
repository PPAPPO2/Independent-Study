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
  CardContent,
  Typography,
  Container,
  Grid2,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import "../styles/Predict.css";

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
  const [selectedTeams, setSelectedTeams] = useState({
    teamA: "臺北富邦勇士",
    teamB: "新北國王",
  });

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

  const data = {
    labels: ["得分", "籃板", "助攻", "抄截", "阻攻"],
    datasets: [
      {
        label: selectedTeams.teamA,
        data: [84, 55, 20, 11, 6],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: selectedTeams.teamB,
        data: [91, 65, 21, 7, 4],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <Box className="dashboard-background">
      <Container>
        <Grid2 container spacing={3}>
          {/* 比較選單區域 */}
          <Grid2 item xs={12}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <Select
                  value={selectedTeams.teamA}
                  onChange={(e) =>
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
                <Grid2 item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        平均得分
                      </Typography>
                      <Typography variant="h4" color="text.secondary">
                        84
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              </FormControl>
              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <Select
                  value={selectedTeams.teamB}
                  onChange={(e) =>
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
                <Grid2 item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        平均得分
                      </Typography>
                      <Typography variant="h4" color="text.secondary">
                        92
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              </FormControl>
            </Box>
          </Grid2>

          {/* 數據卡片區域 */}

          {/* 圖表區域 */}
          <Grid2 item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  隊伍數據比較
                </Typography>
                <Bar data={data} options={options} />
              </CardContent>
            </Card>
          </Grid2>
          {/* 折線圖區域 */}
          <Grid2 item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  隊伍數據折線圖
                </Typography>
                <Line data={data} options={options} />
              </CardContent>
            </Card>
          </Grid2>

          {/* 雷達圖區域 */}
          <Grid2 item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  隊伍數據雷達圖
                </Typography>
                <Radar data={data} options={options} />
              </CardContent>
            </Card>
          </Grid2>

          {/* 圓餅圖區域 */}
          <Grid2 item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  隊伍數據圓餅圖
                </Typography>
                <Pie
                  data={{
                    labels: data.labels,
                    datasets: [
                      {
                        label: "隊伍數據分佈",
                        data: data.datasets[0].data,
                        backgroundColor: [
                          "rgba(54, 162, 235, 0.6)",
                          "rgba(255, 99, 132, 0.6)",
                          "rgba(255, 205, 86, 0.6)",
                          "rgba(75, 192, 192, 0.6)",
                          "rgba(153, 102, 255, 0.6)",
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                  options={options}
                />
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Dashboard;
