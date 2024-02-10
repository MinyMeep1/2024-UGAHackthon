import React from "react";
import "../style.css";
import photo from '../images/ncmec-main.jpg'

export const MainArea = () => {
    return (
        <div className="main-area">
            <div className="photo-box">
                <img className="photo" alt="Ncmec main" src={photo} />
                <div className="caption">(Courtesy of NCMEC)</div>
            </div>
            <div className="system">
                <div className="title">Our System</div>
                <p className="p">
                    The system incorporates use of facial recognition to compare against the images of missing children currently
                    in the data. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
                </p>
            </div>
            <div className="instructions">
                <div className="box">
                    <div className="subtitle">How to Start:</div>
                    <p className="text-area">
                        Click on either cameras or upload to begin.
                        <br />
                        Cameras will take a live feed and try to scan for facial recognition. <br />
                        Upload will allow one to take an image and submit it to the system. <br />
                        In either case, both will attempt to compare the face on-screen to the database of missing children.
                    </p>
                </div>
                <div className="box">
                    <div className="subtitle">How to Start:</div>
                    <p className="text-area">
                        Click on either cameras or upload to begin.
                        <br />
                        Cameras will take a live feed and try to scan for facial recognition. <br />
                        Upload will allow one to take an image and submit it to the system. <br />
                        In either case, both will attempt to compare the face on-screen to the database of missing children.
                    </p>
                </div>
            </div>
        </div>
    );
};
