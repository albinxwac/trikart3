import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Home.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/navigations/Header.jsx";
import SearchPage from "./components/Search/SearchPage.jsx";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
