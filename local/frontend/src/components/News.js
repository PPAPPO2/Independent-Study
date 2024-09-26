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
      title: "新聞網站 3",
      url: "https://example.com",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "新聞網站 4",
      url: "https://example.com",
      img: "https://via.placeholder.com/150",
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
  );
};

export default News;
