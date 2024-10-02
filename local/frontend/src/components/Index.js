import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "../styles/Index.css";
const Index = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  // 追蹤每個圖片的 hover 狀態
  const [hoveredImage, setHoveredImage] = useState(null);

  // 單獨定義每個圖片和文字的動畫
  const imageFadeStyles = [
    useSpring({
      opacity: hoveredImage === 0 ? 0 : 1,
      config: { duration: 500 },
    }),
    useSpring({
      opacity: hoveredImage === 1 ? 0 : 1,
      config: { duration: 500 },
    }),
    useSpring({
      opacity: hoveredImage === 2 ? 0 : 1,
      config: { duration: 500 },
    }),
  ];
  const textFadeStyles = [
    useSpring({
      opacity: hoveredImage === 0 ? 1 : 0,
      config: { duration: 500 },
    }),
    useSpring({
      opacity: hoveredImage === 1 ? 1 : 0,
      config: { duration: 500 },
    }),
    useSpring({
      opacity: hoveredImage === 2 ? 1 : 0,
      config: { duration: 500 },
    }),
  ];

  const teamMembers = [
    {
      image: "01.png",
      name: "會祥豪",
      description: "後端、資料庫設計、模型訓練",
      experience: "想不通", //心得
    },
    {
      image: "03.png",
      name: "蕭丞恩",
      description: "前端設計、網站動畫、簡報製作",
      experience: "想吃飯",
    },
    {
      image: "02.png",
      name: "紀信毅",
      description: "後端、資料庫設計、模型訓練",
      experience: "還在想",
    },
  ];
  const techData = [
    { title: "後端", items: ["Django", "SQL Lite", , "Python", "GPT-4"] },
    {
      title: "前端",
      items: ["React", "SCSS", "CSS"],
    },
    { title: "test1", items: ["還在想"] },
  ];

  return (
    <div className="home-container">
      <div className="content-box left-to-right">
        <img
          src={"/images/icon/LeftToRight.png"}
          alt="stock"
          className="content-image"
        />
        <div className="content-text">
          <h2>因為喜歡籃球</h2>
          <p>描述</p>
        </div>
      </div>
      <div className="content-box right-to-left">
        <div className="content-text">
          <h2>因為喜歡籃球</h2>
          <p>描述</p>
        </div>
        <img
          src={"/images/icon/RightToLeft.png"}
          alt="stock"
          className="content-image"
        />
      </div>
      <div className="section">
        <animated.div style={fadeIn}>
          <h1>01</h1>
          <h2>臺灣職籃網頁</h2>

          <div className="features">
            <div className="feature">
              <i>⟳</i>
              <h3>我們的願景 </h3>
              <p>
                打造專業且整合性的籃球數據平台，將兩大職籃聯盟 PLG 與 TPBL，
                匯集在同一個網站上。
              </p>
            </div>
            <div className="feature">
              <i>㊕</i>
              <h3>平台特色</h3>
              <p>快速獲取兩大聯盟的最新資訊、球隊與球員數據，以及賽事預測。</p>
            </div>
            <div className="feature">
              <i>%</i>
              <h3>預測比賽</h3>
              <p>
                預測每場比賽的勝率變化，讓球迷清楚地看到球隊勝出比賽的機會，
                並了解可能影響賽事結果的因素。
              </p>
            </div>
          </div>
        </animated.div>
      </div>
      <div className="team">
        <animated.div style={fadeIn}>
          <h1>02</h1>
          <h2>關於我們</h2>
          <p>
            三個程式臭皮匠合作完成的網頁，目標是從專題中獲得經驗值並對臺灣籃球貢獻一點心力！
          </p>
        </animated.div>

        <div className="image-text-container">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="image-container"
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              {/* 使用外部計算好的 styles */}
              <animated.img
                src={`/images/icon/${member.image}`}
                alt={member.name}
                className="image"
                style={imageFadeStyles[index]}
              />
              <h3>{member.name}</h3>
              <p>{member.description}</p>
              {/* 動態控制文字的顯示 */}
              <animated.div
                style={textFadeStyles[index]}
                className="hover-text"
              >
                <p>{member.experience}</p>
              </animated.div>
            </div>
          ))}
        </div>
      </div>

      <div className="tech-section">
        <h1>03</h1>
        <h2>開發技術</h2>
        {techData.map((tech, index) => (
          <article key={index} className="tech-card">
            <h3>{tech.title}</h3>
            <ul>
              {tech.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Index;
