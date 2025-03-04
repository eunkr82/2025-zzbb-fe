import React from "react";
import NavBar from "../components/NavBar";
import TabBar from "../components/TabBar";
import SearchField from "../components/SearchField";
import "../styles/Global.css";

const Search = () => {
    return (
        <div className="container">
            <div className="content">
                <div className="componentWrapper">
                    <NavBar/>
                    <TabBar/>
                    <SearchField/>
                </div>
            </div>
                
        </div>
    );
};

export default Search;