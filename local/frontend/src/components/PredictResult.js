// 引入必要的 React 和圖表相關套件
import React, { useState, useEffect, useMemo, useCallback } from "react";

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
import { Bar, Line, Radar, Pie, Doughnut } from "react-chartjs-2";
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
import { Warning, CheckCircle } from "@mui/icons-material";
import "../styles/Predict.css";
import {
  cardStyle,
  titleStyle,
  chartContainerStyle,
  radarOptions,
  commonChartOptions,
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
    teamA: "桃園璞園領航猿",
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
        const winRateresponse = await fetch(
          `http://127.0.0.1:8000/cat/api/model/?homeTeam=${encodeURIComponent(
            homeTeam
          )}&awayTeam=${encodeURIComponent(
            awayTeam
          )}&is_home_team=${encodeURIComponent(homeTeam)}`
        );
        const winRatedata = await winRateresponse.json();
        console.log("勝率：", winRatedata);
        if (!winRateresponse.ok) {
          console.error("API 回傳錯誤：", winRatedata.error);
          return;
        }

        // 更新勝率數據
        const homeTeamWinRate =
          parseFloat(winRatedata.prediction.team1_win_prob) * 100;
        const awayTeamWinRate =
          parseFloat(winRatedata.prediction.team2_win_prob) * 100;
        setWinRateData([homeTeamWinRate, awayTeamWinRate]);

        const homeScoreMax = winRatedata.prediction.team1_score_range.max;
        sethomeScoreMax([homeScoreMax]);
        const homeScoreMin = winRatedata.prediction.team1_score_range.min;
        sethomeScoreMin([homeScoreMin]);
        const awayScoreMax = winRatedata.prediction.team2_score_range.max;
        setawayScoreMax([awayScoreMax]);
        const awayScoreMin = winRatedata.prediction.team2_score_range.min;
        setawayScoreMin([awayScoreMin]);

        // #region 數據 API 請求
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
        const sortedHomeTeam = data.homeTeam.sort(
          (b, a) => b.game_id - a.game_id
        );
        const sortedAwayTeam = data.awayTeam.sort(
          (b, a) => b.game_id - a.game_id
        );

        // 計算最近五場平均值函數
        const calculateAverage = (data, key) => {
          const validValues = data
            .slice(0, 5)
            .map((game) => game[key])
            .filter((v) => v !== null && v !== undefined);
          const sum = validValues.reduce((acc, value) => acc + value, 0);
          return validValues.length > 0
            ? (sum / validValues.length).toFixed(2)
            : 0;
        };

        // 取得最近五場的得分
        const homeTeamScores = sortedHomeTeam
          .slice(0, 5)
          .map((game) => game.points || 0);
        const awayTeamScores = sortedAwayTeam
          .slice(0, 5)
          .map((game) => game.points || 0);

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
          teamType.teamA === "home"
            ? "rgba(54, 162, 235, 1)"
            : "rgba(255, 105, 180, 1)";
        const homeTeamPointColor =
          teamType.teamA === "home"
            ? "rgba(54, 162, 235, 0.8)"
            : "rgba(255, 105, 180, 0.8)";
        const awayTeamColor =
          teamType.teamB === "home"
            ? "rgba(54, 162, 235, 1)"
            : "rgba(255, 105, 180, 1)";
        const awayTeamPointColor =
          teamType.teamB === "home"
            ? "rgba(54, 162, 235, 0.8)"
            : "rgba(255, 105, 180, 0.8)";

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
        // 計算助攻失誤比的函數
        const calculateAssistTurnoverRatio = (games) => {
          const recentGames = games.slice(0, 5);
          const ratios = recentGames.map((game) => {
            if (game.turnover === 0 || !game.turnover) return 0;
            return game.ast / game.turnover;
          });
          const sum = ratios.reduce((acc, ratio) => acc + ratio, 0);
          return Number((sum / ratios.length).toFixed(2));
        };

        // 根據主客場狀態決定數據分配
        let teamAData, teamBData;
        if (teamType.teamA === "home") {
          teamAData = sortedHomeTeam;
          teamBData = sortedAwayTeam;
        } else {
          teamAData = sortedAwayTeam;
          teamBData = sortedHomeTeam;
        }

        // 計算並更新兩隊的助攻失誤比
        const teamARatio = calculateAssistTurnoverRatio(teamAData);
        const teamBRatio = calculateAssistTurnoverRatio(teamBData);

        // 更新儀表板的數值
        setTeamAValue(teamARatio);
        setTeamBValue(teamBRatio);
      } catch (error) {
        console.error("API 請求失敗：", error);
      }
    };

    fetchData();
  }, [selectedTeams, teamType]);

  // #region 勝率圖
  const createGaugeData = (value) => {
    const gaugeColor = value < 1.5 ? "#ff4d4d" : "#4bc0c0";
    return {
      datasets: [
        {
          data: [value, 3 - value], // 動態計算剩餘部分
          backgroundColor: [gaugeColor, "#e0e0e0"],
          borderWidth: 0,
          cutout: "80%",
        },
      ],
    };
  };

  // 儀表圖選項配置
  const options = {
    plugins: {
      tooltip: { enabled: false }, // 禁用滑鼠提示
    },
    rotation: -90, // 開始角度
    circumference: 180, // 顯示半圓
    cutout: "80%", // 中心空洞比例
  };
  // #endregion

  //#region 勝率圓餅圖的選項設定 & 數據
  const winRateChart = (teamType, selectedTeams, values) => {
    // 獲取各隊伍的顏色
    const getTeamColor = (isHome) => ({
      backgroundColor: isHome
        ? "rgba(54, 162, 235, 0.8)"
        : "rgba(255, 99, 132, 0.8)",
      borderColor: isHome ? "rgba(54, 162, 235, 1)" : "rgba(255, 99, 132, 1)",
    });

    // 根據主客場狀態設定顏色
    const teamAColors = getTeamColor(teamType.teamA === "home");
    const teamBColors = getTeamColor(teamType.teamB === "home");

    return {
      labels: [selectedTeams.teamA, selectedTeams.teamB],
      datasets: [
        {
          data: values,
          backgroundColor: [
            teamAColors.backgroundColor,
            teamBColors.backgroundColor,
          ],
          borderColor: [teamAColors.borderColor, teamBColors.borderColor],
          borderWidth: 0,
        },
      ],
    };
  };

  const winRateOptions = {
    plugins: {
      tooltip: {
        enabled: false, // 如果想顯示 Tooltip，但避免遮擋，啟用即可
        position: "nearest", // 跟隨滑鼠的最近位置顯示 Tooltip
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
    rotation: 180, // 開始角度
    circumference: 360, // 顯示完整圓餅
    cutout: "70%", // 中心空洞比例
  };
  const [winratedata, setWinRateData] = useState([50, 50]);
  // #endregion

  // #region 助攻失誤比
  const [teamAValue, setTeamAValue] = useState(0);
  const [teamBValue, setTeamBValue] = useState(0);
  // #endregion

  // #region 預測得分
  const [homeScoreMax, sethomeScoreMax] = useState(0);
  const [homeScoreMin, sethomeScoreMin] = useState(0);
  const [awayScoreMax, setawayScoreMax] = useState(0);
  const [awayScoreMin, setawayScoreMin] = useState(0);
  // #endregion

  // #region 近五場得分數據
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
  // #endregion

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

  return (
    <div className="Predict">
      <Box className="dashboard-background">
        <Container
          maxWidth="lg" // 設定最大寬度
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // 水平置中
            justifyContent: "center", // 垂直置中
            minHeight: "100vh", // 佔滿整個視窗高度
            // padding: "2px 0", // 上下增加一些空間
          }}
        >
          <Grid2 container spacing={3} sx={{ justifyContent: "center" }}>
            {/* 比較選單區域 */}
            <Grid2 item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* 第一隊選擇區域 */}
                <Box sx={{ display: "flex", alignItems: "top", gap: 2 }}>
                  <ButtonGroup
                    variant="contained"
                    sx={{ minWidth: 200, height: "56px" }}
                  >
                    <Button
                      onClick={() => handleTeamTypeChange("teamA", "home")}
                      sx={{
                        flex: 1,
                        bgcolor:
                          teamType.teamA === "home"
                            ? "primary.main"
                            : "#e0e0e0",
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
                  <Card
                    sx={{
                      boxShadow: 3,
                      borderRadius: 3,
                      margin: "14px 0",
                      minWidth: 200, // 設置最小寬度
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          marginBottom: 1,
                        }}
                      >
                        預測比分
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                      {homeScoreMin}~{homeScoreMax}分
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>

                {/* 第二隊選擇區域 */}
                <Box sx={{ display: "flex", alignItems: "top", gap: 2 }}>
                  <ButtonGroup
                    variant="contained"
                    sx={{ minWidth: 200, height: "56px" }}
                  >
                    <Button
                      onClick={() => handleTeamTypeChange("teamB", "home")}
                      sx={{
                        flex: 1,
                        bgcolor:
                          teamType.teamB === "home"
                            ? "primary.main"
                            : "#e0e0e0",
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
                  </FormControl>
                  <Card
                    sx={{
                      boxShadow: 3,
                      borderRadius: 3,
                      margin: "14px 0",
                      minWidth: 200, // 設置最小寬度
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          marginBottom: 1,
                        }}
                      >
                        預測比分
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                      {awayScoreMin}~{awayScoreMax}分
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Grid2>

            <Card
              sx={{
                boxShadow: 3,
                height: "85%",
                borderRadius: 3,
                margin: "14px 0",
                position: "relative",
              }}
            >
              <CardContent>
                <Typography variant="h100" gutterBottom sx={titleStyle}>
                  {selectedTeams.teamA} vs. {selectedTeams.teamB}
                </Typography>
                <Box sx={chartContainerStyle}>
                  <Doughnut
                    data={winRateChart(teamType, selectedTeams, winratedata)}
                    options={winRateOptions}
                  />
                  {/* VS 文字使用絕對定位 */}
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "55%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      fontSize: "30px",
                      fontWeight: "bold",
                      zIndex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <span
                      style={{
                        color:
                          teamType.teamA === "home"
                            ? "rgba(54, 162, 235, 1)"
                            : "rgba(255, 99, 132, 1)",
                      }}
                    >
                      {winratedata[0]}
                    </span>
                    <span
                      style={{
                        color: "#666", // 中間的 vs 使用中性的灰色
                        fontSize: "24px", // vs 稍微小一點
                      }}
                    >
                      vs
                    </span>
                    <span
                      style={{
                        color:
                          teamType.teamB === "home"
                            ? "rgba(54, 162, 235, 1)"
                            : "rgba(255, 99, 132, 1)",
                      }}
                    >
                      {winratedata[1]}
                    </span>
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* 並排的圖表區域 */}
            <Grid2 container item spacing={3}>
              {/* 得分比較圖表 */}

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

              {/* 命中率比較圖表 */}

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

              {/* 雷達圖 */}
              <Card sx={cardStyle}>
                <CardContent>
                  <Typography variant="h100" gutterBottom sx={titleStyle}>
                    近五場傳統數據比較
                  </Typography>
                  <Box sx={chartContainerStyle}>
                    <Radar data={radarData} options={radarOptions} />
                  </Box>
                </CardContent>
              </Card>
            </Grid2>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
                width: "100%",
              }}
            >
              {/* 第一個卡片 */}
              <Card
                sx={{
                  boxShadow: 3,
                  height: "85%",
                  borderRadius: 3,
                  margin: "14px 0",
                  position: "relative",
                }}
                title="助攻失誤比 = 平均助攻數 / 平均失誤數，數值越高代表球隊控球能力越好"
              >
                {teamAValue < 1.5 ? (
                  <Warning
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      color: teamAValue < 1.2 ? "#ff4d4d" : "#ffcc00", // 小於 1.2 紅色，1.2-1.5 黃色
                      fontSize: "24px",
                      zIndex: 1,
                    }}
                  />
                ) : (
                  <CheckCircle
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      color: "#4bc0c0", // 綠色勾勾
                      fontSize: "24px",
                      zIndex: 1,
                    }}
                  />
                )}
                <CardContent>
                  <Typography variant="h100" gutterBottom sx={titleStyle}>
                    {selectedTeams.teamA} 失誤助攻比
                  </Typography>
                  <Doughnut
                    data={createGaugeData(teamAValue)}
                    options={options}
                  />
                  {/* 顯示中心數字 */}
                  <Typography
                    style={{
                      position: "absolute",
                      top: "68%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      fontSize: "50px",
                      fontWeight: "bold",
                      color: teamAValue < 1.5 ? "#ff4d4d" : "#4bc0c0",
                    }}
                  >
                    {teamAValue.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>

              {/* 第二個卡片 */}
              <Card
                sx={{
                  boxShadow: 3,
                  height: "85%",
                  borderRadius: 3,
                  margin: "14px 0",
                  position: "relative",
                }}
                title="助攻失誤比 = 平均助攻數 / 平均失誤數，數值越高代表球隊控球能力越好"
              >
                {teamBValue < 1.5 ? (
                  <Warning
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      color: teamBValue < 1.2 ? "#ff4d4d" : "#ffcc00", // 小於 1.2 紅色，1.2-1.5 黃色
                      fontSize: "24px",
                      zIndex: 1,
                    }}
                  />
                ) : (
                  <CheckCircle
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      color: "#4bc0c0", // 綠色勾勾
                      fontSize: "24px",
                      zIndex: 1,
                    }}
                  />
                )}
                <CardContent>
                  <Typography variant="h100" gutterBottom sx={titleStyle}>
                    {selectedTeams.teamB} 失誤助攻比
                  </Typography>
                  <Doughnut
                    data={createGaugeData(teamBValue)}
                    options={options}
                  />
                  {/* 顯示中心數字 */}
                  <Typography
                    style={{
                      position: "absolute",
                      top: "68%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      fontSize: "50px",
                      fontWeight: "bold",
                      color: teamBValue < 1.5 ? "#ff4d4d" : "#4bc0c0",
                    }}
                  >
                    {teamBValue.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid2>
        </Container>
      </Box>
    </div>
  );
};

export default Dashboard;
