import React from "react";
import api from "../axios/Api";
import NavBar from "../components/NavBar";
import TabBar from "../components/TabBar";

const MyPage = () => {
    return (
        <div className="container">
        <section className="gradientContent">
                <section className="componentWrapper">
                    <NavBar/>
                    <TabBar/>
                </section>
            </section>         
        </div>
    );
};

export default MyPage;