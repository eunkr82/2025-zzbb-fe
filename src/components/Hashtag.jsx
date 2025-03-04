import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/Hashtag.css";

const Hashtag = ({ text }) => {
    const [selected, setSelected] = useState(false); 

    const hashtagSelection = () => {
        setSelected((prev) => !prev)
    };

    return(
        <button 
            onClick={hashtagSelection}
            className = {`tag ${selected ? "selected" : ""}`}>
            <p className={`tagText ${selected ? "selected" : ""}`}>{text}</p>
        </button>
    );
};

Hashtag.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Hashtag;