import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home";
import UploadImagePage from "./pages/Upload";
import LiveFeedComponent from "./pages/LiveFeedComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadImagePage />} />
        <Route path="/Camera" element={<LiveFeedComponent />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
