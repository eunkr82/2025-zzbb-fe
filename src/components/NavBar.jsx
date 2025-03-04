import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../axios/Api";
import { ReactComponent as WritePostW } from "../assets/writePost.svg";
import { ReactComponent as WritePostB } from "../assets/writePostB.svg";
import { ReactComponent as AlarmBellW } from "../assets/alarmBellW.svg";
import { ReactComponent as AlarmBellB } from "../assets/alarmBellB.svg";
import { ReactComponent as AlarmBellW_NEW } from "../assets/alarmBellW_NEW.svg";
import { ReactComponent as AlarmBellB_NEW } from "../assets/alarmBellB_NEW.svg";
import "../styles/NavBar.css";

const NavBar = () => {
    const location = useLocation();
    const isColorWhite = ["/main", "/mypage"].includes(location.pathname);
    
    const [hasNewNotification, setHasNewNotification] = useState(false);

    useEffect(() => {
        const getNotifications = () => {
            api 
                .get("/user/notice/count")
                .then(response => {
                    setHasNewNotification(response.data.data.notices > 0);
                })
                
                .catch(error => console.error("알림 개수 불러오기 실패", error));
        };

        getNotifications();
        const interval = setInterval(getNotifications, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
            <div className="navBar">
                <h2 className={`navText ${isColorWhite ? "white" : "black"}`}>ZZBB</h2>
                <div className="iconWrapper">
                    {isColorWhite ? <WritePostW width="25" height="25" /> : <WritePostB width="25" height="25" />}
                    <Link to='/notification' style={{cursor: "pointer"}}>
                        {isColorWhite 
                            ? (hasNewNotification ? <AlarmBellW_NEW width="27" height="27" /> : <AlarmBellW width="27" height="27" />) 
                            : (hasNewNotification ? <AlarmBellB_NEW width="24" height="24" /> : <AlarmBellB width="24" height="24" />)
                        }
                    </Link>
                </div>
            </div>
    );
}

export default NavBar;