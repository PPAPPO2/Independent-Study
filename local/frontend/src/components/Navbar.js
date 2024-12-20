import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

import plgLogo from "../logo/plg.png";
import t1Logo from "../logo/tpbl.png";

const Navbar = () => {
  return (
    <header>
      <div className="logo">
        <NavLink to="/cat">
          <img src={plgLogo} alt="PLG Logo" className="plg" />
          <img src={t1Logo} alt="T1 Logo" className="t1" />
        </NavLink>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/cat/standings" end activeClassName="active">
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
              <NavLink to="/cat/rank">數據排行</NavLink>
            </div>
          </li>
          <li>
            <NavLink to="/cat/schedule/" activeClassName="active">
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
              數據儀錶板
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
