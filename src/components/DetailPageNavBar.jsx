import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as BackButton } from "../assets/back.svg";
import "../styles/NavBar.css";

const DetailPageNavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const handleBack = () => {
        navigate(-1);
    };

    const getNavText = () => {
        if (location.pathname.startsWith("/db/")) return "DB";
        if (location.pathname.startsWith("/qna/")) return "질문";
        if (location.pathname === "/notification") return "알림";
        return ""; 
    };
    
    return (
        <div className="detailPageNavBar">
            <BackButton style={{width: "20px", height: "20px", cursor: "pointer"}} onClick={handleBack}/>
            <p> {getNavText()} </p>
        </div>
    );
}

export default DetailPageNavBar;