import React, { useEffect } from "react";
import { ReactComponent as ZZBB} from "../assets/ZZBB.svg";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/signin");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="container">
            <div className="gradientContent">
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", top: "30%", gap: "5px"}}>
                    <h2 style={{fontSize: "32px", color: "white"}}>ZZBB</h2>
                    <ZZBB />
                    <p style ={{fontSize: "15px", color: "white"}}>이화여자대학교 25학번 새내기를 위한,</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
