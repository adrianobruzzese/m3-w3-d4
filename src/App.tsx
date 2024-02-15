import React from "react";
import "./App.css";
import MyNav from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchComponent from "./components/Search";
import ArticleDetail from "./components/ArticleDetails"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route path="/" element={<SearchComponent />} />
          <Route path="/:singleNew" element={<ArticleDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
