import React from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as WritePost } from "../assets/writePost.svg";
import { ReactComponent as AlarmBell } from "../assets/alarmBell.svg";
import "../styles/NavBar.css";

const NavBar = () => {
    const location = useLocation();
    const isColorWhite = location.pathname === "/main" || location.pathname === "/mypage";

    return (
            <div className="navBar">
                <h2 className={`navText ${isColorWhite ? "white" : "black"}`}>ZZBB</h2>
                <div className="iconWrapper">
                    <WritePost color={isColorWhite ? "white" : "black"} width="25" height="25" />
                    <AlarmBell color={isColorWhite ? "white" : "black"} width="27" height="27" />
                </div>
            </div>
    );
}

export default NavBar;