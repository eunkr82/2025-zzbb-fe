import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import TabBar from "../components/TabBar";
import SearchField from "../components/SearchField";
import CardSlider from "../components/CardSlider";
import DbList from "../components/DbLIst";
import '../styles/Main.css';
import "../styles/Global.css";


const Main = () => {
    return (
        <div className="container">
            <section className="mainContent">
                <section className="componentWrapper">
                    <NavBar/>
                    <TabBar/>
                    <SearchField/>
                </section>
                <section className="contentBox">
                    <siv className="titleWrapper">
                        <Link 
                            to ='/qna'
                            style={{fontfamily: "Pretendard-Regular",
                                    color: "#000",
                                    fontSize: "16px",
                                    fontWeight: "bolder",
                                    textDecoration: "none",
                            }}>
                            <p>질문 게시판 바로가기 📖</p>
                        </Link>
                        <Link 
                            to = '/qna'
                            style={{fontFamily: "Pretendard-Regular",
                                    color: "#BDBDBD",
                                    fontSize: "11px",
                                    textDecoration: "none",
                            }}>
                            <p>모아보기</p>
                        </Link>
                    </siv>
                    <div className="sliderContainer">
                        <CardSlider/>
                    </div>

                    <div className="titleWrapper">
                        <Link 
                            to ='/database'
                            style={{fontfamily: "Pretendard-Regular",
                                    color: "#000",
                                    fontSize: "16px",
                                    fontWeight: "bolder",
                                    textDecoration: "none",
                            }}>
                            <p>사전 DB 바로가기 🔍</p>
                        </Link>
                        <Link 
                            to = '/database'
                            style={{fontFamily: "Pretendard-Regular",
                                    color: "#BDBDBD",
                                    fontSize: "11px",
                                    textDecoration: "none",
                            }}>
                            <p>모아보기</p>
                        </Link>
                    </div>
                    <div className="dbContainer">
                            <DbList/>
                    </div>
                </section>

            </section>
        </div>
    );
};

export default Main;