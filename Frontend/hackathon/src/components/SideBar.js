import React from "react";
import "../style.css";

export const SideBar = () => {
    return (
        <div className="side-bar">
            <div className="about">About NCMEC</div>
            <p className="description">
                <br />
                The National Center for Missing &amp; Exploited Children is a private, non-profit 501(c)(3) corporation whose
                mission is to help find missing children, reduce child sexual exploitation, and prevent child victimization.
                NCMEC works with families, victims, private industry, law enforcement, and the public to assist with preventing
                child abductions, recovering missing children, and providing services to deter and combat child sexual
                exploitation.
            </p>
            <p className="slogan">Every child deserves a safe childhood.</p>
        </div>
    );
};
