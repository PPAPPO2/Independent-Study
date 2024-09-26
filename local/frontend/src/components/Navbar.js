import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

import plgLogo from "../logo/plg.png";
import t1Logo from "../logo/tpbl.png";

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
            <NavLink to="/cat" end activeClassName="active">
              戰績
            </NavLink>
          </li>
          <li className="dropdown">
            <NavLink
              to="/cat/showmore"
              className="dropbtn"
              activeClassName="active"
            >
              數據
            </NavLink>
            <div className="dropdown-content">
              <NavLink to="/cat/showmore">球隊數據</NavLink>
              <NavLink to="/cat/players">球員數據</NavLink>
            </div>
          </li>
          <li>
            <NavLink to="/schedule" activeClassName="active">
              賽程
            </NavLink>
          </li>
          <li>
            <NavLink to="/cat/news" activeClassName="active">
              消息
            </NavLink>
          </li>
          <li>
            <NavLink to="/cat/predict/" activeClassName="active">
              預測
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" activeClassName="active">
              登入
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
