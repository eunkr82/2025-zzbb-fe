import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/TabBar.css';

const TabBar = () => {
    const location = useLocation();
    const isColorWhite = ["/main", "/mypage"].includes(location.pathname);
    
    const tabs = [
        {path: '/main', label: "홈"},
        {path: '/qna', label: "질문"},
        {path: '/db', label: "DB"},
        {path: '/mypage', label: "마이"},
    ]

    return (
        <div className={`tabBar ${isColorWhite ? "main" : "other"}`}>
            {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                
                return (
                    <Link   
                        key={tab.path}
                        to={tab.path}
                        className="tabLink">
                        <p className={`tabLabel ${isColorWhite ? "white" : isActive ? "green" : "black"}`}>
                            {tab.label}
                        </p>
                        {isActive && <div className={`tabUnderline ${isColorWhite ? "white" : "green"}`}/>}
                </Link>
                );
            })}
        </div>

    );
};

export default TabBar;

