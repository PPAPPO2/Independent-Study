import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer"; // 引入 useInView
import "../styles/Index.css";
const Index = () => {
  // 使用 useInView 來監控 section 是否進入視口
  const [ref1, inView1] = useInView({ triggerOnce: true });
  const [ref2, inView2] = useInView({ triggerOnce: true });
  const [ref3, inView3] = useInView({ triggerOnce: true });

  // 當 section 進入視口時，才觸發動畫
  const fadeIn1 = useSpring({
    opacity: inView1 ? 1 : 0,
    transform: inView1 ? "translateY(0)" : "translateY(20px)",
    config: { duration: 1000 },
  });

  const fadeIn2 = useSpring({
    opacity: inView2 ? 1 : 0,
    transform: inView2 ? "translateY(0)" : "translateY(20px)",
    config: { duration: 1000 },
  });

  const fadeIn3 = useSpring({
    opacity: inView3 ? 1 : 0,
    transform: inView3 ? "translateY(0)" : "translateY(20px)",
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
      {/* <div className="welcome">
        <h1>hi</h1>
      </div> */}
      <div className="content-box left-to-right">
        <img
          src={"/images/icon/LeftToRight.png"}
          alt="stock"
          className="content-image"
        />
        <div className="content-text">
          <h2>兩個聯盟資訊不連貫？</h2>
          <p>歡迎，這裡將會解決你所遇到的問題</p>
          <p>提供更視覺化的數據分析</p>
          <p>還能夠預測下場比賽的勝負！</p>
        </div>
      </div>
      <div className="content-box right-to-left">
        <div className="content-text">
          <h2>提供給你最即時的消息！</h2>
          <p>除了數據分析</p>
          <p>我們還將賽程整合於行事曆</p>
          <p>並且精選了每月的臺灣籃球大小事</p>
        </div>
        <img
          src={"/images/icon/RightToLeft.png"}
          alt="stock"
          className="content-image"
        />
      </div>
      <div ref={ref1} className="section">
        <animated.div style={fadeIn1}>
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
      <div ref={ref2} className="team">
        <animated.div style={fadeIn2}>
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

      <div ref={ref3} className="tech-section">
        <animated.div style={fadeIn3}>
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
        </animated.div>
      </div>
      <div className="button-container">
        <NavLink to="/cat/login" activeClassName="active">
          <button className="special-button">立即開始</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Index;
