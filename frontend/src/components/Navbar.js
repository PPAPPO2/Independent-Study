import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

import plgLogo from "../logo/plg.png";
import t1Logo from "../logo/t1.png";

const Navbar = () => {
  return (
    <header>
      <div className="logo">
        <img src={plgLogo} alt="PLG Logo" className="plg" />
        <img src={t1Logo} alt="T1 Logo" className="t1" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" className="active">
              戰績
            </Link>
          </li>
          <li>
            <Link to="/statistics">數據</Link>
          </li>
          <li>
            <Link to="/schedule">賽程</Link>
          </li>
          <li>
            <Link to="/teams">球隊</Link>
          </li>
          <li>
            <Link to="/news">消息</Link>
          </li>
          <li>
            <Link to="/login">登入</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
