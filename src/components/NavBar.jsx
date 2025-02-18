import React from "react";
import { ReactComponent as WritePost } from "../assets/writePost.svg";
import { ReactComponent as AlarmBell } from "../assets/alarmBell.svg"
import "../styles/NavBar.css";

const NavBar = () => {
    return (
            <div className="navBar">
                <h2 style={{color: "white", fontFamily: "Pretendard-Regular", fontWeight: "bold"}}>ZZBB</h2>
                <div className="iconWrapper">
                    <WritePost width="25" height="25" />
                    <AlarmBell width="27" height="27" />
                </div>
            </div>
    );
}

export default NavBar;