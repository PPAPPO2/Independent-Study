import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Standings from "./components/Standings";
import ShowMore from "./components/TeamShowMore";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/cat" element={<Standings />} />
          <Route path="/cat/showmore" element={<ShowMore />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
