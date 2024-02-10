import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
