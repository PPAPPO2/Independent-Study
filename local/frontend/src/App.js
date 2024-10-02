import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Standings from "./components/Standings";
import ShowMore from "./components/TeamShowMore";
import PredictResult from "./components/PredictResult";
import Players from "./components/Players";
import News from "./components/News";
import Schedule from "./components/Schedule";
import Index from "./components/Index";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/cat" element={<Index />} />
          <Route path="/cat/standings" element={<Standings />} />
          <Route path="/cat/showmore" element={<ShowMore />} />
          <Route path="/cat/predict" element={<PredictResult />} />
          <Route path="/cat/players" element={<Players />} />
          <Route path="/cat/news" element={<News />} />
          <Route path="/cat/schedule" element={<Schedule />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
