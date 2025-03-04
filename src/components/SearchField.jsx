import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";
import "../styles/Global.css";

const SearchField = () => {
    const location = useLocation();
    const isColorGray = location.pathname === "/main";

    return(
        <Link 
            to='/search'
            style={{textDecoration: "none"}}>
            <div className={isColorGray ? "searchFieldMain" : "searchFieldOther"}>
                <p style={{
                    fontSize: "13px",
                    color: "#BDBDBD",
                }}>
                    해시태그를 입력해보세요!
                </p>
                <SearchIcon/>
            </div>
        </Link>
    );
};

export default SearchField;