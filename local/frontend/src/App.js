import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Standings from "./components/Standings";
import ShowMore from "./components/TeamShowMore";
import PredictResult from "./components/PredictResult";
import Players from "./components/Players";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/cat" element={<Standings />} />
          <Route path="/cat/showmore" element={<ShowMore />} />
          <Route path="/cat/predict" element={<PredictResult />} />
          <Route path="/cat/players" element={<Players />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
