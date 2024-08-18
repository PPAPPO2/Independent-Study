import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Standings from "./components/Standings";
import ShowMore from "./components/TeamShowMore";
import PredictResult from "./components/PredictResult"; // 引入PredictResult組件

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/cat" element={<Standings />} />
          <Route path="/cat/showmore" element={<ShowMore />} />
          <Route path="/cat/predict" element={<PredictResult />} /> {/* 新增PredictResult路由 */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
