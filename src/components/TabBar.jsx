import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/TabBar.css';

const TabBar = () => {
    const location = useLocation();
    const isColorWhite = location.pathname === "/main" || location.pathname === "/mypage";
    
    const tabs = [
        {path: '/main', label: "홈"},
        {path: '/qna', label: "질문"},
        {path: '/database', label: "DB"},
        {path: '/mypage', label: "마이"},
    ]

    return (
        <div className={`tabBar ${isColorWhite ? "main" : "other"}`}>
            {tabs.map((tab) => (
                <Link   
                    key={tab.path}
                    to={tab.path}
                    className={`tabLink  ${location.pathname === tab.path ? "tabSelected" : "" }`}
                >
                    <p style={{fontSize: "15px"}}>{tab.label}</p>
                </Link>
            ))}
        </div>

    );
};

export default TabBar;

