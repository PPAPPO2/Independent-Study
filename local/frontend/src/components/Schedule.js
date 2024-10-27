import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import "../styles/Schedule.css";
import plgLogo from "../logo/plg.png";
import t1Logo from "../logo/tpbl.png";


const Schedule = () => {
  const [currentTitle, setCurrentTitle] = useState(""); // 儲存標題
  const [events, setEvents] = useState([]); // 儲存賽程事件
  const [selectedLeague, setSelectedLeague] = useState("聯盟一"); // 當前選擇的聯盟

  let calendarApi;

  // 定義 getTeamIcon 函數來獲取隊伍的 LOGO
  const getTeamIcon = (teamName) => {
    switch (teamName) {
      case "桃園璞園領航猿":
        return `/images/icon/桃園璞園領航猿.png`;
      case "福爾摩沙夢想家":
        return `/images/icon/福爾摩沙夢想家.png`;
      case "新北國王":
        return `/images/icon/新北國王.png`;
      case "新竹御嵿攻城獅":
        return `/images/icon/新竹御頂攻城獅.png`;
      case "臺北富邦勇士":
        return `/images/icon/臺北富邦勇士.png`;
      case "高雄17直播鋼鐵人":
      case "高雄鋼鐵人":
        return `/images/icon/高雄17直播鋼鐵人.png`;
      case "新北中信特攻":
        return `/images/icon/新北中信特攻.png`;
      case "桃園台啤永豐雲豹":
        return `/images/icon/台啤永豐雲豹.png`;
      case "高雄全家海神":
        return `/images/icon/高雄全家海神.png`;
      case "臺北台新戰神":
        return `/images/icon/臺北戰神.png`;
      case "臺南台鋼獵鷹":
      case "台鋼獵鷹":  
        return `/images/icon/臺南台鋼獵鷹.png`;
      default:
        return "";
    }
  };

  useEffect(() => {

    const url =
      selectedLeague === "聯盟一"
        ? "http://localhost:8000/cat/schedulesP/"
        : "http://localhost:8000/cat/schedulesT/";

    // 獲取後端數據
    axios
      .get(url)
      .then((response) => {
        // 將數據轉換為 FullCalendar 可用的格式
        const formattedEvents = response.data.map((item) => ({
          title: `${item.team_home} vs ${item.team_away}`,
          start: item.game_date,
          location: item.location,
          team_home: item.team_home, // 保存隊伍名稱
          team_away: item.team_away, // 保存隊伍名稱
        }));
        console.log(formattedEvents);
        setEvents(formattedEvents); // 設置事件資料
      })
      .catch((error) => {
        console.error("Error fetching schedule data:", error);
      });
  }, [selectedLeague]);

  return (
    <>
      <div className="top-bar">
        <span className="arrow" onClick={() => calendarApi?.prev()}>
          〈
        </span>{" "}
        {/* 上一個月按鈕 */}
        <span>{currentTitle}</span> {/* 顯示動態標題 */}
        <span className="arrow" onClick={() => calendarApi?.next()}>
          〉
        </span>{" "}
        {/* 下一個月按鈕 */}
      </div>

      <div className="tabs">
          {/* 聯盟一頁籤 */}
          <span
            className={`tab ${selectedLeague === "聯盟一" ? "active" : ""}`}
            onClick={() => {
              console.log("Switching to P. LEAGUE+");
              setSelectedLeague("聯盟一");
            }}
          >
            <img src={plgLogo} alt="PLG Logo" className="plg_Sche" />
          </span>
          {/* 聯盟二頁籤 */}
          <span
            className={`tab ${selectedLeague === "聯盟二" ? "active" : ""}`}
            onClick={() => {
              console.log("Switching to TPBL");
              setSelectedLeague("聯盟二");
            }}
          >
            <img src={t1Logo} alt="T1 Logo" className="t1_Sche" />
          </span>
      </div>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events} // 這裡是賽程資料
          // aspectRatio={2.5}
          height="auto"
          headerToolbar={{
            left: "",
            center: "",
            right: "",
          }}
          dayHeaderContent={(args) => {
            const weekdays = [
              "星期日",
              "星期一",
              "星期二",
              "星期三",
              "星期四",
              "星期五",
              "星期六",
            ];
            return weekdays[args.date.getUTCDay()];
          }}
          titleFormat={(args) => {
            const year = args.date.year;
            const month = String(args.date.month + 1).padStart(2, "0");
            const formattedTitle = `${year}.${month}`;
            setCurrentTitle(formattedTitle); // 更新橫條的標題
            return ""; // 不顯示內建的日曆標題
          }}
          // 修改這裡的 eventContent 來顯示 LOGO 和場地信息
          eventContent={(eventInfo) => {
            const gameTime = new Date(eventInfo.event.start);
            const hours = gameTime.getHours().toString().padStart(2, "0");
            const minutes = gameTime.getMinutes().toString().padStart(2, "0");
            const timeString = `${hours}:${minutes}`; // 格式化為 HH:MM

            return(
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              // padding: '10px'
            }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // marginBottom: '10px'
              }}> {/* 置中 LOGO */}
              <img
                src={getTeamIcon(eventInfo.event.extendedProps.team_home)}
                alt={eventInfo.event.extendedProps.team_home}
                style={{ width: "50px", height: "50px" }}
              />
              <img
                src={getTeamIcon(eventInfo.event.extendedProps.team_away)}
                alt={eventInfo.event.extendedProps.team_away}
                style={{ width: "50px", height: "50px", marginLeft: "10px" }}
              />
              <br />
              </div>
              <b style={{ display: 'block', margin: '0 0' }}>{timeString}</b>
              <br />
              <b style={{ display: 'block', margin: '0 0' }}>{eventInfo.event.extendedProps.location}</b>
            </div>
          )}}
          ref={(calendar) => {
            calendarApi = calendar?.getApi(); // 取得 FullCalendar API，方便控制上下月份切換
          }}
        />
      </div>
    </>
  );
};

export default Schedule;
