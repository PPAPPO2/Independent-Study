import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer"; // 引入 useInView
import "../styles/Index.css";
const Index = () => {
  const [ref2, inView2] = useInView({ triggerOnce: false });
  const [ref3, inView3] = useInView({ triggerOnce: false });
  const [ref4, inView4] = useInView({ triggerOnce: false });
  // 圖片的動畫：淡入 + 縮放
  const imageSpring = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" }, // 從縮小開始
    config: { duration: 1000 }, // 動畫持續 1 秒
  });

  // 當 section 進入視口時，才觸發動畫
  const fadeIn1 = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" }, // 從下方開始
    delay: 1200, // 按鈕動畫延遲 1.2 秒開始
    config: { duration: 1000 }, // 動畫持續 1 秒
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
  const fadeIn4 = useSpring({
    opacity: inView4 ? 1 : 0,
    transform: inView4 ? "translateY(0)" : "translateY(20px)",
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
      name: "曾祥豪",
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
      <div className="index">
        <animated.img
          src={"/images/icon/index.png"}
          alt="index"
          className="index-image"
          style={imageSpring} // 加入圖片動畫效果
        />
        <div className="button-container">
          <animated.div style={fadeIn1}>
            <NavLink to="/cat/login" activeClassName="active">
              <button className="button1">立即登入</button>
            </NavLink>
            <NavLink
              to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              activeClassName="active"
              target="_blank"
            >
              <button className="button2">前導影片</button>
            </NavLink>
          </animated.div>
        </div>
        <div className="index-line"></div>
      </div>

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
          <NavLink to="/cat/predict" activeClassName="active">
            <button className="button">立即前往</button>
          </NavLink>
        </div>
      </div>
      <div className="content-box right-to-left">
        <div className="content-text">
          <h2>提供給你最即時的消息！</h2>
          <p>除了數據分析</p>
          <p>我們還將賽程整合於行事曆</p>
          <p>並且精選了每月的臺灣籃球大小事</p>
          <NavLink to="/cat/schedule" activeClassName="active">
            <button className="button">立即前往</button>
          </NavLink>
        </div>
        <img
          src={"/images/icon/RightToLeft.png"}
          alt="stock"
          className="content-image"
        />
      </div>
      <div ref={ref2} className="section">
        <animated.div style={fadeIn2}>
          <h1>01</h1>
          <h2>臺籃北極星</h2>

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
      <div ref={ref3} className="team">
        <animated.div style={fadeIn3}>
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

      <div ref={ref4} className="tech-section">
        <animated.div style={fadeIn4}>
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
    </div>
  );
};

export default Index;
