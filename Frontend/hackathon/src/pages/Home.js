import React from "react";
import { MainArea } from "../components/MainArea";
import { MenuBar } from "../components/MenuBar";
import { SideBar } from "../components/SideBar";
import "../style.css";

function Home() {
  return (
    <div className="home-page">
      <MenuBar />
      <div className="content">
        <SideBar />
        <MainArea />
      </div>
    </div>
  );
}

export default Home;
