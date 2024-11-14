

// 得分與命中率圖表的共用選項
export const cardStyle = {
  boxShadow: 3,
  borderRadius: 3,
  // backgroundColor: "#f5f5f5",
  margin: "14px 0",
  height: "92%", // 確保兩張卡片高度一致
};
// 定義共用的圖表容器樣式
export const chartContainerStyle = {
  height: "250px",
  padding: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
// 定義共用的標題樣式
export const titleStyle = {
  marginBottom: "20px",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: "1rem", // 統一標題大小
};
export const commonChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 12,
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0)",
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
};
// #endregion

// #region 傳統數據雷達圖設定
export const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      shape: "circle",
      beginAtZero: true,  // 添加這行
      angleLines: {
        display: true,
        color: "rgba(0, 0, 0, 0.1)",
      },
      grid: {
        circular: true,
        color: "rgba(0, 0, 0, 0.1)",
        lineWidth: 1.5,
      },
      pointLabels: {
        color: "#333",
        font: {
          size: 12,
        },
      },
      ticks: {
        display: false,
        count: 4,
      },
    },
  },
  elements: {
    line: {
      borderWidth: 3,  // 添加這行
    }
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#333",
        font: {
          size: 12,
        },
        usePointStyle: true,
      },
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw}`,
      },
    },
  },
};
//   #endregion