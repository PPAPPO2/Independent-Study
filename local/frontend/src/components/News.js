import React from "react";
import "../styles/News.css";

const News = () => {
  const newsLinks = [
    {
      id: 1,
      title: "TPBL 官方網站",
      url: "https://tpbl.basketball/",
      img: "https://tpbl.basketball/share.png",
    },
    {
      id: 2,
      title: "PLG 官方網站",
      url: "https://pleagueofficial.com/",
      img: "https://upload.wikimedia.org/wikipedia/zh/4/46/P._LEAGUE%2B.png",
    },
    {
      id: 3,
      title: "新聞網站 2",
      url: "https://example.com",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "TPBL 選秀結果",
      url: "https://www.instagram.com/p/C9wiCTxzXM1/",
      img: "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2024/07/23/1/30098059.jpg&x=0&y=0&sw=0&sh=0&exp=3600",
    },
    {
      id: 5,
      title: "PLG 選秀結果",
      url: "https://www.instagram.com/p/C9UoAU1TWLE/?img_index=2",
      img: "https://img.ltn.com.tw/Upload/sports/page/800/2024/07/12/phpimO8CE.jpg",
    },
    {
      id: 6,
      title: "新聞網站 5",
      url: "https://example.com",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      title: "新聞網站 6",
      url: "https://example.com",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      title: "新聞網站 7",
      url: "https://example.com",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 9,
      title: "新聞網站 8",
      url: "https://example.com",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="news-container ">
      <h1>精選新聞</h1>
      <div className="news-grid">
        {newsLinks.map((link) => (
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
    </div>
  );
};

export default News;
