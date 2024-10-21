import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer"; // 引入 useInView
import "../styles/Standings.css";

const Standings = () => {
  const [plgStandings, setPlgStandings] = useState([]);
  const [t1Standings, setT1Standings] = useState([]);
  const [ref1, inView1] = useInView({ triggerOnce: false });
  const [ref2, inView2] = useInView({ triggerOnce: false });
  const fadeIn1 = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" }, // 從下方開始
    delay: 500, // 按鈕動畫延遲 1 秒開始
    config: { duration: 500 }, // 動畫持續 1 秒
  });
  const fadeIn2 = useSpring({
    opacity: inView2 ? 1 : 0,
    transform: inView2 ? "translateY(0)" : "translateY(20px)",
    config: { duration: 500 },
  });

  useEffect(() => {
    fetch("/static/Standings/P_TeamStanding23_24.json")
      .then((response) => {
        console.log("PLG fetch response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("PLG Data:", data);
        setPlgStandings(data);
      })
      .catch((error) => console.error("Error fetching PLG data:", error));

    fetch("/static/Standings/T1_TeamStanding23_24.json")
      .then((response) => {
        console.log("T1 fetch response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("T1 Data:", data);
        setT1Standings(data);
      })
      .catch((error) => console.error("Error fetching T1 data:", error));
  }, []);

  const getTeamIcon = (teamName) => {
    switch (teamName) {
      case "桃園璞園領航猿":
        return `/images/icon/桃園璞園領航猿.png`;
      case "福爾摩沙夢想家":
        return `/images/icon/福爾摩沙夢想家.png`;
      case "新北國王":
        return `/images/icon/新北國王.png`;
      case "新竹御頂攻城獅":
        return `/images/icon/新竹御頂攻城獅.png`;
      case "臺北富邦勇士":
        return `/images/icon/臺北富邦勇士.png`;
      case "高雄17直播鋼鐵人":
        return `/images/icon/高雄17直播鋼鐵人.png`;
      case "新北中信特攻":
        return `/images/icon/新北中信特攻.png`;
      case "台啤永豐雲豹":
        return `/images/icon/台啤永豐雲豹.png`;
      case "高雄全家海神":
        return `/images/icon/高雄全家海神.png`;
      case "臺北戰神":
        return `/images/icon/臺北戰神.png`;
      case "臺南台鋼獵鷹":
        return `/images/icon/臺南台鋼獵鷹.png`;
      default:
        return "";
    }
  };

  const renderTable = (data) => {
    if (!data || data.length === 0) {
      return <p>無資料顯示</p>;
    }

    return (
      <table class="table-body">
        <thead>
          <tr>
            <th>排名</th>
            <th>球隊</th>
            <th>已賽 GP</th>
            <th>勝場 W</th>
            <th>敗場 L</th>
            <th>勝率</th>
            <th>勝差</th>
            <th>連續紀錄</th>
          </tr>
        </thead>
        <tbody>
          {data.map((team) => (
            <tr key={team.id}>
              <td>{team.rank}</td>
              <td class="teams-name">
                <img
                  class="team-logo"
                  src={getTeamIcon(team.team_name)}
                  alt={team.team_name}
                  style={{ width: "30px", marginRight: "10px" }}
                />
                {team.team_name}
              </td>
              <td>{team.games_played}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.pct}</td>
              <td>{team.games_behind}</td>
              <td>{team.wins_losses_streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div class="standings">
      <h2 class="rankings">Regular Season Standings</h2>
      <animated.div style={fadeIn1}>
        <h2 class="table-title">❰ PLG 例行賽 ❱</h2>
        {renderTable(plgStandings)}
      </animated.div>

      <animated.div ref={ref2} style={fadeIn2}>
        <h2 class="table-title">❰ T1 例行賽 ❱</h2>
        {renderTable(t1Standings)}
      </animated.div>
    </div>
  );
};

export default Standings;
