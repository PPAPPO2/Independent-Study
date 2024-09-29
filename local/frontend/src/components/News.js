import React, { useState } from "react";
import "../styles/News.css";

const News = () => {
  const [currentMonth, setCurrentMonth] = useState(9); // 預設為9月

  const newsData = {
    9: [
      {
        id: 1,
        title: "TPBL 官方網站",
        url: "https://tpbl.basketball/",
        img: "https://tpbl.basketball/share.png",
      },
      {
        id: 2,
        title: "TPBL 選秀結果",
        url: "https://www.instagram.com/p/C9wiCTxzXM1/",
        img: "https://media.zenfs.com/ko/video.videoland.com/af5b04fc001fa80fd42c3c3af8ce8085",
      },
      {
        id: 3,
        title: "TPBL 熱身賽賽程出爐",
        url: "https://www.instagram.com/p/C_4vbgLTjj1/?img_index=1",
        img: "https://dsystemstorage2.blob.core.windows.net/image/ADImage/eLDHRKxLQKpcSyZcC71mOlHyv9tAC5.jpg",
      },
      {
        id: 4,
        title: "PLG 官方網站",
        url: "https://pleagueofficial.com/",
        img: "https://upload.wikimedia.org/wikipedia/zh/4/46/P._LEAGUE%2B.png",
      },
      {
        id: 5,
        title: "PLG 選秀結果",
        url: "https://pleagueofficial.com/draft/2024-25/draft-result",
        img: "https://cdn2.ettoday.net/images/7742/7742874.jpg",
      },
      {
        id: 6,
        title: "PLG 熱身賽賽程出爐",
        url: "https://www.instagram.com/p/C_w0AlRzdj8/",
        img: "https://media.zenfs.com/ko/ftvn.com.tw/d17e6a53bd2a3e4fc2e76596ac6ba17f",
      },

      {
        id: 7,
        title: "勇士、鋼鐵人 狀元籤交易案",
        url: "https://udn.com/news/story/7003/8090492?from=udn-referralnews_ch2artbottom",
        img: "https://img.ltn.com.tw/Upload/sports/page/800/2024/08/07/phpFFEvFE.jpg",
      },

      {
        id: 8,
        title: "呂政儒 加盟新北國王",
        url: "https://www.chinatimes.com/realtimenews/20240715002887-260403?chdtv",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXud1V6aHHce_8TiTW36J001g8u59UDT4Gdhwy4IUSBJ7e6yb4",
      },
      {
        id: 9,
        title: "牧倫斯 加盟臺北台新戰神",
        url: "https://www.thetaiwanstory.com/2024/08/30/p102552/",
        img: "https://www.thetaiwanstory.com/wp-content/uploads/2024/08/%E5%8A%AA%E5%8A%9B%E8%B4%8F%E5%9B%9E%E7%90%83%E8%BF%B7%E6%94%AF%E6%8C%81-213%E5%85%AC%E5%88%86%E9%95%B7%E4%BA%BA%E7%89%A7%E5%80%AB%E6%96%AF%E5%8A%A0%E7%9B%9F%E8%87%BA%E5%8C%97%E5%8F%B0%E6%96%B0%E6%88%B0%E7%A5%9E.jpg",
      },
      {
        id: 10,
        title: "林書豪 續約新北國王",
        url: "https://udn.com/news/story/7003/8200815",
        img: "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2024/09/02/realtime/30403106.jpeg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600&w=930&nt=1",
      },
      {
        id: 11,
        title: "蔣淯安 加盟福爾摩沙夢想家",
        url: "https://sports.ltn.com.tw/news/breakingnews/4723284",
        img: "https://img.ltn.com.tw/Upload/sports/page/800/2024/07/02/4723284_1.jpg",
      },
      {
        id: 12,
        title: "沃許本 加盟新北國王",
        url: "https://tw.sports.yahoo.com/news/tpbl-%E6%90%B6%E4%B8%8B%E5%B9%B4%E5%BA%A6%E6%9C%80%E4%BD%B3%E6%B4%8B%E5%B0%87-%E6%B2%83%E8%A8%B1%E6%9C%AC%E5%8A%A0%E7%9B%9F%E6%96%B0%E5%8C%97%E5%9C%8B%E7%8E%8B-040129611.html",
        img: "https://img.ltn.com.tw/Upload/sports/page/800/2024/08/01/phpR02PCL.jpg",
      },
    ],
    10: [
      {
        id: 1,
        title: "test1",
        url: "https://www.thetaiwanstory.com/2024/08/30/p102552/",
        img: "https://img.ltn.com.tw/Upload/sports/page/800/2024/08/01/phpR02PCL.jpg",
      },
      {
        id: 2,
        title: "test2",
        url: "https://www.thetaiwanstory.com/2024/08/30/p102552/",
        img: "https://img.ltn.com.tw/Upload/sports/page/800/2024/08/01/phpR02PCL.jpg",
      },
      {
        id: 3,
        title: "test3",
        url: "https://www.thetaiwanstory.com/2024/08/30/p102552/",
        img: "https://img.ltn.com.tw/Upload/sports/page/800/2024/08/01/phpR02PCL.jpg",
      },
    ],
    11: [],
  };
  // 點擊「上一個月」的邏輯
  const handlePreviousMonth = () => {
    if (currentMonth > 9) {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // 點擊下個月
  const handleNextMonth = () => {
    if (currentMonth < 9 || newsData[currentMonth + 1]?.length > 0) {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="news-container">
      {/* 月份選擇器 */}
      <div className="month-selector">
        {currentMonth > 9 && <button onClick={handlePreviousMonth}>◀</button>}
        <h1>{currentMonth}月 精選新聞</h1>
        {newsData[currentMonth + 1]?.length > 0 ? (
          <button onClick={handleNextMonth}>▶</button>
        ) : null}
      </div>

      {/* 無資料顯示 */}
      {newsData[currentMonth].length === 0 ? (
        <div className="news-empty">資料尚未更新</div>
      ) : (
        <div className="news-grid">
          {newsData[currentMonth].map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.id}
              className="news-card"
            >
              <div className="news-image">
                <img src={link.img} alt={link.title} />
              </div>
              <div className="news-title">{link.title}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
export default News;
