import React from "react";
import "../style.css";
import { Link } from "react-router-dom";

export const MenuBar = () => {
    return (
        <div className="menu-bar">
            <button className="about"><Link to={'/'}> About</Link></button>
            <button className="cameras"><Link to={'http://localhost:3001/webcam_face_detection'}>Camera</Link></button>
            <button className="upload"><Link to={'/upload'}>Upload</Link></button>
        </div>
    );
};
